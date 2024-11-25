import { HttpException } from '../src/http.exception'
import { type IHttpException } from '../src/types'

describe('HttpException', () => {
  it('should create an instance with default values', () => {
    const exception = new HttpException()
    expect(exception.status).toBe('500')
    expect(exception.message).toBe('An error occurred')
    expect(exception.getOriginalError()).toBeDefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '500',
      code: undefined,
      title: undefined,
      detail: undefined,
      source: undefined,
      meta: undefined
    })
  })

  it('should create an instance with provided details', () => {
    const exceptionDetails: Partial<IHttpException> = {
      id: '123',
      links: { about: 'http://example.com/error' },
      status: '404',
      code: 'NOT_FOUND',
      title: 'Not Found',
      detail: 'The requested resource was not found',
      source: { pointer: '/data/attributes/name' },
      meta: { timestamp: '2024-11-25T00:00:00Z' }
    }
    const exception = new HttpException(exceptionDetails)

    expect(exception.id).toBe('123')
    expect(exception.links).toEqual({ about: 'http://example.com/error' })
    expect(exception.status).toBe('404')
    expect(exception.code).toBe('NOT_FOUND')
    expect(exception.title).toBe('Not Found')
    expect(exception.detail).toBe('The requested resource was not found')
    expect(exception.source).toEqual({ pointer: '/data/attributes/name' })
    expect(exception.meta).toEqual({ timestamp: '2024-11-25T00:00:00Z' })
    expect(exception.toJSON()).toEqual(exceptionDetails)
  })

  it('should include the original error when provided', () => {
    const rawError = new Error('Underlying issue')
    const exception = new HttpException(
      {
        title: 'Test Error',
        detail: 'A detailed message'
      },
      rawError
    )

    expect(exception.getOriginalError()).toBe(rawError)
    expect(exception.getOriginalError()?.message).toBe('Underlying issue')
  })

  it('should create an instance with captured raw error if no original error is provided', () => {
    const exception = new HttpException({
      title: 'Captured Error Test'
    })

    expect(exception.getOriginalError()).toBeDefined()
    expect(exception.getOriginalError()?.message).toBe(
      'Captured raw error context'
    )
  })

  it('should correctly validate an instance with status and title', () => {
    const exception = new HttpException({
      status: '400',
      title: 'Bad Request'
    })

    expect(exception.isValid()).toBe(true)
  })

  it('should validate an instance without a status', () => {
    const exception = new HttpException({
      title: 'Error without status'
    })

    expect(exception.isValid()).toBe(true)
  })

  it('should correctly serialize to JSON without including the raw error', () => {
    const exception = new HttpException({
      status: '500',
      title: 'Internal Server Error',
      detail: 'An unexpected error occurred'
    })

    const json = exception.toJSON()
    expect(json).toEqual({
      id: undefined,
      links: undefined,
      status: '500',
      code: undefined,
      title: 'Internal Server Error',
      detail: 'An unexpected error occurred',
      source: undefined,
      meta: undefined
    })
  })

  it('should correctly serialize to JSON with all fields', () => {
    const exceptionDetails: Partial<IHttpException> = {
      id: 'test-id',
      links: { about: 'http://example.com/about' },
      status: '401',
      code: 'AUTH_ERROR',
      title: 'Unauthorized',
      detail: 'You are not authorized to perform this action.',
      source: { parameter: 'authToken' },
      meta: { debug: 'token_expired' }
    }

    const exception = new HttpException(exceptionDetails)

    expect(exception.toJSON()).toEqual(exceptionDetails)
  })

  it('should inherit from Error and have the correct prototype chain', () => {
    const exception = new HttpException({
      title: 'Prototype Test'
    })

    expect(exception).toBeInstanceOf(HttpException)
    expect(exception).toBeInstanceOf(Error)
    expect(Object.getPrototypeOf(exception)).toBe(HttpException.prototype)
  })

  it('should capture the stack trace for debugging', () => {
    const exception = new HttpException({
      title: 'Stack Trace Test'
    })

    expect(exception.stack).toContain('HttpException')
  })

  it('should handle missing detail gracefully', () => {
    const exception = new HttpException({
      status: '400',
      title: 'Missing Detail'
    })

    expect(exception.message).toBe('An error occurred')
  })
})
