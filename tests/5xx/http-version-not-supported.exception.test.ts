import { HttpVersionNotSupportedException } from '../../src/5xx/http-version-not-supported.exception'
import { HttpException } from '../../src/http.exception'

describe('HttpVersionNotSupportedException', () => {
  it('should create an instance with default values', () => {
    const exception = new HttpVersionNotSupportedException(
      'The HTTP version used in the request is not supported by the server'
    )

    expect(exception.status).toBe('505')
    expect(exception.detail).toBe(
      'The HTTP version used in the request is not supported by the server'
    )
    expect(exception.title).toBe('HTTP Version Not Supported')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '505',
      code: undefined,
      title: 'HTTP Version Not Supported',
      detail:
        'The HTTP version used in the request is not supported by the server',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new HttpVersionNotSupportedException(
      'The HTTP version used in the request is not supported by the server',
      'HTTP_VERSION_NOT_SUPPORTED'
    )

    expect(exception.status).toBe('505')
    expect(exception.detail).toBe(
      'The HTTP version used in the request is not supported by the server'
    )
    expect(exception.code).toBe('HTTP_VERSION_NOT_SUPPORTED')
    expect(exception.title).toBe('HTTP Version Not Supported')
  })

  it('should include additional options', () => {
    const exception = new HttpVersionNotSupportedException(
      'The HTTP version used in the request is not supported by the server',
      'HTTP_VERSION_NOT_SUPPORTED',
      {
        title: 'Custom HTTP Version Title',
        id: 'http-version-123',
        links: { about: 'http://example.com/http-version-not-supported' },
        source: { pointer: '/data/http-version' },
        meta: { debug: 'HTTP/2 not supported' }
      }
    )

    expect(exception.status).toBe('505')
    expect(exception.detail).toBe(
      'The HTTP version used in the request is not supported by the server'
    )
    expect(exception.code).toBe('HTTP_VERSION_NOT_SUPPORTED')
    expect(exception.title).toBe('Custom HTTP Version Title')
    expect(exception.id).toBe('http-version-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/http-version-not-supported'
    })
    expect(exception.source).toEqual({ pointer: '/data/http-version' })
    expect(exception.meta).toEqual({ debug: 'HTTP/2 not supported' })
    expect(exception.toJSON()).toEqual({
      id: 'http-version-123',
      links: { about: 'http://example.com/http-version-not-supported' },
      status: '505',
      code: 'HTTP_VERSION_NOT_SUPPORTED',
      title: 'Custom HTTP Version Title',
      detail:
        'The HTTP version used in the request is not supported by the server',
      source: { pointer: '/data/http-version' },
      meta: { debug: 'HTTP/2 not supported' }
    })
  })

  it('should default to "HTTP Version Not Supported" for the title if not provided in options', () => {
    const exception = new HttpVersionNotSupportedException(
      'The HTTP version used in the request is not supported by the server',
      undefined,
      {}
    )

    expect(exception.title).toBe('HTTP Version Not Supported')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new HttpVersionNotSupportedException(
      'The HTTP version used in the request is not supported by the server'
    )

    expect(exception).toBeInstanceOf(HttpVersionNotSupportedException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(HttpVersionNotSupportedException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new HttpVersionNotSupportedException('Stack trace test')

    expect(exception.stack).toContain('HttpVersionNotSupportedException')
  })

  it('should throw and be caught as HttpVersionNotSupportedException', () => {
    try {
      throw new HttpVersionNotSupportedException(
        'The HTTP version used in the request is not supported by the server'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpVersionNotSupportedException)
      expect((error as any).status).toBe('505')
      expect((error as any).message).toBe(
        'The HTTP version used in the request is not supported by the server'
      )
      expect((error as any).title).toBe('HTTP Version Not Supported')
      expect((error as any).stack).toContain('HttpVersionNotSupportedException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new HttpVersionNotSupportedException(
        'The HTTP version used in the request is not supported by the server'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('505')
      expect((error as any).message).toBe(
        'The HTTP version used in the request is not supported by the server'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new HttpVersionNotSupportedException(
        'The HTTP version used in the request is not supported by the server',
        'HTTP_VERSION_NOT_SUPPORTED',
        {
          meta: { debug: 'HTTP/2 not supported' }
        }
      )
    } catch (error) {
      if (error instanceof HttpVersionNotSupportedException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '505',
          code: 'HTTP_VERSION_NOT_SUPPORTED',
          title: 'HTTP Version Not Supported',
          detail:
            'The HTTP version used in the request is not supported by the server',
          source: undefined,
          meta: { debug: 'HTTP/2 not supported' }
        })
      } else {
        throw error
      }
    }
  })
})
