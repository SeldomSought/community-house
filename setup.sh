#!/bin/bash
set -e

# ============================================================
# Community House - GitHub Repository Setup Script
# ============================================================
# This script initializes the repo and pushes to GitHub
# Run this ONCE to set up your repository
# ============================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Community House - GitHub Repository Setup              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check for required tools
check_requirements() {
    echo -e "${YELLOW}Checking requirements...${NC}"
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}Error: git is not installed${NC}"
        exit 1
    fi
    
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
        echo "Install it from: https://cli.github.com/"
        exit 1
    fi
    
    # Check if gh is authenticated
    if ! gh auth status &> /dev/null; then
        echo -e "${YELLOW}GitHub CLI not authenticated. Running 'gh auth login'...${NC}"
        gh auth login
    fi
    
    echo -e "${GREEN}✓ All requirements met${NC}"
}

# Get configuration from user
get_config() {
    echo ""
    echo -e "${YELLOW}Configuration${NC}"
    echo "────────────────────────────────────────"
    
    # Repository name
    read -p "Repository name [community-house]: " REPO_NAME
    REPO_NAME=${REPO_NAME:-community-house}
    
    # Visibility
    read -p "Repository visibility (public/private) [public]: " VISIBILITY
    VISIBILITY=${VISIBILITY:-public}
    
    # Description
    read -p "Repository description [Community coliving & coworking website]: " DESCRIPTION
    DESCRIPTION=${DESCRIPTION:-Community coliving & coworking website}
    
    # Custom domain (optional)
    read -p "Custom domain (leave blank if none): " CUSTOM_DOMAIN
    
    echo ""
    echo -e "${BLUE}Configuration Summary:${NC}"
    echo "  Repository: $REPO_NAME"
    echo "  Visibility: $VISIBILITY"
    echo "  Description: $DESCRIPTION"
    if [ -n "$CUSTOM_DOMAIN" ]; then
        echo "  Custom Domain: $CUSTOM_DOMAIN"
    fi
    echo ""
    read -p "Proceed? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
}

# Initialize git repository
init_repo() {
    echo ""
    echo -e "${YELLOW}Initializing repository...${NC}"
    
    # Initialize git if not already
    if [ ! -d ".git" ]; then
        git init
        echo -e "${GREEN}✓ Git initialized${NC}"
    else
        echo -e "${GREEN}✓ Git already initialized${NC}"
    fi
    
    # Set default branch to main
    git branch -M main
    
    # Create .gitignore if it doesn't exist
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
build/
.docusaurus/

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
*.log
EOF
        echo -e "${GREEN}✓ Created .gitignore${NC}"
    fi
    
    # Add custom domain CNAME if specified
    if [ -n "$CUSTOM_DOMAIN" ]; then
        mkdir -p static
        echo "$CUSTOM_DOMAIN" > static/CNAME
        echo -e "${GREEN}✓ Created CNAME for $CUSTOM_DOMAIN${NC}"
    fi
}

# Create GitHub repository
create_github_repo() {
    echo ""
    echo -e "${YELLOW}Creating GitHub repository...${NC}"
    
    # Check if repo already exists
    if gh repo view "$REPO_NAME" &> /dev/null; then
        echo -e "${YELLOW}Repository already exists. Skipping creation.${NC}"
    else
        gh repo create "$REPO_NAME" \
            --"$VISIBILITY" \
            --description "$DESCRIPTION" \
            --source=. \
            --remote=origin
        echo -e "${GREEN}✓ Repository created${NC}"
    fi
}

# Configure repository settings
configure_repo() {
    echo ""
    echo -e "${YELLOW}Configuring repository settings...${NC}"
    
    # Enable GitHub Pages via Actions
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github+json" \
        "/repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/pages" \
        -f "build_type=workflow" 2>/dev/null || true
    
    echo -e "${GREEN}✓ GitHub Pages configured${NC}"
    
    # Set branch protection for main (optional, for PRs)
    echo -e "${YELLOW}Setting up branch protection...${NC}"
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github+json" \
        "/repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/branches/main/protection" \
        -f "required_status_checks=null" \
        -f "enforce_admins=false" \
        -f "required_pull_request_reviews=null" \
        -f "restrictions=null" \
        -f "allow_force_pushes=true" \
        -f "allow_deletions=false" 2>/dev/null || echo -e "${YELLOW}Branch protection skipped (may require admin)${NC}"
}

# Initial commit and push
initial_push() {
    echo ""
    echo -e "${YELLOW}Creating initial commit...${NC}"
    
    git add -A
    git commit -m "Initial commit: Community House website scaffold

- Docusaurus 3.x with Tailwind CSS
- Hero, FeatureCard, EventsList, FloorPlan components
- Pages: Home, About, Events, Location, Membership, Apply
- GitHub Actions deployment workflow
- Dark mode with orange accent theme"
    
    echo -e "${GREEN}✓ Initial commit created${NC}"
    
    echo ""
    echo -e "${YELLOW}Pushing to GitHub...${NC}"
    git push -u origin main
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
}

# Print success message
print_success() {
    REPO_URL=$(gh repo view --json url -q .url)
    PAGES_URL="https://$(gh repo view --json owner -q .owner.login).github.io/$REPO_NAME/"
    
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                    Setup Complete! 🎉                      ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Repository:${NC} $REPO_URL"
    echo -e "${BLUE}Pages URL:${NC}  $PAGES_URL"
    if [ -n "$CUSTOM_DOMAIN" ]; then
        echo -e "${BLUE}Custom Domain:${NC} https://$CUSTOM_DOMAIN"
    fi
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Wait 2-3 minutes for GitHub Actions to build & deploy"
    echo "  2. Visit your site at the Pages URL above"
    echo "  3. Use 'gh pr create' or Claude to submit changes"
    echo ""
    echo -e "${YELLOW}To let Claude submit PRs:${NC}"
    echo "  1. Create a fine-grained PAT at: https://github.com/settings/tokens?type=beta"
    echo "  2. Grant 'Contents' and 'Pull requests' permissions for this repo"
    echo "  3. Use the token with Claude Code or API integrations"
    echo ""
}

# Main execution
main() {
    check_requirements
    get_config
    init_repo
    create_github_repo
    configure_repo
    initial_push
    print_success
}

main
