import { NotFoundException } from '../../src/4xx/not-found.exception'
import { HttpException } from '../../src/http.exception'

describe('NotFoundException', () => {
  it('should create an instance with default values', () => {
    const exception = new NotFoundException('Resource not found')

    expect(exception.status).toBe('404')
    expect(exception.detail).toBe('Resource not found')
    expect(exception.title).toBe('Not Found')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '404',
      code: undefined,
      title: 'Not Found',
      detail: 'Resource not found',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new NotFoundException(
      'Resource not found',
      'RESOURCE_NOT_FOUND'
    )

    expect(exception.status).toBe('404')
    expect(exception.detail).toBe('Resource not found')
    expect(exception.code).toBe('RESOURCE_NOT_FOUND')
    expect(exception.title).toBe('Not Found')
  })

  it('should include additional options', () => {
    const exception = new NotFoundException(
      'Resource not found',
      'RESOURCE_NOT_FOUND',
      {
        title: 'Custom Not Found Title',
        id: 'resource-123',
        links: { about: 'http://example.com/not-found' },
        source: { pointer: '/data/resource' },
        meta: { debug: 'Resource does not exist' }
      }
    )

    expect(exception.status).toBe('404')
    expect(exception.detail).toBe('Resource not found')
    expect(exception.code).toBe('RESOURCE_NOT_FOUND')
    expect(exception.title).toBe('Custom Not Found Title')
    expect(exception.id).toBe('resource-123')
    expect(exception.links).toEqual({ about: 'http://example.com/not-found' })
    expect(exception.source).toEqual({ pointer: '/data/resource' })
    expect(exception.meta).toEqual({ debug: 'Resource does not exist' })
    expect(exception.toJSON()).toEqual({
      id: 'resource-123',
      links: { about: 'http://example.com/not-found' },
      status: '404',
      code: 'RESOURCE_NOT_FOUND',
      title: 'Custom Not Found Title',
      detail: 'Resource not found',
      source: { pointer: '/data/resource' },
      meta: { debug: 'Resource does not exist' }
    })
  })

  it('should default to "Not Found" for the title if not provided in options', () => {
    const exception = new NotFoundException('Resource not found', undefined, {})

    expect(exception.title).toBe('Not Found')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new NotFoundException('Resource not found')

    expect(exception).toBeInstanceOf(NotFoundException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(NotFoundException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new NotFoundException('Stack trace test')

    expect(exception.stack).toContain('NotFoundException')
  })

  it('should throw and be caught as NotFoundException', () => {
    try {
      throw new NotFoundException('Resource not found')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect((error as any).status).toBe('404')
      expect((error as any).message).toBe('Resource not found')
      expect((error as any).title).toBe('Not Found')
      expect((error as any).stack).toContain('NotFoundException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new NotFoundException('Resource not found')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('404')
      expect((error as any).message).toBe('Resource not found')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new NotFoundException('Resource not found', 'RESOURCE_NOT_FOUND', {
        meta: { debug: 'Resource does not exist' }
      })
    } catch (error) {
      if (error instanceof NotFoundException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '404',
          code: 'RESOURCE_NOT_FOUND',
          title: 'Not Found',
          detail: 'Resource not found',
          source: undefined,
          meta: { debug: 'Resource does not exist' }
        })
      } else {
        throw error
      }
    }
  })
})
