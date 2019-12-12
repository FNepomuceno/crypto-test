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

