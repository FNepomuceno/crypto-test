// Generates a public/private key pair
async function generateEcKeypair() {
  let keypair = window.crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-384'
    },
    true,
    ['deriveKey']
  )

  return keypair
}

// Generates a symmetric key from a given password
async function generateKeyFromPassword(password) {
  let enc = new TextEncoder()
  let keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )
  let salt = window.crypto.getRandomValues(new Uint8Array(16))
  let key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 700000,
      hash: 'SHA-256'
    },
    keyMaterial,
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  )
  return key
}

async function deriveSecretKey(privateKey, publicKey) {
  let result = await window.crypto.subtle.deriveKey(
    {
      name: 'ECDH',
      public: publicKey
    },
    privateKey,
    {
      name: 'AES-GCM',
      length: 256
    },
    // false, // communicate with other party using symmetric key only
    true, // allow exporting symmetric keys for testing purposes only
    ['encrypt', 'decrypt']
  )
  return result
}
