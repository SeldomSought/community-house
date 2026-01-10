import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/community-house/about',
    component: ComponentCreator('/community-house/about', 'a29'),
    exact: true
  },
  {
    path: '/community-house/apply',
    component: ComponentCreator('/community-house/apply', '040'),
    exact: true
  },
  {
    path: '/community-house/blog',
    component: ComponentCreator('/community-house/blog', '88b'),
    exact: true
  },
  {
    path: '/community-house/blog/archive',
    component: ComponentCreator('/community-house/blog/archive', '632'),
    exact: true
  },
  {
    path: '/community-house/blog/authors',
    component: ComponentCreator('/community-house/blog/authors', '280'),
    exact: true
  },
  {
    path: '/community-house/blog/tags',
    component: ComponentCreator('/community-house/blog/tags', 'fcd'),
    exact: true
  },
  {
    path: '/community-house/blog/tags/announcement',
    component: ComponentCreator('/community-house/blog/tags/announcement', 'c6f'),
    exact: true
  },
  {
    path: '/community-house/blog/tags/community',
    component: ComponentCreator('/community-house/blog/tags/community', 'c56'),
    exact: true
  },
  {
    path: '/community-house/blog/welcome-to-the-fellowship',
    component: ComponentCreator('/community-house/blog/welcome-to-the-fellowship', 'a9a'),
    exact: true
  },
  {
    path: '/community-house/events',
    component: ComponentCreator('/community-house/events', '6cd'),
    exact: true
  },
  {
    path: '/community-house/location',
    component: ComponentCreator('/community-house/location', 'b83'),
    exact: true
  },
  {
    path: '/community-house/membership',
    component: ComponentCreator('/community-house/membership', '5de'),
    exact: true
  },
  {
    path: '/community-house/spaces',
    component: ComponentCreator('/community-house/spaces', '717'),
    routes: [
      {
        path: '/community-house/spaces',
        component: ComponentCreator('/community-house/spaces', '1a0'),
        routes: [
          {
            path: '/community-house/spaces',
            component: ComponentCreator('/community-house/spaces', 'e11'),
            routes: [
              {
                path: '/community-house/spaces/spaces',
                component: ComponentCreator('/community-house/spaces/spaces', '4c7'),
                exact: true,
                sidebar: "spacesSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/community-house/',
    component: ComponentCreator('/community-house/', '534'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
