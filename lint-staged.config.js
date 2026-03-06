const eslintCacheFix = 'eslint --fix --cache'
const prettierCacheIgnoreUnknownWrite = 'prettier --cache --ignore-unknown --write'

export default {
  '*.{ts,tsx,mts,cts,vue}': [eslintCacheFix, prettierCacheIgnoreUnknownWrite],
  '*.{js,jsx,mjs,cjs}': [eslintCacheFix, prettierCacheIgnoreUnknownWrite],
  '*.{scss,sass,less,styl,html,css}': [prettierCacheIgnoreUnknownWrite],
  '*.md': [prettierCacheIgnoreUnknownWrite],
  '*.{yml,yaml}': [prettierCacheIgnoreUnknownWrite],
  'package.json': [prettierCacheIgnoreUnknownWrite, 'sort-package-json'],
}
