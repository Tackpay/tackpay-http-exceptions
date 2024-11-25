import { HttpException } from '../http.exception'
import { type HttpOptions } from '../types'

/**
 * A generic 400 Bad Request exception
 */
export class BadRequestException extends HttpException {
  /**
   * The HTTP status code for the exception
   */
  static readonly STATUS = '400'

  constructor(detail: string, code?: string, options?: HttpOptions) {
    super({
      status: BadRequestException.STATUS,
      detail,
      code,
      ...options,
      title: options?.title ?? 'Bad Request'
    })

    Object.setPrototypeOf(this, BadRequestException.prototype)
  }
}
