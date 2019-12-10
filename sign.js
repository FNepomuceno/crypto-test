// Generates a signature of the data given
function signEcdsa(privateKey, data) {
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
function verifyEcdsa(publicKey, data, signature) {
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

