export const RequestMethodEnum = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
} as const
export type RequestMethodType = (typeof RequestMethodEnum)[keyof typeof RequestMethodEnum]

export const RequestHeaderEnum = {
  CONTENT_TYPE: 'Content-Type',
  CONTENT_DISPOSITION: 'Content-Disposition',
  ACCEPT_PASS: 'Accept-Pass',
  TOKEN: 'token',
  UNI_PLATFORM: 'uniPlatform',
} as const

export const RequestContentTypeEnum = {
  JSON: 'application/json;charset=UTF-8',
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA: 'multipart/form-data;charset=UTF-8',
  OCTET_STREAM: 'application/octet-stream',
} as const
