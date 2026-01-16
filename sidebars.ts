import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  spacesSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'The Houses',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'west-house',
          label: 'West House',
        },
        {
          type: 'doc',
          id: 'main-house',
          label: 'Main House',
        },
        {
          type: 'doc',
          id: 'east-house',
          label: 'East House',
        },
      ],
    },
  ],
};

export default sidebars;
