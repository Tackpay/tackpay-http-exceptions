import { NotAcceptableException } from '../../src/4xx/not-acceptable.exception'
import { HttpException } from '../../src/http.exception'

describe('NotAcceptableException', () => {
  it('should create an instance with default values', () => {
    const exception = new NotAcceptableException(
      'The requested resource is not acceptable'
    )

    expect(exception.status).toBe('406')
    expect(exception.detail).toBe('The requested resource is not acceptable')
    expect(exception.title).toBe('Not Acceptable')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '406',
      code: undefined,
      title: 'Not Acceptable',
      detail: 'The requested resource is not acceptable',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new NotAcceptableException(
      'The requested resource is not acceptable',
      'NOT_ACCEPTABLE_ERROR'
    )

    expect(exception.status).toBe('406')
    expect(exception.detail).toBe('The requested resource is not acceptable')
    expect(exception.code).toBe('NOT_ACCEPTABLE_ERROR')
    expect(exception.title).toBe('Not Acceptable')
  })

  it('should include additional options', () => {
    const exception = new NotAcceptableException(
      'The requested resource is not acceptable',
      'NOT_ACCEPTABLE_ERROR',
      {
        title: 'Custom Not Acceptable Title',
        id: 'not-acceptable-123',
        links: { about: 'http://example.com/not-acceptable' },
        source: { pointer: '/data/attributes' },
        meta: { debug: 'Resource format not acceptable' }
      }
    )

    expect(exception.status).toBe('406')
    expect(exception.detail).toBe('The requested resource is not acceptable')
    expect(exception.code).toBe('NOT_ACCEPTABLE_ERROR')
    expect(exception.title).toBe('Custom Not Acceptable Title')
    expect(exception.id).toBe('not-acceptable-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/not-acceptable'
    })
    expect(exception.source).toEqual({ pointer: '/data/attributes' })
    expect(exception.meta).toEqual({ debug: 'Resource format not acceptable' })
    expect(exception.toJSON()).toEqual({
      id: 'not-acceptable-123',
      links: { about: 'http://example.com/not-acceptable' },
      status: '406',
      code: 'NOT_ACCEPTABLE_ERROR',
      title: 'Custom Not Acceptable Title',
      detail: 'The requested resource is not acceptable',
      source: { pointer: '/data/attributes' },
      meta: { debug: 'Resource format not acceptable' }
    })
  })

  it('should default to "Not Acceptable" for the title if not provided in options', () => {
    const exception = new NotAcceptableException(
      'The requested resource is not acceptable',
      undefined,
      {}
    )

    expect(exception.title).toBe('Not Acceptable')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new NotAcceptableException(
      'The requested resource is not acceptable'
    )

    expect(exception).toBeInstanceOf(NotAcceptableException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(NotAcceptableException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new NotAcceptableException('Stack trace test')

    expect(exception.stack).toContain('NotAcceptableException')
  })

  it('should throw and be caught as NotAcceptableException', () => {
    try {
      throw new NotAcceptableException(
        'The requested resource is not acceptable'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(NotAcceptableException)
      expect((error as any).status).toBe('406')
      expect((error as any).message).toBe(
        'The requested resource is not acceptable'
      )
      expect((error as any).title).toBe('Not Acceptable')
      expect((error as any).stack).toContain('NotAcceptableException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new NotAcceptableException(
        'The requested resource is not acceptable'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('406')
      expect((error as any).message).toBe(
        'The requested resource is not acceptable'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new NotAcceptableException(
        'The requested resource is not acceptable',
        'NOT_ACCEPTABLE_ERROR',
        {
          meta: { debug: 'Resource format not acceptable' }
        }
      )
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '406',
          code: 'NOT_ACCEPTABLE_ERROR',
          title: 'Not Acceptable',
          detail: 'The requested resource is not acceptable',
          source: undefined,
          meta: { debug: 'Resource format not acceptable' }
        })
      } else {
        throw error
      }
    }
  })
})
