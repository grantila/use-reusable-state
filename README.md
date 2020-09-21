[![npm version][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![build status][build-image]][build-url]
[![coverage status][coverage-image]][coverage-url]
[![Language grade: JavaScript][lgtm-image]][lgtm-url]

# use-reusable-state

This package provides a custom React hook `useReusableState` which has the same interface as `useState`, but if the data provided in the *setter* is deep-equal to the current value, the current value will be re-used, and no re-render will be triggered. If the data **is not** deep-equal, the data will be set, but it will be recursively checked for deep-equality so that sub-properties will be re-used if possible. This might cause less re-renderings in a deep React component tree.

Uses [instead](https://www.npmjs.com/package/instead) for deep-equality and partial replacement.


# Usage

```bash
yarn add use-reusable-state
```

```ts
import useReusableState from 'use-reusable-state'

const [ value, setValue ] = useReusableState( /* init */ { foo: 'bar' } );

// Sets a new value, but it's deep-equal to the current value,
// so no re-rendering will be triggered.
setValue( { foo: 'bar' } );

// Sub-property changed, so the new object will be saved.
setValue( { foo: 'baz' } );
```


# Deep re-using

```ts
const [ value, setValue ] = useReusableState( /* init */ {
	a: { foo: 'bar' },
	b: { foo: 'bar' },
} );

// Sets a new value, where a property is deep-equal to the current value.
// Will cause re-rendering
setValue( {
	a: { foo: 'bar' }, // Same as before
	b: { foo: 'baz' }, // Only b changed
} );

// ...
// The next iteration:
// ...

const [ value2, _ ] = useReusableState( /* ... */ );

value2.a === value.a; // true; referencial equality, the object was _reused_
value2.b !== value.b; // true; new object
value2 !== value;     // true; any change in the tree triggers a new parent
```


[npm-image]: https://img.shields.io/npm/v/use-reusable-state.svg
[npm-url]: https://npmjs.org/package/use-reusable-state
[downloads-image]: https://img.shields.io/npm/dm/use-reusable-state.svg
[build-image]: https://img.shields.io/github/workflow/status/grantila/use-reusable-state/Master.svg
[build-url]: https://github.com/grantila/use-reusable-state/actions?query=workflow%3AMaster
[coverage-image]: https://coveralls.io/repos/github/grantila/use-reusable-state/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/use-reusable-state?branch=master
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/grantila/use-reusable-state.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/grantila/use-reusable-state/context:javascript
