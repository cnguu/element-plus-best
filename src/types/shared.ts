/** 用户信息 */
export interface Userinfo {
  /** 用户ID */
  id: string | number
  /** 用户名 */
  username: string
  /** 真实姓名 */
  realName?: string
  /** 头像 */
  avatar?: string
  /** 角色 */
  roles?: string[]
}
