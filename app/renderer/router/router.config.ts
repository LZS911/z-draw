import React from 'react';
import { IMenuDataItem } from './index.type';

const routers: IMenuDataItem[] = [
  {
    path: '/home',
    name: 'home',
    component: React.lazy(() => import('../pages/Home')),
  },
];

export default routers;
