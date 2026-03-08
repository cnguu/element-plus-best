import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'Profile',
    component: DefaultLayout,
    redirect: '/profile/index',
    meta: {
      title: '个人中心',
      icon: 'ep:user',
      hideInMenu: true,
    },
    children: [
      {
        path: 'index',
        name: 'ProfilePage',
        component: () => import('@/views/_core/profile/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'ep:user',
        },
      },
    ],
  },
]

export default routes
