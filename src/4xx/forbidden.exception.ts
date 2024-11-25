import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class ForbiddenException extends HttpException {
  static readonly STATUS = '403'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: ForbiddenException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Forbidden'
    })

    Object.setPrototypeOf(this, ForbiddenException.prototype)
  }
}
