import {createContext, JSX, PropsWithChildren, RefObject, useCallback, useContext, useMemo, useRef} from 'react';

export type CharacterCountCache = {
	description: number;
	details: number[];
};

type CharacterCountCacheContextType = {
	/**
	 * Ref to the current character count cache
	 */
	cacheRef: RefObject<CharacterCountCache>;
	/**
	 * Sets the character count for a given path
	 */
	setCharacterCount: (path: string, count: number) => void;
	/**
	 * Reorders a {@link CharacterCountCache.details} item in the cache
	 */
	reorderDetailsItem: (fromIndex: number, toIndex: number) => void;
	/**
	 * Removes a {@link CharacterCountCache.details} item from the cache
	 */
	removeDetailsItem: (removedIndex: number) => void;
};

/**
 * Cache character counts in event action forms for validation purposes
 */
export function CharacterCountCacheProvider({children}: Readonly<PropsWithChildren>): JSX.Element {
	const cacheRef = useRef<CharacterCountCache>({
		description: 0,
		details: [],
	});

	const setCharacterCount = useCallback((path: string, count: number) => {
		if (path === 'description') {
			cacheRef.current.description = count;
		} else {
			const index = Number(path.split('.')[1]);
			cacheRef.current.details[index] = count;
		}
	}, []);

	const reorderDetailsItem = useCallback((fromIndex: number, toIndex: number) => {
		const [movedItem] = cacheRef.current.details.splice(fromIndex, 1);
		cacheRef.current.details.splice(toIndex, 0, movedItem);
	}, []);

	const removeDetailsItem = useCallback((removedIndex: number) => {
		cacheRef.current.details.splice(removedIndex, 1);
	}, []);

	const value = useMemo(() => ({
		cacheRef,
		setCharacterCount,
		reorderDetailsItem,
		removeDetailsItem,
	}), [cacheRef, setCharacterCount, reorderDetailsItem, removeDetailsItem]);

	return (
		<CharacterCountCacheContext.Provider value={value}>
			{children}
		</CharacterCountCacheContext.Provider>
	);
}

const CharacterCountCacheContext = createContext<CharacterCountCacheContextType | undefined>(undefined);

export function useCharacterCountCache(): CharacterCountCacheContextType {
	const context = useContext(CharacterCountCacheContext);
	if (context === undefined) {
		throw new Error('useCharacterCountCache must be used within a CharacterCountCacheProvider');
	}
	return context;
}
