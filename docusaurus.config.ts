import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Replace with your actual values
const config: Config = {
  title: 'Community House',
  tagline: 'A Modern Coliving & Coworking Experience',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-org.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/community-house/',

  // GitHub pages deployment config.
  organizationName: 'your-org', // Your GitHub org/user name
  projectName: 'community-house', // Your repo name
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
          editUrl: 'https://github.com/your-org/community-house/tree/main/',
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
          editUrl: 'https://github.com/your-org/community-house/tree/main/',
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
      { name: 'keywords', content: 'coliving, coworking, community, housing' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:type', content: 'website' },
    ],
    navbar: {
      title: 'Community House',
      logo: {
        alt: 'Community House Logo',
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
        { to: '/location', label: 'Location', position: 'left' },
        { to: '/membership', label: 'Membership', position: 'left' },
        { to: '/events', label: 'Events', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        {
          href: '/apply',
          label: 'Apply Now',
          position: 'right',
          className: 'navbar-cta-button',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            { label: 'Spaces', to: '/spaces' },
            { label: 'Location', to: '/location' },
            { label: 'Membership', to: '/membership' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Events', to: '/events' },
            { label: 'Blog', to: '/blog' },
            { label: 'About', to: '/about' },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/yourhandle',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/yourhandle',
            },
            {
              label: 'Contact',
              to: '/contact',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            { label: 'Terms of Service', to: '/terms-of-service' },
            { label: 'Privacy Policy', to: '/privacy-policy' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Community House. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'announcement',
      content:
        '🎉 Now accepting applications for Q2 2025! <a href="/apply">Apply today</a>',
      backgroundColor: '#E85D04',
      textColor: '#FFFFFF',
      isCloseable: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
