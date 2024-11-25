import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class ImATeapotException extends HttpException {
  static readonly STATUS = '418'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: ImATeapotException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? "I'm a teapot"
    })

    Object.setPrototypeOf(this, ImATeapotException.prototype)
  }
}
