import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class NotAcceptableException extends HttpException {
  static readonly STATUS = '406'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: NotAcceptableException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Not Acceptable'
    })

    Object.setPrototypeOf(this, NotAcceptableException.prototype)
  }
}
