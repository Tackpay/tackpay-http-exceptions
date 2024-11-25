import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class RequestTimeoutException extends HttpException {
  static readonly STATUS = '408'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: RequestTimeoutException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Request Timeout'
    })

    Object.setPrototypeOf(this, RequestTimeoutException.prototype)
  }
}
