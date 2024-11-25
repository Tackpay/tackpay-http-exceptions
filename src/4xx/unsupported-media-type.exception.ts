import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class UnsupportedMediaTypeException extends HttpException {
  static readonly STATUS = '415'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: UnsupportedMediaTypeException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Unsupported Media Type'
    })

    Object.setPrototypeOf(this, UnsupportedMediaTypeException.prototype)
  }
}
