const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newColl = (collection instanceof Array) ? collection.slice() : Object.values(collection)

        for (let id = 0; id < newColl.length; id++)
        callback(newColl[id])

        return collection
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      const newArr = []

      for (let id = 0; id < collection.length; id++)
        newArr.push(callback(collection[id]))

      return newArr
    },

    reduce: function(c = [], callback = () => {}, acc) {
      let collection = c.slice(0)

      if (!acc) {
        acc = collection[0]
        collection = collection.slice(1)
      }
      let le = collection.length

      for (let i = 0; i < le; i++) {
        acc = callback(acc, collection[i], collection)
      }
      return acc;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

        for (let id = 0; id < collection.length; id++)
          if(predicate(collection[id])) return collection[id]

          return undefined

    },

    filter: function(collection, predicate) {
      if(!(collection instanceof Array))
      collection = Object.values(collection)

      const newArr = []

      for (let id = 0; id <collection.length; id++)
        if (predicate(collection[id])) newArr.push(collection[id])

        return newArr

    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(collection, n ) {
      return (n) ? collection.slice(0, [n]) : collection[0]
    },

    last: function(collection, n) {
      return (n) ? collection.slice(collection.length-n, collection.length) : collection[collection.length-1]

    },

    compact: function(collection) {
      const noFalse = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(el => !noFalse.has(el))
    },


    sortBy: function(array, callback) {
      const newArr = [...array]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },


    uniq: function(collection, sort, iteratee) {
      if (sort) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modVal = new Set()
        const uniqVal = new Set()
        for (let val of collection) {
          const moddVals = iteratee(val)
          if (!modVal.has(moddVals)) {
            modVal.add(moddVals)
            uniqVal.add(val)
          }
        }
        return Array.from(uniqVal)
      }
    },

    keys: function(object) {
      const keys = []
      for (let key in object){
        keys.push(key)
      }
      return keys
    },

    values: function(object) {
      const values = []
      for (let key in object){
        values.push(object[key])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === 'function'){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },

  }
})()

fi.libraryMethod()
