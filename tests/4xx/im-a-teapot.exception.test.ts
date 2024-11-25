import { ImATeapotException } from '../../src/4xx/im-a-teapot.exception'
import { HttpException } from '../../src/http.exception'

describe('ImATeapotException', () => {
  it('should create an instance with default values', () => {
    const exception = new ImATeapotException('Brewing problem')

    expect(exception.status).toBe('418')
    expect(exception.detail).toBe('Brewing problem')
    expect(exception.title).toBe("I'm a teapot")
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '418',
      code: undefined,
      title: "I'm a teapot",
      detail: 'Brewing problem',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new ImATeapotException('Brewing problem', 'TEAPOT_ERROR')

    expect(exception.status).toBe('418')
    expect(exception.detail).toBe('Brewing problem')
    expect(exception.code).toBe('TEAPOT_ERROR')
    expect(exception.title).toBe("I'm a teapot")
  })

  it('should include additional options', () => {
    const exception = new ImATeapotException(
      'Brewing problem',
      'TEAPOT_ERROR',
      {
        title: 'Custom Teapot Title',
        id: 'teapot-123',
        links: { about: 'http://example.com/teapot' },
        source: { pointer: '/data/brew' },
        meta: { debug: 'Incorrect brewing protocol' }
      }
    )

    expect(exception.status).toBe('418')
    expect(exception.detail).toBe('Brewing problem')
    expect(exception.code).toBe('TEAPOT_ERROR')
    expect(exception.title).toBe('Custom Teapot Title')
    expect(exception.id).toBe('teapot-123')
    expect(exception.links).toEqual({ about: 'http://example.com/teapot' })
    expect(exception.source).toEqual({ pointer: '/data/brew' })
    expect(exception.meta).toEqual({ debug: 'Incorrect brewing protocol' })
    expect(exception.toJSON()).toEqual({
      id: 'teapot-123',
      links: { about: 'http://example.com/teapot' },
      status: '418',
      code: 'TEAPOT_ERROR',
      title: 'Custom Teapot Title',
      detail: 'Brewing problem',
      source: { pointer: '/data/brew' },
      meta: { debug: 'Incorrect brewing protocol' }
    })
  })

  it('should default to "I\'m a teapot" for the title if not provided in options', () => {
    const exception = new ImATeapotException('Brewing problem', undefined, {})

    expect(exception.title).toBe("I'm a teapot")
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new ImATeapotException('Brewing problem')

    expect(exception).toBeInstanceOf(ImATeapotException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(ImATeapotException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new ImATeapotException('Stack trace test')

    expect(exception.stack).toContain('ImATeapotException')
  })

  it('should throw and be caught as ImATeapotException', () => {
    try {
      throw new ImATeapotException('Brewing problem')
    } catch (error) {
      expect(error).toBeInstanceOf(ImATeapotException)
      expect((error as any).status).toBe('418')
      expect((error as any).message).toBe('Brewing problem')
      expect((error as any).title).toBe("I'm a teapot")
      expect((error as any).stack).toContain('ImATeapotException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new ImATeapotException('Brewing problem')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('418')
      expect((error as any).message).toBe('Brewing problem')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new ImATeapotException('Brewing problem', 'TEAPOT_ERROR', {
        meta: { debug: 'Incorrect brewing protocol' }
      })
    } catch (error) {
      if (error instanceof ImATeapotException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '418',
          code: 'TEAPOT_ERROR',
          title: "I'm a teapot",
          detail: 'Brewing problem',
          source: undefined,
          meta: { debug: 'Incorrect brewing protocol' }
        })
      } else {
        throw error
      }
    }
  })
})
