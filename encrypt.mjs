// ECDH

// Allow exporting keys when debugging
const DEBUG = true

// Generates an ECDH public/private key pair
export async function generateEcdhKeypair() {
  let keypair = window.crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-384'
    },
    DEBUG,
    ['deriveKey', 'deriveBits']
  )

  return keypair
}

// Derives an AES-GCM secret key between two ECDH key pairs
export async function deriveSecretBits(privateKey, publicKey, numBytes=12) {
  let buffer = await window.crypto.subtle.deriveBits(
    {
      name: 'ECDH',
      namedCurve: 'P-384',
      public: publicKey
    },
    privateKey,
    128
  )
  let result = new Uint8Array(buffer, 0, numBytes)

  return result
}

// AES-GCM secret key
// ECDH keys can also derive HMAC keys for signing

// Derives an AES-GCM secret key between two ECDH key pairs
export function deriveSecretKey(privateKey, publicKey) {
  let result = window.crypto.subtle.deriveKey(
    {
      name: 'ECDH',
      public: publicKey
    },
    privateKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    DEBUG,
    ['encrypt', 'decrypt']
  )
  return result
}

// Encrypts data with a given AES-GCM key
export async function encryptAesGcm(key, data) {
  let iv = window.crypto.getRandomValues(new Uint8Array(12))
  let encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    data
  )
  return {
    iv, encryptedData
  }
}

// Decrypts data with a given AES-GCM key
export async function decryptAesGcm(key, data, iv) {
  let decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    data
  )
  return decryptedData
}

// RSA-OAEP

// Generates an RSA-OAEP public/private key pair
export function generateRsaKeypair() {
  let keypair = window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    false,
    ['encrypt', 'decrypt']
  )

  return keypair
}

// Encrypts data with a public RSA-OAEP key
export function encryptRsa(publicKey, data) {
  let encryptedData = window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    data
  )
  return encryptedData
}

// Decrypts data with a private RSA-OAEP key
export async function decryptRsa(privateKey, data) {
  let decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    data
  )
  return decryptedData
}

