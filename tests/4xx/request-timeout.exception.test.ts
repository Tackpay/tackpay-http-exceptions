import { RequestTimeoutException } from '../../src/4xx/request-timeout.exception'
import { HttpException } from '../../src/http.exception'

describe('RequestTimeoutException', () => {
  it('should create an instance with default values', () => {
    const exception = new RequestTimeoutException('Request timed out')

    expect(exception.status).toBe('408')
    expect(exception.detail).toBe('Request timed out')
    expect(exception.title).toBe('Request Timeout')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '408',
      code: undefined,
      title: 'Request Timeout',
      detail: 'Request timed out',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new RequestTimeoutException(
      'Request timed out',
      'REQUEST_TIMEOUT'
    )

    expect(exception.status).toBe('408')
    expect(exception.detail).toBe('Request timed out')
    expect(exception.code).toBe('REQUEST_TIMEOUT')
    expect(exception.title).toBe('Request Timeout')
  })

  it('should include additional options', () => {
    const exception = new RequestTimeoutException(
      'Request timed out',
      'REQUEST_TIMEOUT',
      {
        title: 'Custom Timeout Title',
        id: 'timeout-123',
        links: { about: 'http://example.com/request-timeout' },
        source: { pointer: '/data/request' },
        meta: { debug: 'Request exceeded time limit' }
      }
    )

    expect(exception.status).toBe('408')
    expect(exception.detail).toBe('Request timed out')
    expect(exception.code).toBe('REQUEST_TIMEOUT')
    expect(exception.title).toBe('Custom Timeout Title')
    expect(exception.id).toBe('timeout-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/request-timeout'
    })
    expect(exception.source).toEqual({ pointer: '/data/request' })
    expect(exception.meta).toEqual({ debug: 'Request exceeded time limit' })
    expect(exception.toJSON()).toEqual({
      id: 'timeout-123',
      links: { about: 'http://example.com/request-timeout' },
      status: '408',
      code: 'REQUEST_TIMEOUT',
      title: 'Custom Timeout Title',
      detail: 'Request timed out',
      source: { pointer: '/data/request' },
      meta: { debug: 'Request exceeded time limit' }
    })
  })

  it('should default to "Request Timeout" for the title if not provided in options', () => {
    const exception = new RequestTimeoutException(
      'Request timed out',
      undefined,
      {}
    )

    expect(exception.title).toBe('Request Timeout')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new RequestTimeoutException('Request timed out')

    expect(exception).toBeInstanceOf(RequestTimeoutException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(RequestTimeoutException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new RequestTimeoutException('Stack trace test')

    expect(exception.stack).toContain('RequestTimeoutException')
  })

  it('should throw and be caught as RequestTimeoutException', () => {
    try {
      throw new RequestTimeoutException('Request timed out')
    } catch (error) {
      expect(error).toBeInstanceOf(RequestTimeoutException)
      expect((error as any).status).toBe('408')
      expect((error as any).message).toBe('Request timed out')
      expect((error as any).title).toBe('Request Timeout')
      expect((error as any).stack).toContain('RequestTimeoutException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new RequestTimeoutException('Request timed out')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('408')
      expect((error as any).message).toBe('Request timed out')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new RequestTimeoutException(
        'Request timed out',
        'REQUEST_TIMEOUT',
        {
          meta: { debug: 'Request took too long' }
        }
      )
    } catch (error) {
      if (error instanceof RequestTimeoutException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '408',
          code: 'REQUEST_TIMEOUT',
          title: 'Request Timeout',
          detail: 'Request timed out',
          source: undefined,
          meta: { debug: 'Request took too long' }
        })
      } else {
        throw error
      }
    }
  })
})
