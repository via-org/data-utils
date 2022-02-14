const lookup =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/**
 *
 * @param {string} b64Url
 * @returns {Uint8Array}
 */
export function parse(b64Url) {
  const codes = Object.fromEntries(lookup.split('').map((c, i) => [c, i]))

  const end = b64Url.length
  const out = new Uint8Array(((end * 6) / 8) | 0)

  let bits = 0
  let buffer = 0
  let written = 0
  for (let i = 0; i < end; ++i) {
    const value = codes[b64Url[i]]
    buffer = (buffer << 6) | value
    bits += 6
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }
  return out
}

/**
 * @param {Uint8Array} uint8Array
 * @returns {string}
 */
export function stringify(uint8Array) {
  const mask = (1 << 6) - 1

  let out = ''

  let bits = 0
  let buffer = 0

  for (let i = 0; i < uint8Array.length; ++i) {
    buffer = (buffer << 8) | (0xff & uint8Array[i])
    bits += 8

    while (bits > 6) {
      bits -= 6
      out += lookup[mask & (buffer >> bits)]
    }
  }

  if (bits) {
    out += lookup[mask & (buffer << (6 - bits))]
  }

  return out
}

export const base64url = {
  /**
   * @param {string} b64Url
   * @returns {Uint8Array}
   */
  parse(b64Url) {
    return parse(b64Url)
  },

  /**
   * @param {Uint8Array} uint8Array
   * @returns {string}
   */
  stringify(uint8Array) {
    return stringify(uint8Array)
  },
}
