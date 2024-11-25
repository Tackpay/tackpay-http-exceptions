import { HttpException } from '../../src'
import { BadRequestException } from '../../src/4xx/bad-request.exception'

describe('BadRequestException', () => {
  it('should create an instance with default values', () => {
    const exception = new BadRequestException('Invalid input')

    expect(exception.status).toBe('400')
    expect(exception.detail).toBe('Invalid input')
    expect(exception.title).toBe('Bad Request')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '400',
      code: undefined,
      title: 'Bad Request',
      detail: 'Invalid input',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new BadRequestException('Invalid input', 'INVALID_INPUT')

    expect(exception.status).toBe('400')
    expect(exception.detail).toBe('Invalid input')
    expect(exception.code).toBe('INVALID_INPUT')
    expect(exception.title).toBe('Bad Request')
  })

  it('should include additional options', () => {
    const exception = new BadRequestException(
      'Invalid input',
      'INVALID_INPUT',
      {
        title: 'Custom Title',
        id: '123',
        links: { about: 'http://example.com/error' },
        source: { parameter: 'name' },
        meta: { debug: 'Missing name field' }
      }
    )

    expect(exception.status).toBe('400')
    expect(exception.detail).toBe('Invalid input')
    expect(exception.code).toBe('INVALID_INPUT')
    expect(exception.title).toBe('Custom Title')
    expect(exception.id).toBe('123')
    expect(exception.links).toEqual({ about: 'http://example.com/error' })
    expect(exception.source).toEqual({ parameter: 'name' })
    expect(exception.meta).toEqual({ debug: 'Missing name field' })
    expect(exception.toJSON()).toEqual({
      id: '123',
      links: { about: 'http://example.com/error' },
      status: '400',
      code: 'INVALID_INPUT',
      title: 'Custom Title',
      detail: 'Invalid input',
      source: { parameter: 'name' },
      meta: { debug: 'Missing name field' }
    })
  })

  it('should default to "Bad Request" for the title if not provided in options', () => {
    const exception = new BadRequestException('Invalid input', undefined, {})

    expect(exception.title).toBe('Bad Request')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new BadRequestException('Invalid input')

    expect(exception).toBeInstanceOf(BadRequestException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(BadRequestException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new BadRequestException('Stack trace test')

    expect(exception.stack).toContain('BadRequestException')
  })

  it('should throw and be caught as BadRequestException', () => {
    try {
      throw new BadRequestException('Invalid input')
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect((error as any).status).toBe('400')
      expect((error as any).message).toBe('Invalid input')
      expect((error as any).title).toBe('Bad Request')
      expect((error as any).stack).toContain('BadRequestException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new BadRequestException('Invalid input')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('400')
      expect((error as any).message).toBe('Invalid input')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new BadRequestException('Invalid input', 'INVALID_INPUT', {
        meta: { debug: 'Invalid input data' }
      })
    } catch (error) {
      if (error instanceof BadRequestException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '400',
          code: 'INVALID_INPUT',
          title: 'Bad Request',
          detail: 'Invalid input',
          source: undefined,
          meta: { debug: 'Invalid input data' }
        })
      } else {
        throw error
      }
    }
  })
})
