import { pipe } from '@hbauer/convenience-functions'

import { base64url } from './b64-url.js'

/**
 * @param {string} string
 * @returns {string}
 */
export const stringToB64Url = string =>
  pipe(string, stringToUint8Array, uint8ArrayToB64Url)

/**
 * @param {Uint8Array} uint8Array
 * @returns {string}
 */
export const uint8ArrayToB64Url = uint8Array => base64url.stringify(uint8Array)

/**
 * @param {string} b64Url
 * @returns {Uint8Array}
 */
export const b64UrlToUint8Array = b64Url => base64url.parse(b64Url)

/**
 * @param {string} string
 * @returns {Uint8Array}
 */
export const stringToUint8Array = string => new TextEncoder().encode(string)

/**
 * @param {number} integer
 * @returns {Uint8Array}
 */
export const integerToUInt8Array = integer => {
  const buffer = new Uint8Array(32)

  for (let i = buffer.length - 1; i >= 0; i--) {
    const byte = integer % 256
    buffer[i] = byte
    integer = (integer - byte) / 256
  }

  return buffer
}

/**
 * @param {Uint8Array[]} uint8Arrays
 * @returns {Uint8Array}
 */
export const concatUint8Arrays = uint8Arrays =>
  uint8Arrays.reduce(
    (acc, u8, i, ref) => (acc.set(u8, getCombinedLength(ref.slice(0, i))), acc),
    new Uint8Array(getCombinedLength(uint8Arrays))
  )

/**
 * @param {Uint8Array[]} uint8Arrays
 * @returns {number}
 */
export const getCombinedLength = uint8Arrays =>
  uint8Arrays.reduce((acc, { byteLength }) => acc + byteLength, 0)
