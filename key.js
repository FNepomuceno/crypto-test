// Generates an ECDSA public/private key pair for signing
function generateEcdsaKeypair() {
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

// Generates an RSA-OAEP public/private key pair
function generateRsaKeypair() {
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

// Generates an ECDH public/private key pair
async function generateEcKeypair() {
  let keypair = window.crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-384'
    },
    false,
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
  let key = window.crypto.subtle.deriveKey(
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

function deriveSecretKey(privateKey, publicKey) {
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
    false,
    ['encrypt', 'decrypt']
  )
  return result
};
