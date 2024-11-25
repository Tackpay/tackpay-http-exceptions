import { UnprocessableEntityException } from '../../src/4xx/unprocessable-entity.exception'
import { HttpException } from '../../src/http.exception'

describe('UnprocessableEntityException', () => {
  it('should create an instance with default values', () => {
    const exception = new UnprocessableEntityException(
      'The request cannot be processed due to semantic errors'
    )

    expect(exception.status).toBe('422')
    expect(exception.detail).toBe(
      'The request cannot be processed due to semantic errors'
    )
    expect(exception.title).toBe('Unprocessable Entity')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '422',
      code: undefined,
      title: 'Unprocessable Entity',
      detail: 'The request cannot be processed due to semantic errors',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new UnprocessableEntityException(
      'The request cannot be processed due to semantic errors',
      'UNPROCESSABLE_ENTITY'
    )

    expect(exception.status).toBe('422')
    expect(exception.detail).toBe(
      'The request cannot be processed due to semantic errors'
    )
    expect(exception.code).toBe('UNPROCESSABLE_ENTITY')
    expect(exception.title).toBe('Unprocessable Entity')
  })

  it('should include additional options', () => {
    const exception = new UnprocessableEntityException(
      'The request cannot be processed due to semantic errors',
      'UNPROCESSABLE_ENTITY',
      {
        title: 'Custom Unprocessable Title',
        id: 'unprocessable-123',
        links: { about: 'http://example.com/unprocessable-entity' },
        source: { pointer: '/data/attributes/name' },
        meta: { debug: 'Invalid name format' }
      }
    )

    expect(exception.status).toBe('422')
    expect(exception.detail).toBe(
      'The request cannot be processed due to semantic errors'
    )
    expect(exception.code).toBe('UNPROCESSABLE_ENTITY')
    expect(exception.title).toBe('Custom Unprocessable Title')
    expect(exception.id).toBe('unprocessable-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/unprocessable-entity'
    })
    expect(exception.source).toEqual({ pointer: '/data/attributes/name' })
    expect(exception.meta).toEqual({ debug: 'Invalid name format' })
    expect(exception.toJSON()).toEqual({
      id: 'unprocessable-123',
      links: { about: 'http://example.com/unprocessable-entity' },
      status: '422',
      code: 'UNPROCESSABLE_ENTITY',
      title: 'Custom Unprocessable Title',
      detail: 'The request cannot be processed due to semantic errors',
      source: { pointer: '/data/attributes/name' },
      meta: { debug: 'Invalid name format' }
    })
  })

  it('should default to "Unprocessable Entity" for the title if not provided in options', () => {
    const exception = new UnprocessableEntityException(
      'The request cannot be processed due to semantic errors',
      undefined,
      {}
    )

    expect(exception.title).toBe('Unprocessable Entity')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new UnprocessableEntityException(
      'The request cannot be processed due to semantic errors'
    )

    expect(exception).toBeInstanceOf(UnprocessableEntityException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(UnprocessableEntityException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new UnprocessableEntityException('Stack trace test')

    expect(exception.stack).toContain('UnprocessableEntityException')
  })

  it('should throw and be caught as UnprocessableEntityException', () => {
    try {
      throw new UnprocessableEntityException(
        'The request cannot be processed due to semantic errors'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException)
      expect((error as any).status).toBe('422')
      expect((error as any).message).toBe(
        'The request cannot be processed due to semantic errors'
      )
      expect((error as any).title).toBe('Unprocessable Entity')
      expect((error as any).stack).toContain('UnprocessableEntityException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new UnprocessableEntityException(
        'The request cannot be processed due to semantic errors'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('422')
      expect((error as any).message).toBe(
        'The request cannot be processed due to semantic errors'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new UnprocessableEntityException(
        'The request cannot be processed due to semantic errors',
        'UNPROCESSABLE_ENTITY',
        {
          meta: { debug: 'Invalid name format' }
        }
      )
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '422',
          code: 'UNPROCESSABLE_ENTITY',
          title: 'Unprocessable Entity',
          detail: 'The request cannot be processed due to semantic errors',
          source: undefined,
          meta: { debug: 'Invalid name format' }
        })
      } else {
        throw error
      }
    }
  })
})
