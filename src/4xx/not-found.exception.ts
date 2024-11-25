import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class NotFoundException extends HttpException {
  static readonly STATUS = '404'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: NotFoundException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Not Found'
    })

    Object.setPrototypeOf(this, NotFoundException.prototype)
  }
}
