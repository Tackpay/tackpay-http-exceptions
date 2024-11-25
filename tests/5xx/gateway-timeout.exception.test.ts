import { GatewayTimeoutException } from '../../src/5xx/gateway-timeout.exception'
import { HttpException } from '../../src/http.exception'

describe('GatewayTimeoutException', () => {
  it('should create an instance with default values', () => {
    const exception = new GatewayTimeoutException(
      'The server is taking too long to respond'
    )

    expect(exception.status).toBe('504')
    expect(exception.detail).toBe('The server is taking too long to respond')
    expect(exception.title).toBe('Gateway Timeout')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '504',
      code: undefined,
      title: 'Gateway Timeout',
      detail: 'The server is taking too long to respond',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new GatewayTimeoutException(
      'The server is taking too long to respond',
      'GATEWAY_TIMEOUT_ERROR'
    )

    expect(exception.status).toBe('504')
    expect(exception.detail).toBe('The server is taking too long to respond')
    expect(exception.code).toBe('GATEWAY_TIMEOUT_ERROR')
    expect(exception.title).toBe('Gateway Timeout')
  })

  it('should include additional options', () => {
    const exception = new GatewayTimeoutException(
      'The server is taking too long to respond',
      'GATEWAY_TIMEOUT_ERROR',
      {
        title: 'Custom Gateway Timeout Title',
        id: 'gateway-timeout-123',
        links: { about: 'http://example.com/gateway-timeout' },
        source: { pointer: '/data/server' },
        meta: { retryAfter: '60 seconds' }
      }
    )

    expect(exception.status).toBe('504')
    expect(exception.detail).toBe('The server is taking too long to respond')
    expect(exception.code).toBe('GATEWAY_TIMEOUT_ERROR')
    expect(exception.title).toBe('Custom Gateway Timeout Title')
    expect(exception.id).toBe('gateway-timeout-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/gateway-timeout'
    })
    expect(exception.source).toEqual({ pointer: '/data/server' })
    expect(exception.meta).toEqual({ retryAfter: '60 seconds' })
    expect(exception.toJSON()).toEqual({
      id: 'gateway-timeout-123',
      links: { about: 'http://example.com/gateway-timeout' },
      status: '504',
      code: 'GATEWAY_TIMEOUT_ERROR',
      title: 'Custom Gateway Timeout Title',
      detail: 'The server is taking too long to respond',
      source: { pointer: '/data/server' },
      meta: { retryAfter: '60 seconds' }
    })
  })

  it('should default to "Gateway Timeout" for the title if not provided in options', () => {
    const exception = new GatewayTimeoutException(
      'The server is taking too long to respond',
      undefined,
      {}
    )

    expect(exception.title).toBe('Gateway Timeout')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new GatewayTimeoutException(
      'The server is taking too long to respond'
    )

    expect(exception).toBeInstanceOf(GatewayTimeoutException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(GatewayTimeoutException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new GatewayTimeoutException('Stack trace test')

    expect(exception.stack).toContain('GatewayTimeoutException')
  })

  it('should throw and be caught as GatewayTimeoutException', () => {
    try {
      throw new GatewayTimeoutException(
        'The server is taking too long to respond'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(GatewayTimeoutException)
      expect((error as any).status).toBe('504')
      expect((error as any).message).toBe(
        'The server is taking too long to respond'
      )
      expect((error as any).title).toBe('Gateway Timeout')
      expect((error as any).stack).toContain('GatewayTimeoutException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new GatewayTimeoutException(
        'The server is taking too long to respond'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('504')
      expect((error as any).message).toBe(
        'The server is taking too long to respond'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new GatewayTimeoutException(
        'The server is taking too long to respond',
        'GATEWAY_TIMEOUT_ERROR',
        {
          meta: { retryAfter: '60 seconds' }
        }
      )
    } catch (error) {
      if (error instanceof GatewayTimeoutException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '504',
          code: 'GATEWAY_TIMEOUT_ERROR',
          title: 'Gateway Timeout',
          detail: 'The server is taking too long to respond',
          source: undefined,
          meta: { retryAfter: '60 seconds' }
        })
      } else {
        throw error
      }
    }
  })
})
