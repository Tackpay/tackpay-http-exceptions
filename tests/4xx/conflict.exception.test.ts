import { ConflictException } from '../../src/4xx/conflict.exception'
import { HttpException } from '../../src/http.exception'

describe('ConflictException', () => {
  it('should create an instance with default values', () => {
    const exception = new ConflictException('Resource conflict')

    expect(exception.status).toBe('409')
    expect(exception.detail).toBe('Resource conflict')
    expect(exception.title).toBe('Conflict')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '409',
      code: undefined,
      title: 'Conflict',
      detail: 'Resource conflict',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new ConflictException(
      'Resource conflict',
      'CONFLICT_ERROR'
    )

    expect(exception.status).toBe('409')
    expect(exception.detail).toBe('Resource conflict')
    expect(exception.code).toBe('CONFLICT_ERROR')
    expect(exception.title).toBe('Conflict')
  })

  it('should include additional options', () => {
    const exception = new ConflictException(
      'Resource conflict',
      'CONFLICT_ERROR',
      {
        title: 'Custom Conflict Title',
        id: '456',
        links: { about: 'http://example.com/conflict' },
        source: { pointer: '/data/id' },
        meta: { debug: 'Resource already exists' }
      }
    )

    expect(exception.status).toBe('409')
    expect(exception.detail).toBe('Resource conflict')
    expect(exception.code).toBe('CONFLICT_ERROR')
    expect(exception.title).toBe('Custom Conflict Title')
    expect(exception.id).toBe('456')
    expect(exception.links).toEqual({ about: 'http://example.com/conflict' })
    expect(exception.source).toEqual({ pointer: '/data/id' })
    expect(exception.meta).toEqual({ debug: 'Resource already exists' })
    expect(exception.toJSON()).toEqual({
      id: '456',
      links: { about: 'http://example.com/conflict' },
      status: '409',
      code: 'CONFLICT_ERROR',
      title: 'Custom Conflict Title',
      detail: 'Resource conflict',
      source: { pointer: '/data/id' },
      meta: { debug: 'Resource already exists' }
    })
  })

  it('should default to "Conflict" for the title if not provided in options', () => {
    const exception = new ConflictException('Resource conflict', undefined, {})

    expect(exception.title).toBe('Conflict')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new ConflictException('Resource conflict')

    expect(exception).toBeInstanceOf(ConflictException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(ConflictException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new ConflictException('Stack trace test')

    expect(exception.stack).toContain('ConflictException')
  })

  it('should throw and be caught as ConflictException', () => {
    try {
      throw new ConflictException('Resource conflict')
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException)
      expect((error as any)?.status).toBe('409')
      expect((error as any)?.message).toBe('Resource conflict')
      expect((error as any)?.title).toBe('Conflict')
      expect((error as any)?.stack).toContain('ConflictException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new ConflictException('Resource conflict')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any)?.status).toBe('409')
      expect((error as any)?.message).toBe('Resource conflict')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new ConflictException('Resource conflict', 'CONFLICT_ERROR', {
        meta: { debug: 'Conflict detected' }
      })
    } catch (error) {
      if (error instanceof ConflictException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '409',
          code: 'CONFLICT_ERROR',
          title: 'Conflict',
          detail: 'Resource conflict',
          source: undefined,
          meta: { debug: 'Conflict detected' }
        })
      } else {
        throw error
      }
    }
  })
})
