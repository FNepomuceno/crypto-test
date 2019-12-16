// Generates an ECDSA public/private key pair for signing
export function generateEcdsaKeypair() {
  let keypair = window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  )

  return keypair
}

// Generates a signature of the data given
export function signEcdsa(privateKey, data) {
  let signature = window.crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-384' },
    },
    privateKey,
    data
  )

  return signature
}

// Verifies the signature
export function verifyEcdsa(publicKey, data, signature) {
  let result = window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-384' },
    },
    publicKey,
    signature,
    data
  )

  return result
}

// Generates an HMAC key for signing
export function generateHmacKey() {
  let key = window.crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: 'SHA-512' }
    },
    true,
    ['sign', 'verify']
  )

  return key
}

// Generates a signature of the data given
export function signHmac(key, data) {
  let signature = window.crypto.subtle.sign(
    'HMAC',
    key,
    data
  )

  return signature
}

// Verifies the signature
export function verifyHmac(key, data, signature) {
  let result = window.crypto.subtle.verify(
    'HMAC',
    key,
    signature,
    data
  )

  return result
}

