import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  spacesSidebar: [
    {
      type: 'doc',
      id: 'spaces/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Private Rooms',
      collapsed: false,
      items: [
        'spaces/room-a',
        'spaces/room-b',
        'spaces/room-c',
      ],
    },
    {
      type: 'category',
      label: 'Shared Spaces',
      collapsed: false,
      items: [
        'spaces/coworking-office',
        'spaces/kitchen',
        'spaces/outdoor-deck',
      ],
    },
  ],
};

export default sidebars;
