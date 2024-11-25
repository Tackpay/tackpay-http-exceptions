export type Meta = Record<string, unknown>
/**
 * The links object of the error
 * @see https://jsonapi.org/format/#errors
 */
export interface Links {
  about?: string
  type?: string
}

export interface Source {
  /**
   * A JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
   * @see https://jsonapi.org/format/#document-structure-resource-objects
   */
  pointer?: string
  /**
   * A string indicating which URI query parameter caused the error.
   * @see https://jsonapi.org/format/#document-structure-resource-objects
   * @example "page[number]"
   */
  parameter?: string
  /**
   * A string indicating which query parameter caused the error.
   * @see https://jsonapi.org/format/#document-structure-resource-objects
   * @example "filter[posts]"
   */
  header?: string
}

/**
 * The JSON API error object
 * @see https://jsonapi.org/format/#errors
 */
export interface IHttpException {
  id?: string
  status: string
  code?: string
  title?: string
  detail?: string
  links?: Links
  source?: Source
  meta?: Meta
}

export type HttpOptions = Omit<IHttpException, 'status' | 'detail' | 'code'>
