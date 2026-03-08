interface TreeConfigOptions {
  /** 子属性的名称，默认为 children */
  childProps: string
}

/**
 * 遍历树形结构，并返回所有节点中指定的值
 * @param tree 树形结构数组
 * @param getValue 获取节点值的函数
 * @param options 作为子节点数组的可选属性名称
 * @returns 所有节点中指定的值的数组
 */
export function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options?: TreeConfigOptions,
): V[] {
  const result: V[] = []
  const { childProps } = options || { childProps: 'children' }

  const dfs = (treeNode: T) => {
    const value = getValue(treeNode)
    result.push(value)
    const children = (treeNode as Record<string, unknown>)?.[childProps]
    if (!children) {
      return
    }
    if (Array.isArray(children) && children.length > 0) {
      for (const child of children as T[]) {
        dfs(child)
      }
    }
  }

  for (const treeNode of tree) {
    dfs(treeNode)
  }

  return result.filter(Boolean)
}
