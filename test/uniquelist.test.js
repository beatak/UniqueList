var UniqueList = require('../lib/uniquelist.js').UniqueList,
assert = require('assert');

/**
 * UniqueList can...
 * - do as an array does
 * -- mutator: push/pop, shift/unshift, reverse, sort, splice
 * -- accessor: concat, join, slice, toString
 * - find duplication
 * - serialize/deserialize
 * -- 
 */

module.exports = {

  // constructor 
  'UniqueList: constructor' : function () {
    assert.doesNotThrow(
      function () {
        var ul = new UniqueList();
      }
    );
  }
  ,'UniqueList: constructor with val' : function () {
    assert.doesNotThrow(
      function () {
        var ul = new UniqueList(1);
      }
    );
  }
  ,'UniqueList: constructor with val for len' : function () {
    var ul = new UniqueList(1);
    assert.equal(1, ul.length);
  }
  ,'UniqueList: constructor with NaN val' : function () {
    assert.throws(
      function () {
        var ul = new UniqueList('f');
      }
    );
  }

  /**
   * MUTATOR
   */

  // push 
  ,'UniqueList: push' : function () { 
    var ul = new UniqueList();
    ul.push(1, '1');
    assert.equal(ul[0], 1);
  }
  ,'UniqueList: push returns value' : function () { 
    var ul = new UniqueList();
    assert.equal(1, ul.push(1, '1'));
  }
  ,'UniqueList: push without key' : function () { 
    var ul = new UniqueList();
    ul.push(1);
    assert.equal(ul[0], 1);
  }
  ,'UniqueList: push empty' : function () { 
    var ul = new UniqueList();
    ul.push();
    var elem0 = ul[0];
    assert.equal(true, (elem0 === undefined));
  }
  ,'UniqueList: push empty len' : function () { 
    var ul = new UniqueList();
    ul.push();
    assert.equal(1, ul.length);
  }
  ,'UniqueList: push will put the value at the end' : function () { 
    var ul = new UniqueList();
    ul.push(0);
    var newindex = ul.length;
    ul.push(1, 'newval');
    assert.equal(newindex, ul[newindex]);
  }

  // pop
  ,'UniqueList: pop' : function () { 
    var ul = new UniqueList();
    ul.push(123);
    assert.equal(123, ul.pop());
  }
  ,'UniqueList: pop empty' : function () { 
    var ul = new UniqueList();
    var result = ul.pop();
    assert.equal(true, (result === undefined));
  }
  ,'UniqueList: pop should mutate keys' : function () { 
    var ul = new UniqueList();
    ul.push(1, 'mykey');
    ul.pop();
    assert.equal(true, ul.isUnique('mykey'));
  }

  // shift
  ,'UniqueList: shift' : function () { 
    var ul = new UniqueList();
    ul.push(1);
    assert.equal(1, ul.shift());
  }
  ,'UniqueList: shift empty' : function () { 
    var ul = new UniqueList();
    var result = ul.shift();
    assert.equal('undefined', typeof result);
  }
  ,'UniqueList: shift mutate length' : function () { 
    var ul = new UniqueList();
    ul.push(1);
    var len = ul.length;
    ul.shift();
    assert.equal((len - 1), ul.length);
  }
  ,'UniqueList: shift mutate keys' : function () { 
    var ul = new UniqueList();
    ul.push(1);
    ul.shift();
    assert.equal('undefined', typeof ul.keys['1']);
  }

  // unshift
  ,'UniqueList: unshift' : function () { 
    var ul = new UniqueList();
    ul.unshift(2);
    ul.unshift(1);
    assert.equal(1, ul[0]);
  }
  ,'UniqueList: unshift empty' : function () { 
    var ul = new UniqueList();
    ul.unshift();
    assert.equal('undefined', typeof ul[0]);
  }
  ,'UniqueList: unshift empty not changing length' : function () { 
    var ul = new UniqueList();
    ul.unshift();
    assert.equal(0, ul.length);
  }
  ,'UniqueList: unshift returns' : function () { 
    var ul = new UniqueList();
    assert.equal(1, ul.unshift(1));
  }
  ,'UniqueList: unshift mutates keys' : function () { 
    var ul = new UniqueList();
    ul.unshift('c');
    ul.unshift('b');
    ul.unshift('a');
    assert.equal(1, ul.keys['b']);
  }

  // reverse

  // sort

  // splice

  /**
   * ACCESSOR
   */

  // concat

  // join

  // slice

  // isUnique

  // getByKey
  ,'UniqueList: ' : function () { 
    var ul = new UniqueList();
    assert.equal(1, 1);
  }

  /**
   * SERIALIZE
   */

  // UniqueList.serialize()

  // UniqueList.deserialize()

};
