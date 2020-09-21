import { useReusableState } from './'

import { renderHook, act } from '@testing-library/react-hooks'


describe( "useReusableState regular usage", ( ) =>
{
	it( "Should re-use object if deep-equal", ( ) =>
	{
		const val = { a: 42 };
		const { result } = renderHook( ( ) => useReusableState( val ) );

		act( ( ) =>
		{
			result.current[ 1 ]( { a: 42 } );
		} );

		expect( result.current[ 0 ] ).toBe( val );
	} );

	it( "Should crea new object if not deep-equal", ( ) =>
	{
		const val = { a: 42 };
		const { result } = renderHook( ( ) => useReusableState( val ) );

		act( ( ) =>
		{
			result.current[ 1 ]( { a: 17 } );
		} );

		expect( result.current[ 0 ] ).not.toBe( val );
		expect( result.current[ 0 ] ).toStrictEqual( { a: 17 } );
	} );
} );

describe( "useReusableState functional usage", ( ) =>
{
	it( "Should re-use object if deep-equal", ( ) =>
	{
		const val = { a: 42 };
		const { result } = renderHook( ( ) => useReusableState( val ) );

		act( ( ) =>
		{
			result.current[ 1 ]( _old => ( { a: 42 } ) );
		} );

		expect( result.current[ 0 ] ).toBe( val );
	} );

	it( "Should crea new object if not deep-equal", ( ) =>
	{
		const val = { a: 42 };
		const { result } = renderHook( ( ) => useReusableState( val ) );

		act( ( ) =>
		{
			result.current[ 1 ]( _old => ( { a: 17 } ) );
		} );

		expect( result.current[ 0 ] ).not.toBe( val );
		expect( result.current[ 0 ] ).toStrictEqual( { a: 17 } );
	} );
} );
