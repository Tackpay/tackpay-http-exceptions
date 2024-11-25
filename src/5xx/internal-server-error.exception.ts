import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class InternalServerErrorException extends HttpException {
  static readonly STATUS = '500'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: InternalServerErrorException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Internal Server Error'
    })

    Object.setPrototypeOf(this, InternalServerErrorException.prototype)
  }
}
