import { InternalServerErrorException } from '../../src/5xx/internal-server-error.exception'
import { HttpException } from '../../src/http.exception'

describe('InternalServerErrorException', () => {
  it('should create an instance with default values', () => {
    const exception = new InternalServerErrorException(
      'An unexpected error occurred on the server'
    )

    expect(exception.status).toBe('500')
    expect(exception.detail).toBe('An unexpected error occurred on the server')
    expect(exception.title).toBe('Internal Server Error')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '500',
      code: undefined,
      title: 'Internal Server Error',
      detail: 'An unexpected error occurred on the server',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new InternalServerErrorException(
      'An unexpected error occurred on the server',
      'INTERNAL_ERROR'
    )

    expect(exception.status).toBe('500')
    expect(exception.detail).toBe('An unexpected error occurred on the server')
    expect(exception.code).toBe('INTERNAL_ERROR')
    expect(exception.title).toBe('Internal Server Error')
  })

  it('should include additional options', () => {
    const exception = new InternalServerErrorException(
      'An unexpected error occurred on the server',
      'INTERNAL_ERROR',
      {
        title: 'Custom Server Error',
        id: 'internal-123',
        links: { about: 'http://example.com/internal-error' },
        source: { pointer: '/data/server' },
        meta: { debug: 'Critical failure in processing' }
      }
    )

    expect(exception.status).toBe('500')
    expect(exception.detail).toBe('An unexpected error occurred on the server')
    expect(exception.code).toBe('INTERNAL_ERROR')
    expect(exception.title).toBe('Custom Server Error')
    expect(exception.id).toBe('internal-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/internal-error'
    })
    expect(exception.source).toEqual({ pointer: '/data/server' })
    expect(exception.meta).toEqual({ debug: 'Critical failure in processing' })
    expect(exception.toJSON()).toEqual({
      id: 'internal-123',
      links: { about: 'http://example.com/internal-error' },
      status: '500',
      code: 'INTERNAL_ERROR',
      title: 'Custom Server Error',
      detail: 'An unexpected error occurred on the server',
      source: { pointer: '/data/server' },
      meta: { debug: 'Critical failure in processing' }
    })
  })

  it('should default to "Internal Server Error" for the title if not provided in options', () => {
    const exception = new InternalServerErrorException(
      'An unexpected error occurred on the server',
      undefined,
      {}
    )

    expect(exception.title).toBe('Internal Server Error')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new InternalServerErrorException(
      'An unexpected error occurred on the server'
    )

    expect(exception).toBeInstanceOf(InternalServerErrorException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(InternalServerErrorException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new InternalServerErrorException('Stack trace test')

    expect(exception.stack).toContain('InternalServerErrorException')
  })

  it('should throw and be caught as InternalServerErrorException', () => {
    try {
      throw new InternalServerErrorException(
        'An unexpected error occurred on the server'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException)
      expect((error as any).status).toBe('500')
      expect((error as any).message).toBe(
        'An unexpected error occurred on the server'
      )
      expect((error as any).title).toBe('Internal Server Error')
      expect((error as any).stack).toContain('InternalServerErrorException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new InternalServerErrorException(
        'An unexpected error occurred on the server'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('500')
      expect((error as any).message).toBe(
        'An unexpected error occurred on the server'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new InternalServerErrorException(
        'An unexpected error occurred on the server',
        'INTERNAL_ERROR',
        {
          meta: { debug: 'Critical failure in processing' }
        }
      )
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '500',
          code: 'INTERNAL_ERROR',
          title: 'Internal Server Error',
          detail: 'An unexpected error occurred on the server',
          source: undefined,
          meta: { debug: 'Critical failure in processing' }
        })
      } else {
        throw error
      }
    }
  })
})
