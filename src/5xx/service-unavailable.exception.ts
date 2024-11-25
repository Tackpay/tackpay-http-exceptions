import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class ServiceUnavailableException extends HttpException {
  static readonly STATUS = '503'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: ServiceUnavailableException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Service Unavailable'
    })

    Object.setPrototypeOf(this, ServiceUnavailableException.prototype)
  }
}
