import type { RouteRecordRaw } from 'vue-router'

import { DefaultLayout } from '@/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    component: DefaultLayout,
    redirect: '/about/index',
    meta: {
      title: '关于',
      icon: 'ep:info-filled',
    },
    children: [
      {
        path: 'index',
        name: 'AboutPage',
        component: () => import('@/views/about/AboutView.vue'),
        meta: {
          title: '关于项目',
          icon: 'ep:info-filled',
        },
      },
    ],
  },
]

export default routes
