import { ServiceUnavailableException } from '../../src/5xx/service-unavailable.exception'
import { HttpException } from '../../src/http.exception'

describe('ServiceUnavailableException', () => {
  it('should create an instance with default values', () => {
    const exception = new ServiceUnavailableException(
      'The service is unavailable'
    )

    expect(exception.status).toBe('503')
    expect(exception.detail).toBe('The service is unavailable')
    expect(exception.title).toBe('Service Unavailable')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '503',
      code: undefined,
      title: 'Service Unavailable',
      detail: 'The service is unavailable',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new ServiceUnavailableException(
      'The service is unavailable',
      'SERVICE_UNAVAILABLE'
    )

    expect(exception.status).toBe('503')
    expect(exception.detail).toBe('The service is unavailable')
    expect(exception.code).toBe('SERVICE_UNAVAILABLE')
    expect(exception.title).toBe('Service Unavailable')
  })

  it('should include additional options', () => {
    const exception = new ServiceUnavailableException(
      'The service is unavailable',
      'SERVICE_UNAVAILABLE',
      {
        title: 'Custom Service Unavailable Title',
        id: 'service-unavailable-123',
        links: { about: 'http://example.com/service-unavailable' },
        source: { pointer: '/data/service' },
        meta: { retryAfter: '120 seconds' }
      }
    )

    expect(exception.status).toBe('503')
    expect(exception.detail).toBe('The service is unavailable')
    expect(exception.code).toBe('SERVICE_UNAVAILABLE')
    expect(exception.title).toBe('Custom Service Unavailable Title')
    expect(exception.id).toBe('service-unavailable-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/service-unavailable'
    })
    expect(exception.source).toEqual({ pointer: '/data/service' })
    expect(exception.meta).toEqual({ retryAfter: '120 seconds' })
    expect(exception.toJSON()).toEqual({
      id: 'service-unavailable-123',
      links: { about: 'http://example.com/service-unavailable' },
      status: '503',
      code: 'SERVICE_UNAVAILABLE',
      title: 'Custom Service Unavailable Title',
      detail: 'The service is unavailable',
      source: { pointer: '/data/service' },
      meta: { retryAfter: '120 seconds' }
    })
  })

  it('should default to "Service Unavailable" for the title if not provided in options', () => {
    const exception = new ServiceUnavailableException(
      'The service is unavailable',
      undefined,
      {}
    )

    expect(exception.title).toBe('Service Unavailable')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new ServiceUnavailableException(
      'The service is unavailable'
    )

    expect(exception).toBeInstanceOf(ServiceUnavailableException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(ServiceUnavailableException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new ServiceUnavailableException('Stack trace test')

    expect(exception.stack).toContain('ServiceUnavailableException')
  })

  it('should throw and be caught as ServiceUnavailableException', () => {
    try {
      throw new ServiceUnavailableException('The service is unavailable')
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceUnavailableException)
      expect((error as any).status).toBe('503')
      expect((error as any).message).toBe('The service is unavailable')
      expect((error as any).title).toBe('Service Unavailable')
      expect((error as any).stack).toContain('ServiceUnavailableException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new ServiceUnavailableException('The service is unavailable')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('503')
      expect((error as any).message).toBe('The service is unavailable')
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new ServiceUnavailableException(
        'The service is unavailable',
        'SERVICE_UNAVAILABLE',
        {
          meta: { retryAfter: '120 seconds' }
        }
      )
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '503',
          code: 'SERVICE_UNAVAILABLE',
          title: 'Service Unavailable',
          detail: 'The service is unavailable',
          source: undefined,
          meta: { retryAfter: '120 seconds' }
        })
      } else {
        throw error
      }
    }
  })
})
