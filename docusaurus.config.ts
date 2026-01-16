import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// =============================================================================
// DEPLOYMENT CONFIGURATION
// =============================================================================
// This section computes url and baseUrl from environment variables to prevent
// the dreaded "Your Docusaurus site did not load properly" baseUrl error.
//
// SINGLE SOURCE OF TRUTH:
// - For local dev: baseUrl defaults to "/" (no prefix needed)
// - For GitHub Pages: baseUrl is "/community-house/" (project site)
// - For custom domain: set DOCUSAURUS_BASE_URL="/" and DOCUSAURUS_URL to your domain
//
// Environment variables (all optional):
// - DOCUSAURUS_URL: Override the site URL (default: https://SeldomSought.github.io)
// - DOCUSAURUS_BASE_URL: Override the base URL path (default: "/" for local, inferred for CI)
// - GITHUB_ACTIONS: Set automatically by GitHub Actions
// - GITHUB_REPOSITORY: Set automatically by GitHub Actions (e.g., "SeldomSought/community-house")
// =============================================================================

const DEFAULTS = {
  url: 'https://SeldomSought.github.io',
  repoName: 'community-house',
} as const;

/**
 * Computes the site URL from environment or defaults.
 */
function getSiteUrl(): string {
  if (process.env.DOCUSAURUS_URL) {
    return process.env.DOCUSAURUS_URL;
  }
  return DEFAULTS.url;
}

/**
 * Computes the base URL with the following priority:
 * 1. DOCUSAURUS_BASE_URL env var (explicit override)
 * 2. Infer from GITHUB_REPOSITORY when running in GitHub Actions
 * 3. Default to "/" for local development
 */
function getBaseUrl(): string {
  // Priority 1: Explicit override
  if (process.env.DOCUSAURUS_BASE_URL) {
    let baseUrl = process.env.DOCUSAURUS_BASE_URL;
    // Ensure it starts with "/"
    if (!baseUrl.startsWith('/')) {
      baseUrl = '/' + baseUrl;
    }
    // Ensure it ends with "/"
    if (!baseUrl.endsWith('/')) {
      baseUrl = baseUrl + '/';
    }
    return baseUrl;
  }

  // Priority 2: Infer from GitHub Actions environment
  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY) {
    // GITHUB_REPOSITORY format: "owner/repo-name"
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repoName) {
      return `/${repoName}/`;
    }
  }

  // Priority 3: Default for local development
  return '/';
}

/**
 * Validates the computed configuration and fails fast if something is wrong.
 * This prevents deploying a broken site.
 */
function validateConfig(url: string, baseUrl: string): void {
  const errors: string[] = [];

  // Validate baseUrl format
  if (!baseUrl.startsWith('/')) {
    errors.push(`baseUrl must start with "/", got: "${baseUrl}"`);
  }
  if (!baseUrl.endsWith('/')) {
    errors.push(`baseUrl must end with "/", got: "${baseUrl}"`);
  }

  // Validate url format
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    errors.push(`url must start with "http://" or "https://", got: "${url}"`);
  }
  if (url.endsWith('/')) {
    errors.push(`url should not end with "/", got: "${url}"`);
  }

  // In GitHub Actions, validate that baseUrl matches expected pattern for project sites
  if (process.env.GITHUB_ACTIONS === 'true') {
    // For GitHub Pages project sites, baseUrl should match repo name
    if (process.env.GITHUB_REPOSITORY && baseUrl !== '/') {
      const expectedRepoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      const expectedBaseUrl = `/${expectedRepoName}/`;
      if (baseUrl !== expectedBaseUrl && baseUrl !== '/') {
        console.warn(
          `Warning: baseUrl "${baseUrl}" doesn't match expected "/${expectedRepoName}/" for repo "${process.env.GITHUB_REPOSITORY}"`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error('\nDocusaurus Configuration Validation Failed:\n');
    errors.forEach((err) => console.error(`   - ${err}`));
    console.error('\n   Current values:');
    console.error(`   - url: "${url}"`);
    console.error(`   - baseUrl: "${baseUrl}"`);
    console.error(`   - DOCUSAURUS_URL: "${process.env.DOCUSAURUS_URL || '(not set)'}"`);
    console.error(`   - DOCUSAURUS_BASE_URL: "${process.env.DOCUSAURUS_BASE_URL || '(not set)'}"`);
    console.error(`   - GITHUB_ACTIONS: "${process.env.GITHUB_ACTIONS || '(not set)'}"`);
    console.error(`   - GITHUB_REPOSITORY: "${process.env.GITHUB_REPOSITORY || '(not set)'}"\n`);
    throw new Error('Invalid Docusaurus configuration. See errors above.');
  }

  // Log computed values for debugging in CI
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.log('\nDocusaurus Configuration:');
    console.log(`   - url: "${url}"`);
    console.log(`   - baseUrl: "${baseUrl}"`);
    console.log(`   - Environment: GitHub Actions\n`);
  }
}

// Compute and validate configuration
const siteUrl = getSiteUrl();
const baseUrl = getBaseUrl();
validateConfig(siteUrl, baseUrl);

// =============================================================================
// DOCUSAURUS CONFIGURATION
// =============================================================================

const config: Config = {
  title: 'The Fellowship',
  tagline: 'Three houses, one community in Travis Heights, Austin',
  favicon: 'img/favicon.ico',

  // GitHub Pages URL (update url to custom domain and baseUrl to '/' when configured)
  url: 'https://SeldomSought.github.io',
  baseUrl: '/community-house/',

  // GitHub pages deployment config
  organizationName: 'SeldomSought',
  projectName: DEFAULTS.repoName,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'docs',
          routeBasePath: 'spaces',
          editUrl: 'https://github.com/SeldomSought/community-house/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Community Updates',
          blogDescription: 'News, events, and updates from our community',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/SeldomSought/community-house/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly' as const,
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    '@docusaurus/plugin-ideal-image',
    async function tailwindPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    metadata: [
      { name: 'keywords', content: 'coliving, austin, travis heights, community housing, shared living' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:type', content: 'website' },
    ],
    navbar: {
      title: 'The Fellowship',
      logo: {
        alt: 'The Fellowship Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left', activeBasePath: 'none' },
        {
          type: 'docSidebar',
          sidebarId: 'spacesSidebar',
          position: 'left',
          label: 'Spaces',
        },
        { to: '/property-tour', label: 'Tour', position: 'left' },
        { to: '/location', label: 'Location', position: 'left' },
        { to: '/membership', label: 'Membership', position: 'left' },
        { to: '/events', label: 'Events', position: 'left' },
        {
          to: '/apply',
          label: 'Apply Now',
          position: 'right',
          className: 'navbar-cta-button',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Explore',
          items: [
            { label: 'Spaces', to: '/spaces/' },
            { label: 'Property Tour', to: '/property-tour' },
            { label: 'Location', to: '/location' },
            { label: 'Membership', to: '/membership' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Events', to: '/events' },
            { label: 'Apply', to: '/apply' },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Instagram',
              href: 'https://instagram.com/thefellowshipatx',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/thefellowshipatx',
            },
            {
              label: 'Email Us',
              href: 'mailto:hello@thefellowshipatx.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Fellowship. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'announcement',
      // Use computed baseUrl for the link
      content:
        'Now accepting applications — rooms starting at $750/month. <a href="/community-house/apply">Apply today</a>',
      backgroundColor: '#16A34A',
      textColor: '#FFFFFF',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
