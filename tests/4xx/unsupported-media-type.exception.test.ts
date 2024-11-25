import { UnsupportedMediaTypeException } from '../../src/4xx/unsupported-media-type.exception'
import { HttpException } from '../../src/http.exception'

describe('UnsupportedMediaTypeException', () => {
  it('should create an instance with default values', () => {
    const exception = new UnsupportedMediaTypeException(
      'The media type of the requested resource is unsupported'
    )

    expect(exception.status).toBe('415')
    expect(exception.detail).toBe(
      'The media type of the requested resource is unsupported'
    )
    expect(exception.title).toBe('Unsupported Media Type')
    expect(exception.code).toBeUndefined()
    expect(exception.toJSON()).toEqual({
      id: undefined,
      links: undefined,
      status: '415',
      code: undefined,
      title: 'Unsupported Media Type',
      detail: 'The media type of the requested resource is unsupported',
      source: undefined,
      meta: undefined
    })
  })

  it('should include the provided code', () => {
    const exception = new UnsupportedMediaTypeException(
      'The media type of the requested resource is unsupported',
      'UNSUPPORTED_MEDIA_TYPE'
    )

    expect(exception.status).toBe('415')
    expect(exception.detail).toBe(
      'The media type of the requested resource is unsupported'
    )
    expect(exception.code).toBe('UNSUPPORTED_MEDIA_TYPE')
    expect(exception.title).toBe('Unsupported Media Type')
  })

  it('should include additional options', () => {
    const exception = new UnsupportedMediaTypeException(
      'The media type of the requested resource is unsupported',
      'UNSUPPORTED_MEDIA_TYPE',
      {
        title: 'Custom Media Type Title',
        id: 'media-type-123',
        links: { about: 'http://example.com/unsupported-media-type' },
        source: { pointer: '/data/media-type' },
        meta: { debug: 'Unsupported media format' }
      }
    )

    expect(exception.status).toBe('415')
    expect(exception.detail).toBe(
      'The media type of the requested resource is unsupported'
    )
    expect(exception.code).toBe('UNSUPPORTED_MEDIA_TYPE')
    expect(exception.title).toBe('Custom Media Type Title')
    expect(exception.id).toBe('media-type-123')
    expect(exception.links).toEqual({
      about: 'http://example.com/unsupported-media-type'
    })
    expect(exception.source).toEqual({ pointer: '/data/media-type' })
    expect(exception.meta).toEqual({ debug: 'Unsupported media format' })
    expect(exception.toJSON()).toEqual({
      id: 'media-type-123',
      links: { about: 'http://example.com/unsupported-media-type' },
      status: '415',
      code: 'UNSUPPORTED_MEDIA_TYPE',
      title: 'Custom Media Type Title',
      detail: 'The media type of the requested resource is unsupported',
      source: { pointer: '/data/media-type' },
      meta: { debug: 'Unsupported media format' }
    })
  })

  it('should default to "Unsupported Media Type" for the title if not provided in options', () => {
    const exception = new UnsupportedMediaTypeException(
      'The media type of the requested resource is unsupported',
      undefined,
      {}
    )

    expect(exception.title).toBe('Unsupported Media Type')
  })

  it('should correctly inherit from HttpException', () => {
    const exception = new UnsupportedMediaTypeException(
      'The media type of the requested resource is unsupported'
    )

    expect(exception).toBeInstanceOf(UnsupportedMediaTypeException)
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.status).toBe(UnsupportedMediaTypeException.STATUS)
  })

  it('should capture the stack trace correctly', () => {
    const exception = new UnsupportedMediaTypeException('Stack trace test')

    expect(exception.stack).toContain('UnsupportedMediaTypeException')
  })

  it('should throw and be caught as UnsupportedMediaTypeException', () => {
    try {
      throw new UnsupportedMediaTypeException(
        'The media type of the requested resource is unsupported'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(UnsupportedMediaTypeException)
      expect((error as any).status).toBe('415')
      expect((error as any).message).toBe(
        'The media type of the requested resource is unsupported'
      )
      expect((error as any).title).toBe('Unsupported Media Type')
      expect((error as any).stack).toContain('UnsupportedMediaTypeException')
    }
  })

  it('should throw and be caught as HttpException', () => {
    try {
      throw new UnsupportedMediaTypeException(
        'The media type of the requested resource is unsupported'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect((error as any).status).toBe('415')
      expect((error as any).message).toBe(
        'The media type of the requested resource is unsupported'
      )
    }
  })

  it('should throw and serialize correctly after being caught', () => {
    try {
      throw new UnsupportedMediaTypeException(
        'The media type of the requested resource is unsupported',
        'UNSUPPORTED_MEDIA_TYPE',
        {
          meta: { debug: 'Unsupported media format' }
        }
      )
    } catch (error) {
      if (error instanceof UnsupportedMediaTypeException) {
        const serialized = error.toJSON()
        expect(serialized).toEqual({
          id: undefined,
          links: undefined,
          status: '415',
          code: 'UNSUPPORTED_MEDIA_TYPE',
          title: 'Unsupported Media Type',
          detail: 'The media type of the requested resource is unsupported',
          source: undefined,
          meta: { debug: 'Unsupported media format' }
        })
      } else {
        throw error
      }
    }
  })
})
