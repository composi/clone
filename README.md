# @composi/clone

This function creates a deep clone of the provided object, which and be an array, an object, a Set, a Map, Date, etc. There is no need to use this with simple types like string or number. Clone objects is useful for state management where you don't want to directly manipulate the state.

It is possible to provide more than one object. In that case it will create a new object containing the combined deep clone of those objects. In this case order matters. Properties on earlier objects will be replaced by properties of later objects with the same properties.


## Install

```
npm install --save-dev @composi/clone
```


## Clone an Object

You can clone an object with merge. Just pass in the object. The return object will be a clone:

```javascript
import { clone } from '@composi/merge-objects'

const obj1 = {name: 'Joe', job: 'mechanic'}
const obj2 = clone(obj1)
obj1 === obj2 // returns false
```

## Create Clone of two objects:

```javascript
import { clone } from '@composi/clone'

const obj1 = {name: 'Mary'}
const obj2 = {job: 'project manager'}
const person = clone(obj1, obj2)
// returns {name: 'Mary', job: 'project manager'}
```


## Clone an Array

If you want to clone an array, just pass it as the argument:

```javascript
const arr1 = [{name: 'Joe'}, {name: 'Jane'}]
// Create clone of arr1:
const clonedArr1 = clone(arr1)
arr1[0].name = 'Joseph'
arr2[0].name // 'Joe'
```


## Create Clone of Arrays

You can use clone to merge any number of arrays together. This is a deep clone, which means you can use it safely with arrays of objects.

```javascript

  const arr1 = [{name: 'Joe'}, {name: 'Jane'}]
  const arr2 = [{name: 'Mary'}, {name: 'Sam'}]
  const arr3 = clone(arr1, arr2)
  // arr3 equals [{name: 'Joe'}, {name: 'Jane'}, {name: 'Mary'}, {name: 'Sam'}])
  arr1[0].name = 'Joseph' // [{name: 'Joseph'}, {name: 'Jane'}]
  arr2[1].name = 'Samuel' // [{name: 'Mary'}, {name: 'Samuel'}]
  // The above changes do not affect arr3:
  // [{name: 'Joe'}, {name: 'Jane'}, {name: 'Mary'}, {name: 'Sam'}])
  ```