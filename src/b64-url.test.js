import test from 'ava'

import sampleUint8Array from '../test/sample-uint8array.js'
import sampleB64Url from '../test/sample-b64url.js'

import { base64url } from './b64-url.js'

test('Should correctly stringify a Uint8Array-encoded value', t => {
  const input = sampleUint8Array

  const actual = base64url.stringify(input)
  const expected = sampleB64Url

  t.is(actual, expected)
})

test('Should correctly parse a Base64URL-encoded value', t => {
  const input = sampleB64Url

  const actual = base64url.parse(input)
  const expected = sampleUint8Array

  t.deepEqual(actual, expected)
})
