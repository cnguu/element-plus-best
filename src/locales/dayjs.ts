import type { LangType } from '@/types/app.ts'

import { CacheKeyEnum } from '@/enums/cacheEnum.ts'
import { dateUtil } from '@/utils/dateUtil.ts'
import { storage } from '@/utils/storageUtil.ts'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

const localeMap = {
  'zh-CN': 'zh-cn',
  'en-US': 'en',
} as const satisfies Record<LangType, string>

type LocaleName = (typeof localeMap)[keyof typeof localeMap]

const localeConfigs: Record<LocaleName, Parameters<typeof dateUtil.updateLocale>[1]> = {
  'zh-cn': {
    calendar: {
      sameDay: 'HH:mm',
      nextDay: '[明天]',
      nextWeek: 'dddd',
      lastDay: '[昨天] HH:mm',
      lastWeek: 'dddd HH:mm',
      sameElse: 'YYYY年M月D日 HH:mm',
    },
    relativeTime: {
      future: '%s后',
      past: '%s前',
      s: '几秒',
      m: '1分钟',
      mm: '%d分钟',
      h: '1小时',
      hh: '%d小时',
      d: '1天',
      dd: '%d天',
      M: '1个月',
      MM: '%d个月',
      y: '1年',
      yy: '%d年',
    },
  },
  en: {
    calendar: {
      sameDay: 'HH:mm',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday] HH:mm',
      lastWeek: '[Last] dddd HH:mm',
      sameElse: 'MMM D, YYYY HH:mm',
    },
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  },
}

export function setDayjsLocale(lang: LangType = 'zh-CN') {
  const localeName = localeMap[lang || storage.get(CacheKeyEnum.LANG) || 'zh-CN']

  dateUtil.locale(localeName)

  dateUtil.updateLocale(localeName, localeConfigs[localeName])
}
