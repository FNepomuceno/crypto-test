// Opens a database
async function openDB(name) {
  const version = 1

  return new Promise((resolve, reject) => {
    let request = window.indexedDB.open(name, version)
    request.onerror = function (event) {
      reject(event.target.error)
    }
    request.onsuccess = function (event) {
      resolve(event.target.result)
    }
    request.onupgradeneeded = function (event) {
      let db = event.target.result
      let keyStore = db.createObjectStore('cryptoKeys', { keyPath: 'type' })
    }
  })
}

// Deletes database (for testing)
async function removeDB(name) {
  return new Promise((resolve, reject) => {
    let request = window.indexedDB.deleteDatabase(name)
    request.onerror = function (event) {
      reject("Couldn't delete database")
    }
    request.onsuccess = function (event) {
      resolve("Successfully deleted database")
    }
  })
}

async function keyTransaction(callback, transactionType) {
  let db = await openDB('TestDB')
  let transaction = db.transaction(['cryptoKeys'], transactionType)
  let objectStore = transaction.objectStore('cryptoKeys')

  let result = new Promise((resolve, reject) => {
    transaction.onerror = function (event) {
      reject(event.target.error)
    }
    transaction.oncomplete = function (event) {
      db.close()
    }

    resolve(callback(objectStore))
  })

  return result
}

// Loads key from IndexedDB
async function loadKey(type) {
  return keyTransaction((objectStore) => {
    return new Promise((resolve, reject) => {
      let request = objectStore.get(type)
      request.onsuccess = function (event) {
        resolve(event.target.result.key)
      }
    })
  }, 'readonly')
}

// Stores key to IndexedDB
async function storeKey(key) {
  return keyTransaction((objectStore) => {
    return new Promise((resolve, reject) => {
      let obj = { key: key, type: key.type }

      let request = objectStore.put(obj)
      request.onsuccess = function (event) {
        resolve(key)
      }
    })
  }, 'readwrite')
}
