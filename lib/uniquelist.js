var UniqueList;
(function () {
// ======================================================
var cast = require('TypeCast');

/**
 * UniqueList behaves like an array, but it will guarantee its values
 * uniqueness
 * @class
 * @description
 * created 2012-01-25
 */
UniqueList = function (length) {
  if (length) {
    if (typeof length !== 'number') {
      length = parseInt(length.valueOf());
      if (isNaN(length)) {
        throw new Error('you need to pass an integer to the constructor, or do not pass');
      }
    }
  }
  else {
    length = 0;
  }

  return UniqueListConstructor({}, new Array(length));
};

// ======================================================

/**
 * serialize UniqueList.
 * @function
 * @param {UniqueList} obj an object to serialize
 * @returns {'keys': <obj>, 'array': <Array>};
 */
UniqueList.serialize = function (obj) {
  if (!obj.isUniqueList) {
    throw new Error('You need to pass an isntance of UniqueList.');
  }
  return {
    keys: obj.keys,
    array: [].concat(obj)
  };
};

/**
 * deserialize UniqueList.
 * @function
 * @param {object} keys
 * @param {Array} array
 * @returns {UniqueList}
 */
UniqueList.deserialize = function (keys, array) {
  if (Object.prototype.toString.apply(array) !== '[object Array]') {
    throw new Error('You need to pass an array in the second argument. USAGE: UniqueList.deserialization(<object>keys, <Array>array)');
  }
  if (typeof keys !== 'object') {
    throw new Error('You need to pass an object in the first argument. USAGE: UniqueList.deserialization(<object>keys, <Array>array)');
  }
  var len = array.length;
  for (var i in keys) {
    if (typeof keys[i] !== 'number') {
      throw new Error('Each item of "keys" needs to be a number. USAGE: UniqueList.deserialization(<object>keys, <Array>array)');
    }
    if (keys[i] > len) {
      throw new Error('Index out of bounds of keys. USAGE: UniqueList.deserialization(<object>keys, <Array>array)');
    }
  }
  return UniqueListConstructor(keys, array);
};

// ======================================================

/**
 * all actual functionalities pacakged
 * @class
 * @name UniqueList.instance
 * @private
 */
var innerClass = function () {};

/**
 * @function
 * @param {*} value
 * @param {string} key
 * @returns {*} value
 * @name UniqueList.instance.push
 * @description
 * with the normal Array, if the passed argument is 
 * undefined, it won't change anything.  But with 
 * UniqueList, you can set undefined, when you pass
 * a key. 
 * when you pass the same key, it'll update the 
 * value associated with the key.
 */
innerClass.prototype.push = function (value, key) {
  if (key !== undefined || value !== undefined) {
// console.log([typeof value, typeof key]);
    var mykey = makeKey(key, value);
// console.log(mykey);
    if (this.keys[mykey] === undefined) {
// console.log('yeah');
      Array.prototype.push.call(this, value);
      this.keys[mykey] = (this.length - 1);
    }
    else {
// console.log('nah');
      this[this.keys[mykey]] = value;
    }
  }
  return this.length;
};

/**
 * @function
 * @name UniqueList.instance.pop
 * @returns {*} value
 */
innerClass.prototype.pop = function () {
  var result;
  if (this.length > 0) {
    result = Array.prototype.pop.call(this);
    var index = this.length;
    loop:for (var i in this.keys) {
      if (this.keys[i] === index) {
        delete this.keys[i];
        break loop;
      }
    }
  }
  return result;
};

/**
 * @function
 * @param {string} key
 * @name UniqueList.instance.getByKey
 * @returns {*}
 */
innerClass.prototype.getByKey = function (key) {
  var result;
  if (this.keys.hasOwnProperty(key)) {
    result = this[ this.keys[key] ];
  }
  return result;
};

/**
 * @function
 * @param {string} key
 * @name UniqueList.instance.isUnique
 * @returns {boolean}
 */
innerClass.prototype.isUnique = function (key) {
  var result = true;
  if (typeof this.keys[key] !== 'undefined') {
    result = false;
  }
  return result;
};

// ======================================================
// all private functions

/**
 * Private consturctor, the validity of the params should be
 * guaranteed somewhere else.
 */
var UniqueListConstructor = function (keys, array) {
  var result = array;
  if (!array.isUniqueList) {
    setDontEnumValue(result, 'isUniqueList', true);
    setDontEnumValue(result, 'keys', {});
    var inner = new innerClass();
    for (var i in inner) {
      setDontEnumValue(result, i, inner[i]);
    }
  }
  return result;
};

/**
 * generate key, used by "Create" operation, such as
 * push() and unshift()
 */
var makeKey = function (k, v) {
  var key;
  if (k) {
    key = normalizeString(k);
  }
  else {
    if (typeof v === 'undefined' || v === null) {
      key = normalizeString(v);
    }
    else if (v.key) {
      key = normalizeString(v.key);
    }
    else if (v.toString) {
      key = v.toString();
    }
    else {
      key = normalizeString(v);
    }
  }
  return key;
};

/**
 * this is used for a wrappe for TypeCast.string
 * if you wanna use this script on web and don't want any
 * dependency, you can change this to whatever...
 */
var normalizeString = function (obj) {
  return cast.string(obj);
};

/**
 * if your JS-implementation can handle Object.defineProperty,
 * you can make each instance method/variable hidden.
 */
var isDefinePropertyAvailable = (typeof Object.defineProperty === 'function');

var setDontEnumValue = function (obj, key, value) {
  if (isDefinePropertyAvailable) {
    Object.defineProperty( 
      obj, 
      key, 
      {
        value: value,
        enumerable: false
      }
    );
  }
  else {
    obj[key] = value;
  }
};

// ======================================================

})();

exports.UniqueList = UniqueList;