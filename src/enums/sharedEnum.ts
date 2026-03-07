import { enumUtil } from '@/utils/enumUtil.ts'

export const SexEnum = enumUtil({
  GIRL: {
    value: 0,
    label: '女',
  },
  BOY: {
    value: 1,
    label: '男',
  },
})

export const FlagStringEnum = enumUtil({
  TRUE: {
    value: '1',
    label: '是',
  },
  FALSE: {
    value: '0',
    label: '否',
  },
})

export const FlagNumberEnum = enumUtil({
  TRUE: {
    value: 1,
    label: '是',
  },
  FALSE: {
    value: 0,
    label: '否',
  },
})

export const FlagBooleanEnum = enumUtil({
  TRUE: {
    value: true,
    label: '是',
  },
  FALSE: {
    value: false,
    label: '否',
  },
})

export const ActionTypeEnum = enumUtil({
  ADD: {
    value: 'add',
    label: '新增',
  },
  EDIT: {
    value: 'edit',
    label: '编辑',
  },
  DETAIL: {
    value: 'detail',
    label: '查看',
  },
})
