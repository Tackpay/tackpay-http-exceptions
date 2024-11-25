import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class TooManyRequestsException extends HttpException {
  static readonly STATUS = '429'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: TooManyRequestsException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Too Many Request'
    })

    Object.setPrototypeOf(this, TooManyRequestsException.prototype)
  }
}
