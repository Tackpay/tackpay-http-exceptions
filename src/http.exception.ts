import {
  type Links,
  type IHttpException,
  type Source,
  type Meta
} from './types'

/**
 * A custom exception class for JSON API
 * @see https://jsonapi.org/format/#errors
 */
export class HttpException extends Error implements IHttpException {
  /**
   * The error object identifier.
   */
  readonly id?: string

  /**
   * Links related to the error
   */
  readonly links?: Links

  /**
   * The status code of the response
   * @default '500'
   */
  readonly status: string

  /**
   * The code for the error
   */
  readonly code?: string

  /**
   * The error title
   */
  readonly title?: string

  /**
   * The human-readable explanation specific to this occurrence of the problem
   */
  readonly detail?: string

  /**
   * Source of the error
   */
  readonly source?: Source

  /**
   * Additional meta data
   */
  readonly meta?: Meta
  /**
   * The original error that caused this exception
   */
  readonly originalError?: Error

  /**
   * Creates a new HttpException instance
   * @param exception - Partial JSON API exception details
   */
  constructor(exception: Partial<IHttpException> = {}, originalError?: Error) {
    super(exception.detail ?? 'An error occurred')
    this.id = exception.id
    this.links = exception.links
    this.status = exception.status ?? '500'
    this.code = exception.code
    this.title = exception.title
    this.detail = exception.detail
    this.source = exception.source
    this.meta = exception.meta

    // Capture the original error automatically
    this.originalError = originalError ?? HttpException.captureRawError()

    // Set the name explicitly for better debugging
    this.name = this.constructor.name ?? 'HttpException'

    // Set the prototype explicitly for correct inheritance
    Object.setPrototypeOf(this, HttpException.prototype)

    // Capture the stack trace for debugging
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, HttpException)
    }
  }

  /**
   * Provides a JSON representation of the exception, useful for logging or API responses.
   * @returns A JSON object compliant with the JSON API error format.
   */
  toJSON(): IHttpException {
    return {
      id: this.id,
      links: this.links,
      status: this.status,
      code: this.code,
      title: this.title,
      detail: this.detail,
      source: this.source,
      meta: this.meta
    }
  }

  /**
   * Gets the original raw error instance.
   * @returns The original Error or undefined.
   */
  getOriginalError(): Error | undefined {
    return this.originalError
  }

  /**
   * Checks if the exception contains critical information.
   * @returns True if the exception has a status and title, otherwise false.
   */
  isValid(): boolean {
    return this.status != null
  }

  /**
   * Captures the raw error from the current stack trace.
   * @returns The raw Error instance, if available, otherwise undefined.
   */
  private static captureRawError(): Error | undefined {
    try {
      // Throw a new error to capture the stack trace
      throw new Error('Captured raw error context')
    } catch (err) {
      // Return the caught error as the raw error
      return err as Error
    }
  }
}
