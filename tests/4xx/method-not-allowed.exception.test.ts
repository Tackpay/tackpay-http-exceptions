import { MethodNotAllowedException } from '../../src/4xx/method-not-allowed.exception'
import { HttpException } from '../../src/http.exception'

describe('MethodNotAllowedException', () => {
  it('should create an instance with default values', () => {
    const exception = new MethodNotAllowedException('Method is not allowed')

    expect(exception.status).toBe('405')
    expect(exception.detail).toBe('Method is not allowed')
    expect(exception.title).toBe('Method Not Allowed')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '405',
      code: undefined,
      title: 'Method Not Allowed',
      detail: 'Method is not allowed',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new MethodNotAllowedException(
      'Method is not allowed',
      'METHOD_NOT_ALLOWED'
    )

    expect(exception.status).toBe('405')
    expect(exception.detail).toBe('Method is not allowed')
    expect(exception.code).toBe('METHOD_NOT_ALLOWED')
    expect(exception.title).toBe('Method Not Allowed')
  })

  it('should include additional options', () => {
    const exception = new MethodNotAllowedException(
      'Method is not allowed',
      'METHOD_NOT_ALLOWED',
      {
        title: 'Custom Method Title',
        id: 'method-123',
        links: { about: 'http://example.com/method-not-allowed' },
        source: { pointer: '/data/method' },
        meta: { debug: 'Method not supported for this endpoint' }
      }
    )

    expect(exception.status).toBe('405')
    expect(exception.detail).toBe('Method is not allowed')
    expect(exception.code).toBe('METHOD_NOT_ALLOWED')
    expect(exception.title).toBe('Custom Method Title')
    expect(exception.id).toBe('method-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/method-not-allowed'
    })
    expect(exception.source).toEqual({ pointer: '/data/method' })
    expect(exception.meta).toEqual({
      debug: 'Method not supported for this endpoint'
    })
    expect(exception.toJSON()).toEqual({
      id: 'method-123',
      links: { about: 'http://example.com/method-not-allowed' },
      status: '405',
      code: 'METHOD_NOT_ALLOWED',
      title: 'Custom Method Title',
      detail: 'Method is not allowed',
      source: { pointer: '/data/method' },
      meta: { debug: 'Method not supported for this endpoint' }
    })
  })

  it('should default to "Method Not Allowed" for the title if not provided in options', () => {
    const exception = new MethodNotAllowedException(
      'Method is not allowed',
      undefined,
      {}
    )

    expect(exception.title).toBe('Method Not Allowed')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new MethodNotAllowedException('Method is not allowed')

    expect(exception).toBeInstanceOf(MethodNotAllowedException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(MethodNotAllowedException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new MethodNotAllowedException('Stack trace test')

    expect(exception.stack).toContain('MethodNotAllowedException')
  })

  it('should throw and be caught as MethodNotAllowedException', () => {
    try {
      throw new MethodNotAllowedException('Method is not allowed')
    } catch (error) {
      expect(error).toBeInstanceOf(MethodNotAllowedException)
      expect((error as any).status).toBe('405')
      expect((error as any).message).toBe('Method is not allowed')
      expect((error as any).title).toBe('Method Not Allowed')
      expect((error as any).stack).toContain('MethodNotAllowedException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new MethodNotAllowedException('Method is not allowed')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('405')
      expect((error as any).message).toBe('Method is not allowed')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new MethodNotAllowedException(
        'Method is not allowed',
        'METHOD_NOT_ALLOWED',
        {
          meta: { debug: 'Unsupported method' }
        }
      )
    } catch (error) {
      if (error instanceof MethodNotAllowedException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '405',
          code: 'METHOD_NOT_ALLOWED',
          title: 'Method Not Allowed',
          detail: 'Method is not allowed',
          source: undefined,
          meta: { debug: 'Unsupported method' }
        })
      } else {
        throw error
      }
    }
  })
})
