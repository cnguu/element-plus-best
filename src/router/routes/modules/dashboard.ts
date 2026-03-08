import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DefaultLayout,
    redirect: '/dashboard/workspace',
    meta: {
      title: '仪表盘',
      icon: 'ep:dashboard',
    },
    children: [
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('@/views/dashboard/WorkspaceView.vue'),
        meta: {
          title: '工作台',
          icon: 'ep:home-filled',
        },
      },
    ],
  },
]

export default routes
