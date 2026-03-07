export interface NProgressOptions {
  /** 最小进度百分比 */
  minimum: number
  /** 动画缓动函数 */
  easing: string
  /** 定位方式 */
  positionUsing: '' | 'translate3d' | 'translate' | 'margin'
  /** 动画速度 (ms) */
  speed: number
  /** 是否自动递增 */
  trickle: boolean
  /** 自动递增速度 (ms) */
  trickleSpeed: number
  /** 是否显示加载旋转器 */
  showSpinner: boolean
  /** 进度条选择器 */
  barSelector: string
  /** 旋转器选择器 */
  spinnerSelector: string
  /** 父容器 */
  parent: string | HTMLElement
  /** 模板 */
  template: string
}

type CSSProperties = Partial<CSSStyleDeclaration>
type QueueFunction = (next: () => void) => void

/** 默认配置 */
const defaultSettings: NProgressOptions = {
  minimum: 0.08,
  easing: 'linear',
  positionUsing: '',
  speed: 200,
  trickle: true,
  trickleSpeed: 200,
  showSpinner: true,
  barSelector: '.n-progress__bar',
  spinnerSelector: '.n-progress__spinner',
  parent: 'body',
  template: `
    <div class="n-progress__bar">
      <div class="n-progress__peg"></div>
    </div>
    <div class="n-progress__spinner">
      <div class="n-progress__spinner-icon"></div>
    </div>
  `,
}

class NProgress {
  /** 当前状态 */
  static status: number | null = null

  /** 配置 */
  static settings: NProgressOptions = { ...defaultSettings }

  /**
   * 更新配置
   */
  static configure(options: Partial<NProgressOptions>): typeof NProgress {
    Object.assign(NProgress.settings, options)
    return NProgress
  }

  /**
   * 设置进度
   * @param n 进度值 (0.0 - 1.0)
   */
  static set(n: number): typeof NProgress {
    const started = NProgress.isStarted()
    n = clamp(n, NProgress.settings.minimum, 1)
    NProgress.status = n === 1 ? null : n

    const progress = NProgress.render(!started)
    const bar = progress.querySelector(NProgress.settings.barSelector) as HTMLElement
    const { speed, easing } = NProgress.settings

    // 触发重排
    void progress.offsetWidth

    queue((next) => {
      // 设置定位方式
      if (NProgress.settings.positionUsing === '') {
        NProgress.settings.positionUsing = NProgress.getPositioningCSS()
      }

      // 添加过渡动画
      css(bar, barPositionCSS(n, speed, easing))

      if (n === 1) {
        // 淡出
        css(progress, { transition: 'none', opacity: '1' })
        void progress.offsetWidth

        setTimeout(() => {
          css(progress, { transition: `all ${speed}ms linear`, opacity: '0' })
          setTimeout(() => {
            NProgress.remove()
            next()
          }, speed)
        }, speed)
      } else {
        setTimeout(next, speed)
      }
    })

    return NProgress
  }

  /**
   * 是否已开始
   */
  static isStarted(): boolean {
    return typeof NProgress.status === 'number'
  }

  /**
   * 开始进度条
   */
  static start(): typeof NProgress {
    if (!NProgress.status) {
      NProgress.set(0)
    }

    const work = () => {
      setTimeout(() => {
        if (!NProgress.status) return
        NProgress.trickle()
        work()
      }, NProgress.settings.trickleSpeed)
    }

    if (NProgress.settings.trickle) {
      work()
    }

    return NProgress
  }

  /**
   * 完成进度条
   * @param force 强制显示并完成
   */
  static done(force?: boolean): typeof NProgress {
    if (!force && !NProgress.status) return NProgress
    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1)
  }

  /**
   * 增加进度
   * @param amount 增加量
   */
  static inc(amount?: number): typeof NProgress {
    let n = NProgress.status

    if (!n) {
      return NProgress.start()
    }

    if (n > 1) {
      return NProgress
    }

    if (typeof amount !== 'number') {
      if (n >= 0 && n < 0.2) {
        amount = 0.1
      } else if (n >= 0.2 && n < 0.5) {
        amount = 0.04
      } else if (n >= 0.5 && n < 0.8) {
        amount = 0.02
      } else if (n >= 0.8 && n < 0.99) {
        amount = 0.005
      } else {
        amount = 0
      }
    }

    n = clamp(n + amount, 0, 0.994)
    return NProgress.set(n)
  }

  /**
   * 微量递增
   */
  static trickle(): typeof NProgress {
    return NProgress.inc()
  }

  /**
   * Promise 支持
   */
  static promise<T>(promise: Promise<T>): typeof NProgress {
    if (!promise) return NProgress

    let initial = 0
    let current = 0

    if (current === 0) {
      NProgress.start()
    }

    initial++
    current++

    promise.finally(() => {
      current--
      if (current === 0) {
        initial = 0
        NProgress.done()
      } else {
        NProgress.set((initial - current) / initial)
      }
    })

    return NProgress
  }

  /**
   * 渲染进度条
   */
  private static render(fromStart: boolean): HTMLElement {
    const existing = document.querySelector<HTMLElement>('.n-progress')
    if (existing) return existing

    document.documentElement.classList.add('n-progress--busy')

    const progress = document.createElement('div')
    progress.className = 'n-progress'
    progress.innerHTML = NProgress.settings.template

    const bar = progress.querySelector(NProgress.settings.barSelector) as HTMLElement
    const perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0)
    const parent = isDOM(NProgress.settings.parent)
      ? NProgress.settings.parent
      : document.querySelector<HTMLElement>(NProgress.settings.parent)

    if (!parent) {
      throw new Error(`NProgress: parent element not found: ${NProgress.settings.parent}`)
    }

    css(bar, {
      transition: 'all 0 linear',
      transform: `translate3d(${perc}%,0,0)`,
    })

    if (!NProgress.settings.showSpinner) {
      const spinner = progress.querySelector(NProgress.settings.spinnerSelector)
      spinner?.remove()
    }

    if (parent !== document.body) {
      parent.classList.add('n-progress--custom-parent')
    }

    parent.appendChild(progress)
    return progress
  }

  /**
   * 移除进度条
   */
  private static remove(): void {
    document.documentElement.classList.remove('n-progress--busy')

    const parent = isDOM(NProgress.settings.parent)
      ? NProgress.settings.parent
      : document.querySelector<HTMLElement>(NProgress.settings.parent)

    parent?.classList.remove('n-progress--custom-parent')

    const progress = document.querySelector<HTMLElement>('.n-progress')
    progress?.remove()
  }

  /**
   * 是否已渲染
   */
  static isRendered(): boolean {
    return !!document.querySelector('.n-progress')
  }

  /**
   * 获取定位 CSS 方式
   */
  private static getPositioningCSS(): 'translate3d' | 'translate' | 'margin' {
    const bodyStyle = document.body.style

    // 检测浏览器前缀
    const vendorPrefix =
      'WebkitTransform' in bodyStyle
        ? 'Webkit'
        : 'MozTransform' in bodyStyle
          ? 'Moz'
          : 'msTransform' in bodyStyle
            ? 'ms'
            : 'OTransform' in bodyStyle
              ? 'O'
              : ''

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      return 'translate3d'
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      return 'translate'
    }
    return 'margin'
  }
}

// ==================== 辅助函数 ====================

/**
 * 限制数值范围
 */
function clamp(n: number, min: number, max: number): number {
  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * 转换为进度条百分比
 */
function toBarPerc(n: number): number {
  return (-1 + n) * 100
}

/**
 * 生成进度条位置 CSS
 */
function barPositionCSS(n: number, speed: number, ease: string): CSSProperties {
  const { positionUsing } = NProgress.settings
  let barCSS: CSSProperties

  if (positionUsing === 'translate3d') {
    barCSS = { transform: `translate3d(${toBarPerc(n)}%,0,0)` }
  } else if (positionUsing === 'translate') {
    barCSS = { transform: `translate(${toBarPerc(n)}%,0)` }
  } else {
    barCSS = { marginLeft: `${toBarPerc(n)}%` }
  }

  barCSS.transition = `all ${speed}ms ${ease}`
  return barCSS
}

/**
 * 队列管理
 */
const queue = (() => {
  const pending: QueueFunction[] = []

  const next = () => {
    const fn = pending.shift()
    fn?.(next)
  }

  return (fn: QueueFunction) => {
    pending.push(fn)
    if (pending.length === 1) next()
  }
})()

/**
 * CSS 前缀列表
 */
const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'] as const
const cssProps: Record<string, string> = {}

/**
 * 转换为驼峰命名
 */
function camelCase(string: string): string {
  return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, (_, letter) => letter.toUpperCase())
}

/**
 * 获取浏览器前缀属性名
 */
function getVendorProp(name: string): string {
  const style = document.body.style
  if (name in style) return name

  const capName = name.charAt(0).toUpperCase() + name.slice(1)

  for (const prefix of cssPrefixes) {
    const vendorName = prefix + capName
    if (vendorName in style) return vendorName
  }

  return name
}

/**
 * 获取样式属性名
 */
function getStyleProp(name: string): string {
  const camelName = camelCase(name)
  return (cssProps[camelName] ??= getVendorProp(camelName))
}

/**
 * 应用 CSS 样式
 */
function css(element: HTMLElement, properties: CSSProperties): void
function css(element: HTMLElement, prop: string, value: string): void
function css(element: HTMLElement, propOrProps: string | CSSProperties, value?: string): void {
  const style = element.style
  if (typeof propOrProps === 'string') {
    const prop = getStyleProp(propOrProps)
    style.setProperty(prop.replace(/([A-Z])/g, '-$1').toLowerCase(), value!)
  } else {
    for (const [prop, val] of Object.entries(propOrProps)) {
      if (val !== undefined) {
        const styleProp = getStyleProp(prop)
        const cssValue = String(val)
        // 使用 setProperty 避免类型问题
        style.setProperty(styleProp.replace(/([A-Z])/g, '-$1').toLowerCase(), cssValue)
      }
    }
  }
}

/**
 * 判断是否为 DOM 元素
 */
function isDOM(obj: unknown): obj is HTMLElement {
  if (typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement
  }
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as HTMLElement).nodeType === 1 &&
    typeof (obj as HTMLElement).nodeName === 'string'
  )
}

export default NProgress

export function setupNProgress() {
  NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
  window.NProgress = NProgress
}
