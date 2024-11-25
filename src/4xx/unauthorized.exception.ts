import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class UnauthorizedException extends HttpException {
  static readonly STATUS = '401'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: UnauthorizedException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Unauthorized'
    })

    Object.setPrototypeOf(this, UnauthorizedException.prototype)
  }
}
