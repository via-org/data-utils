import test from 'ava'

import { base64url } from './b64-url.js'

test('Should correctly stringify a Uint8Array-encoded value', t => {
  const input = new Uint8Array([
    84, 67, 51, 112, 211, 102, 37, 231, 177, 226, 71, 31, 111, 56, 106, 166, 55,
    121, 206, 235, 57, 218, 173, 7, 178, 203, 82, 227, 38, 226, 101, 21,
  ])

  const expected = 'VEMzcNNmJeex4kcfbzhqpjd5zus52q0HsstS4ybiZRU'
  const actual = base64url.stringify(input)

  t.is(actual, expected)
})

test('Should correctly parse a Base64URL-encoded value', t => {
  const input = 'VEMzcNNmJeex4kcfbzhqpjd5zus52q0HsstS4ybiZRU'

  const expected = new Uint8Array([
    84, 67, 51, 112, 211, 102, 37, 231, 177, 226, 71, 31, 111, 56, 106, 166, 55,
    121, 206, 235, 57, 218, 173, 7, 178, 203, 82, 227, 38, 226, 101, 21,
  ])

  const actual = base64url.parse(input)

  t.deepEqual(actual, expected)
})
