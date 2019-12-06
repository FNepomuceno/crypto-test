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
