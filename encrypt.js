// Generates random data
function makeData(numBytes=16) {
  return window.crypto.getRandomValues(new Uint8Array(numBytes))
}

// Encrypts data with a given AES-GCM key
async function encryptAesGcm(key, data) {
  let iv = makeData(12)
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
async function decryptAesGcm(key, data, iv) {
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
