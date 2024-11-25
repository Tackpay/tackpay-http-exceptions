import { NotImplementedException } from '../../src/5xx/not-implemented.exception'
import { HttpException } from '../../src/http.exception'

describe('NotImplementedException', () => {
  it('should create an instance with default values', () => {
    const exception = new NotImplementedException(
      'This feature is not implemented'
    )

    expect(exception.status).toBe('501')
    expect(exception.detail).toBe('This feature is not implemented')
    expect(exception.title).toBe('Not Implemented')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '501',
      code: undefined,
      title: 'Not Implemented',
      detail: 'This feature is not implemented',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new NotImplementedException(
      'This feature is not implemented',
      'NOT_IMPLEMENTED_ERROR'
    )

    expect(exception.status).toBe('501')
    expect(exception.detail).toBe('This feature is not implemented')
    expect(exception.code).toBe('NOT_IMPLEMENTED_ERROR')
    expect(exception.title).toBe('Not Implemented')
  })

  it('should include additional options', () => {
    const exception = new NotImplementedException(
      'This feature is not implemented',
      'NOT_IMPLEMENTED_ERROR',
      {
        title: 'Custom Not Implemented Title',
        id: 'not-implemented-123',
        links: { about: 'http://example.com/not-implemented' },
        source: { pointer: '/data/feature' },
        meta: { debug: 'Feature development pending' }
      }
    )

    expect(exception.status).toBe('501')
    expect(exception.detail).toBe('This feature is not implemented')
    expect(exception.code).toBe('NOT_IMPLEMENTED_ERROR')
    expect(exception.title).toBe('Custom Not Implemented Title')
    expect(exception.id).toBe('not-implemented-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/not-implemented'
    })
    expect(exception.source).toEqual({ pointer: '/data/feature' })
    expect(exception.meta).toEqual({ debug: 'Feature development pending' })
    expect(exception.toJSON()).toEqual({
      id: 'not-implemented-123',
      links: { about: 'http://example.com/not-implemented' },
      status: '501',
      code: 'NOT_IMPLEMENTED_ERROR',
      title: 'Custom Not Implemented Title',
      detail: 'This feature is not implemented',
      source: { pointer: '/data/feature' },
      meta: { debug: 'Feature development pending' }
    })
  })

  it('should default to "Not Implemented" for the title if not provided in options', () => {
    const exception = new NotImplementedException(
      'This feature is not implemented',
      undefined,
      {}
    )

    expect(exception.title).toBe('Not Implemented')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new NotImplementedException(
      'This feature is not implemented'
    )

    expect(exception).toBeInstanceOf(NotImplementedException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(NotImplementedException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new NotImplementedException('Stack trace test')

    expect(exception.stack).toContain('NotImplementedException')
  })

  it('should throw and be caught as NotImplementedException', () => {
    try {
      throw new NotImplementedException('This feature is not implemented')
    } catch (error) {
      expect(error).toBeInstanceOf(NotImplementedException)
      expect((error as any).status).toBe('501')
      expect((error as any).message).toBe('This feature is not implemented')
      expect((error as any).title).toBe('Not Implemented')
      expect((error as any).stack).toContain('NotImplementedException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new NotImplementedException('This feature is not implemented')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('501')
      expect((error as any).message).toBe('This feature is not implemented')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new NotImplementedException(
        'This feature is not implemented',
        'NOT_IMPLEMENTED_ERROR',
        {
          meta: { debug: 'Feature development pending' }
        }
      )
    } catch (error) {
      if (error instanceof NotImplementedException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '501',
          code: 'NOT_IMPLEMENTED_ERROR',
          title: 'Not Implemented',
          detail: 'This feature is not implemented',
          source: undefined,
          meta: { debug: 'Feature development pending' }
        })
      } else {
        throw error
      }
    }
  })
})
