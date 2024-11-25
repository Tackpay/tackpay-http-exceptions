import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class NotImplementedException extends HttpException {
  static readonly STATUS = '501'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: NotImplementedException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Not Implemented'
    })

    Object.setPrototypeOf(this, NotImplementedException.prototype)
  }
}
