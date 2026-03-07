import { ERROR_COLOR, THEME_COLOR, WARN_COLOR } from '@/utils/styleUtil.ts'

type LogLevel = 'log' | 'warn' | 'error'

interface LevelStyleConfig {
  prefixStyle: string
  consoleMethod: LogLevel
}

const prefixBaseStyle =
  'color: #ffffff; padding: 4px 8px; border-radius: 4px; font-weight: 500; font-size: 16px;'

class Logger {
  #enabled: boolean

  static readonly #PREFIX: string = import.meta.env.VITE_APP_TITLE

  static readonly #STYLE_CONFIG: Record<LogLevel, LevelStyleConfig> = {
    log: {
      prefixStyle: `background-color: ${THEME_COLOR}; ${prefixBaseStyle}`,
      consoleMethod: 'log',
    },
    warn: {
      prefixStyle: `background-color: ${WARN_COLOR}; ${prefixBaseStyle}`,
      consoleMethod: 'warn',
    },
    error: {
      prefixStyle: `background-color: ${ERROR_COLOR}; ${prefixBaseStyle}`,
      consoleMethod: 'error',
    },
  }

  constructor(enabled: boolean = true) {
    this.#enabled = enabled
  }

  #print(level: LogLevel, ...args: any[]): void {
    if (!this.#enabled) {
      return
    }
    const { prefixStyle, consoleMethod } = Logger.#STYLE_CONFIG[level]
    const consoleArgs: any[] = [`%c${Logger.#PREFIX}`, prefixStyle, ...args]
    // eslint-disable-next-line no-console
    console[consoleMethod](...consoleArgs)
  }

  log(...args: any[]): void {
    this.#print('log', ...args)
  }

  warn(...args: any[]): void {
    this.#print('warn', ...args)
  }

  error(...args: any[]): void {
    this.#print('error', ...args)
  }

  setEnabled(enabled: boolean = true): void {
    this.#enabled = enabled
  }
}

export const logUtil = new Logger()
