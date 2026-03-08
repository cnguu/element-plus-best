/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 路由基础路径 */
  readonly VITE_BASE_PATH: string
  /** 请求接口地址 */
  readonly VITE_API: string
  /** 请求接口地址公共前缀 */
  readonly VITE_API_PREFIX: string
  /** 开发服务器端口 */
  readonly VITE_SERVER_PORT: string
  /** 开发服务器请求代理 */
  readonly VITE_SERVER_PROXY: string
  /** mock 开关 */
  readonly VITE_MOCK: string
  /** mock 地址 */
  readonly VITE_MOCK_URL: string
  /** mock token */
  readonly VITE_MOCK_TOKEN: string
  /** mock token 字段名 */
  readonly VITE_MOCK_TOKEN_FIELD: string
  /** iconify 地址 */
  readonly VITE_ICONIFY_URL: string
}

interface ImportMeta {
  readonly env: Env.ImportMetaEnv
}
