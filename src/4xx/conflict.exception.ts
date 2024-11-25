import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class ConflictException extends HttpException {
  static readonly STATUS = '409'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: ConflictException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Conflict'
    })

    Object.setPrototypeOf(this, ConflictException.prototype)
  }
}
