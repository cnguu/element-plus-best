import calendar from 'dayjs/plugin/calendar'
import localeData from 'dayjs/plugin/localeData'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'

import { TimezoneEnum } from '@/enums/timezoneEnum.ts'
import { setDayjsLocale } from '@/locales/dayjs.ts'
import { dateUtil } from '@/utils/dateUtil.ts'

export function setupDayjs() {
  dateUtil.extend(localeData)
  dateUtil.extend(updateLocale)
  dateUtil.extend(calendar)
  dateUtil.extend(quarterOfYear)
  dateUtil.extend(relativeTime)
  dateUtil.extend(timezone)
  dateUtil.extend(utc)
  dateUtil.extend(weekday)

  dateUtil.tz.setDefault(TimezoneEnum.ASIA_SHANGHAI)

  setDayjsLocale()
}
