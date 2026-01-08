#!/bin/bash
set -e

# ============================================================
# Claude PR Submission Script
# ============================================================
# This script creates a branch, commits changes, and opens a PR
# Usage: ./claude-pr.sh "branch-name" "PR title" "PR description"
# ============================================================

BRANCH_NAME="${1:-claude/update-$(date +%Y%m%d-%H%M%S)}"
PR_TITLE="${2:-Update from Claude}"
PR_BODY="${3:-Automated update submitted by Claude AI assistant.}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Creating PR: $PR_TITLE${NC}"

# Ensure we're on latest main
git fetch origin main
git checkout main
git pull origin main

# Create and switch to new branch
git checkout -b "$BRANCH_NAME"
echo -e "${GREEN}✓ Created branch: $BRANCH_NAME${NC}"

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit. Exiting.${NC}"
    git checkout main
    git branch -D "$BRANCH_NAME"
    exit 0
fi

# Commit changes
git commit -m "$PR_TITLE

$PR_BODY"
echo -e "${GREEN}✓ Changes committed${NC}"

# Push branch
git push -u origin "$BRANCH_NAME"
echo -e "${GREEN}✓ Branch pushed${NC}"

# Create PR
gh pr create \
    --title "$PR_TITLE" \
    --body "$PR_BODY" \
    --base main \
    --head "$BRANCH_NAME"

echo -e "${GREEN}✓ Pull request created!${NC}"

# Switch back to main
git checkout main

echo -e "${BLUE}Done! Review and merge the PR to deploy changes.${NC}"
