import { TooManyRequestsException } from '../../src/4xx/too-many-requests.exception'
import { HttpException } from '../../src/http.exception'

describe('TooManyRequestsException', () => {
  it('should create an instance with default values', () => {
    const exception = new TooManyRequestsException(
      'You have sent too many requests in a given amount of time'
    )

    expect(exception.status).toBe('429')
    expect(exception.detail).toBe(
      'You have sent too many requests in a given amount of time'
    )
    expect(exception.title).toBe('Too Many Request')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '429',
      code: undefined,
      title: 'Too Many Request',
      detail: 'You have sent too many requests in a given amount of time',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new TooManyRequestsException(
      'You have sent too many requests in a given amount of time',
      'TOO_MANY_REQUESTS'
    )

    expect(exception.status).toBe('429')
    expect(exception.detail).toBe(
      'You have sent too many requests in a given amount of time'
    )
    expect(exception.code).toBe('TOO_MANY_REQUESTS')
    expect(exception.title).toBe('Too Many Request')
  })

  it('should include additional options', () => {
    const exception = new TooManyRequestsException(
      'You have sent too many requests in a given amount of time',
      'TOO_MANY_REQUESTS',
      {
        title: 'Custom Too Many Requests Title',
        id: 'too-many-requests-123',
        links: { about: 'http://example.com/too-many-requests' },
        source: { pointer: '/data/request-limit' },
        meta: { retryAfter: '30 seconds' }
      }
    )

    expect(exception.status).toBe('429')
    expect(exception.detail).toBe(
      'You have sent too many requests in a given amount of time'
    )
    expect(exception.code).toBe('TOO_MANY_REQUESTS')
    expect(exception.title).toBe('Custom Too Many Requests Title')
    expect(exception.id).toBe('too-many-requests-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/too-many-requests'
    })
    expect(exception.source).toEqual({ pointer: '/data/request-limit' })
    expect(exception.meta).toEqual({ retryAfter: '30 seconds' })
    expect(exception.toJSON()).toEqual({
      id: 'too-many-requests-123',
      links: { about: 'http://example.com/too-many-requests' },
      status: '429',
      code: 'TOO_MANY_REQUESTS',
      title: 'Custom Too Many Requests Title',
      detail: 'You have sent too many requests in a given amount of time',
      source: { pointer: '/data/request-limit' },
      meta: { retryAfter: '30 seconds' }
    })
  })

  it('should default to "Too Many Request" for the title if not provided in options', () => {
    const exception = new TooManyRequestsException(
      'You have sent too many requests in a given amount of time',
      undefined,
      {}
    )

    expect(exception.title).toBe('Too Many Request')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new TooManyRequestsException(
      'You have sent too many requests in a given amount of time'
    )

    expect(exception).toBeInstanceOf(TooManyRequestsException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(TooManyRequestsException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new TooManyRequestsException('Stack trace test')

    expect(exception.stack).toContain('TooManyRequestsException')
  })

  it('should throw and be caught as TooManyRequestsException', () => {
    try {
      throw new TooManyRequestsException(
        'You have sent too many requests in a given amount of time'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(TooManyRequestsException)
      expect((error as any).status).toBe('429')
      expect((error as any).message).toBe(
        'You have sent too many requests in a given amount of time'
      )
      expect((error as any).title).toBe('Too Many Request')
      expect((error as any).stack).toContain('TooManyRequestsException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new TooManyRequestsException(
        'You have sent too many requests in a given amount of time'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('429')
      expect((error as any).message).toBe(
        'You have sent too many requests in a given amount of time'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new TooManyRequestsException(
        'You have sent too many requests in a given amount of time',
        'TOO_MANY_REQUESTS',
        {
          meta: { retryAfter: '30 seconds' }
        }
      )
    } catch (error) {
      if (error instanceof TooManyRequestsException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '429',
          code: 'TOO_MANY_REQUESTS',
          title: 'Too Many Request',
          detail: 'You have sent too many requests in a given amount of time',
          source: undefined,
          meta: { retryAfter: '30 seconds' }
        })
      } else {
        throw error
      }
    }
  })
})
