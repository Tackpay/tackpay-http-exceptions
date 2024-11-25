import { ForbiddenException } from '../../src/4xx/forbidden.exception'
import { HttpException } from '../../src/http.exception'

describe('ForbiddenException', () => {
  it('should create an instance with default values', () => {
    const exception = new ForbiddenException('Access denied')

    expect(exception.status).toBe('403')
    expect(exception.detail).toBe('Access denied')
    expect(exception.title).toBe('Forbidden')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '403',
      code: undefined,
      title: 'Forbidden',
      detail: 'Access denied',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new ForbiddenException('Access denied', 'FORBIDDEN_ERROR')

    expect(exception.status).toBe('403')
    expect(exception.detail).toBe('Access denied')
    expect(exception.code).toBe('FORBIDDEN_ERROR')
    expect(exception.title).toBe('Forbidden')
  })

  it('should include additional options', () => {
    const exception = new ForbiddenException(
      'Access denied',
      'FORBIDDEN_ERROR',
      {
        title: 'Custom Forbidden Title',
        id: '789',
        links: { about: 'http://example.com/forbidden' },
        source: { pointer: '/data/user' },
        meta: { debug: 'User does not have permission' }
      }
    )

    expect(exception.status).toBe('403')
    expect(exception.detail).toBe('Access denied')
    expect(exception.code).toBe('FORBIDDEN_ERROR')
    expect(exception.title).toBe('Custom Forbidden Title')
    expect(exception.id).toBe('789')
    expect(exception.links).toEqual({ about: 'http://example.com/forbidden' })
    expect(exception.source).toEqual({ pointer: '/data/user' })
    expect(exception.meta).toEqual({ debug: 'User does not have permission' })
    expect(exception.toJSON()).toEqual({
      id: '789',
      links: { about: 'http://example.com/forbidden' },
      status: '403',
      code: 'FORBIDDEN_ERROR',
      title: 'Custom Forbidden Title',
      detail: 'Access denied',
      source: { pointer: '/data/user' },
      meta: { debug: 'User does not have permission' }
    })
  })

  it('should default to "Forbidden" for the title if not provided in options', () => {
    const exception = new ForbiddenException('Access denied', undefined, {})

    expect(exception.title).toBe('Forbidden')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new ForbiddenException('Access denied')

    expect(exception).toBeInstanceOf(ForbiddenException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(ForbiddenException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new ForbiddenException('Stack trace test')

    expect(exception.stack).toContain('ForbiddenException')
  })

  it('should throw and be caught as ForbiddenException', () => {
    try {
      throw new ForbiddenException('Access denied')
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException)
      expect((error as any).status).toBe('403')
      expect((error as any).message).toBe('Access denied')
      expect((error as any).title).toBe('Forbidden')
      expect((error as any).stack).toContain('ForbiddenException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new ForbiddenException('Access denied')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('403')
      expect((error as any).message).toBe('Access denied')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new ForbiddenException('Access denied', 'FORBIDDEN_ERROR', {
        meta: { debug: 'Permission issue' }
      })
    } catch (error) {
      if (error instanceof ForbiddenException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '403',
          code: 'FORBIDDEN_ERROR',
          title: 'Forbidden',
          detail: 'Access denied',
          source: undefined,
          meta: { debug: 'Permission issue' }
        })
      } else {
        throw error
      }
    }
  })
})
