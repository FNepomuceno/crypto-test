class User {
  constructor() {
    // set relevant user properties here
  }

  setPasswordInfo(passwordHash, salt) {
    this.passwordHash = passwordHash
    this.salt = salt
  }
}

export async function createUser(password) {
  let user = new User()
  let salt = generateSalt()
  let hash = await generatePasswordHash(password, salt)

  user.setPasswordInfo(hash, salt)
  return user
}

export async function verifyPassword(user, password) {
  let salt = user.salt
  let hash = await generatePasswordHash(password, salt)

  return hash === user.passwordHash
}

export async function resetPassword(user, password) {
  let salt = generateSalt()
  let hash = await generatePasswordHash(password, salt)

  user.setPasswordInfo(hash, salt)
  return user
}

// Generate a new salt when creating a new user
// and when resetting the password
function generateSalt(numBytes=16) {
  return window.crypto.getRandomValues(new Uint8Array(numBytes))
}

// Generates a hash from a given password and salt
async function generatePasswordHash(password, salt) {
  let enc = new TextEncoder()
  let keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )
  let hashBuffer = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 700000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  )
  let hash = bufferToHex(hashBuffer)

  function bufferToHex(buffer) {
    let data = Array.from(new Uint8Array(buffer))
    return data.map(x => x.toString(16).padStart(2, '0')).join('')
  }

  return hash
}

