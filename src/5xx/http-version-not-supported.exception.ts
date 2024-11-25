import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class HttpVersionNotSupportedException extends HttpException {
  static readonly STATUS = '505'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: HttpVersionNotSupportedException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'HTTP Version Not Supported'
    })

    Object.setPrototypeOf(this, HttpVersionNotSupportedException.prototype)
  }
}
