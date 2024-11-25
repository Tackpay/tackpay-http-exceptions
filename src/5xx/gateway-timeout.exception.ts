import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class GatewayTimeoutException extends HttpException {
  static readonly STATUS = '504'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: GatewayTimeoutException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Gateway Timeout'
    })

    Object.setPrototypeOf(this, GatewayTimeoutException.prototype)
  }
}
