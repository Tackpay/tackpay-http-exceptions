import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

export class UnprocessableEntityException extends HttpException {
  static readonly STATUS = '422'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: UnprocessableEntityException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Unprocessable Entity'
    })

    Object.setPrototypeOf(this, UnprocessableEntityException.prototype)
  }
}
