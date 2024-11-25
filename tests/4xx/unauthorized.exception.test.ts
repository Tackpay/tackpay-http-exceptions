import { UnauthorizedException } from '../../src/4xx/unauthorized.exception'
import { HttpException } from '../../src/http.exception'

describe('UnauthorizedException', () => {
  it('should create an instance with default values', () => {
    const exception = new UnauthorizedException(
      'You are not authorized to access this resource'
    )

    expect(exception.status).toBe('401')
    expect(exception.detail).toBe(
      'You are not authorized to access this resource'
    )
    expect(exception.title).toBe('Unauthorized')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '401',
      code: undefined,
      title: 'Unauthorized',
      detail: 'You are not authorized to access this resource',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new UnauthorizedException(
      'You are not authorized to access this resource',
      'UNAUTHORIZED_ERROR'
    )

    expect(exception.status).toBe('401')
    expect(exception.detail).toBe(
      'You are not authorized to access this resource'
    )
    expect(exception.code).toBe('UNAUTHORIZED_ERROR')
    expect(exception.title).toBe('Unauthorized')
  })

  it('should include additional options', () => {
    const exception = new UnauthorizedException(
      'You are not authorized to access this resource',
      'UNAUTHORIZED_ERROR',
      {
        title: 'Custom Unauthorized Title',
        id: 'unauthorized-123',
        links: { about: 'http://example.com/unauthorized' },
        source: { pointer: '/data/attributes' },
        meta: { debug: 'User not logged in' }
      }
    )

    expect(exception.status).toBe('401')
    expect(exception.detail).toBe(
      'You are not authorized to access this resource'
    )
    expect(exception.code).toBe('UNAUTHORIZED_ERROR')
    expect(exception.title).toBe('Custom Unauthorized Title')
    expect(exception.id).toBe('unauthorized-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/unauthorized'
    })
    expect(exception.source).toEqual({ pointer: '/data/attributes' })
    expect(exception.meta).toEqual({ debug: 'User not logged in' })
    expect(exception.toJSON()).toEqual({
      id: 'unauthorized-123',
      links: { about: 'http://example.com/unauthorized' },
      status: '401',
      code: 'UNAUTHORIZED_ERROR',
      title: 'Custom Unauthorized Title',
      detail: 'You are not authorized to access this resource',
      source: { pointer: '/data/attributes' },
      meta: { debug: 'User not logged in' }
    })
  })

  it('should default to "Unauthorized" for the title if not provided in options', () => {
    const exception = new UnauthorizedException(
      'You are not authorized to access this resource',
      undefined,
      {}
    )

    expect(exception.title).toBe('Unauthorized')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new UnauthorizedException(
      'You are not authorized to access this resource'
    )

    expect(exception).toBeInstanceOf(UnauthorizedException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(UnauthorizedException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new UnauthorizedException('Stack trace test')

    expect(exception.stack).toContain('UnauthorizedException')
  })

  it('should throw and be caught as UnauthorizedException', () => {
    try {
      throw new UnauthorizedException(
        'You are not authorized to access this resource'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
      expect((error as any).status).toBe('401')
      expect((error as any).message).toBe(
        'You are not authorized to access this resource'
      )
      expect((error as any).title).toBe('Unauthorized')
      expect((error as any).stack).toContain('UnauthorizedException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new UnauthorizedException(
        'You are not authorized to access this resource'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('401')
      expect((error as any).message).toBe(
        'You are not authorized to access this resource'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
        'UNAUTHORIZED_ERROR',
        {
          meta: { debug: 'User session expired' }
        }
      )
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '401',
          code: 'UNAUTHORIZED_ERROR',
          title: 'Unauthorized',
          detail: 'You are not authorized to access this resource',
          source: undefined,
          meta: { debug: 'User session expired' }
        })
      } else {
        throw error
      }
    }
  })
})
