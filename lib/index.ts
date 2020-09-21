import { useState, Dispatch, SetStateAction } from 'react'
import instead from 'instead'

export type ReusableState< T > = [ T, Dispatch< SetStateAction< T > > ];

export function useReusableState< T >( init: Function ): never;
export function useReusableState< T >( init: T ): ReusableState< T >;

export function useReusableState< T >( init: T )
: ReusableState< T >
{
	const [ state, setState ] = useState( init );

	const setReusableState = ( t: SetStateAction< T > ) =>
	{
		const newState =
			typeof t === 'function'
			? instead( state, ( t as ( prev: T ) => T )( state ) )
			: instead( state, t );

		if ( newState === state )
			return;
		setState( newState );
	};

	return [ state, setReusableState ] as ReusableState< T > as any;
}
