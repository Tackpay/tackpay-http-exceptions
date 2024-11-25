import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class MethodNotAllowedException extends HttpException {
  static readonly STATUS = '405'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: MethodNotAllowedException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Method Not Allowed'
    })

    Object.setPrototypeOf(this, MethodNotAllowedException.prototype)
  }
}
