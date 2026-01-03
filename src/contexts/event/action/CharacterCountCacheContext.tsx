import {createContext, JSX, PropsWithChildren, useCallback, useContext, useMemo, useState} from 'react';

export type CharacterCountCache = {
	description: number;
	details: number[];
};

type CharacterCountCacheContextType = {
	/**
	 * Current character count cache
	 */
	cache: CharacterCountCache;
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
	const [cache, setCache] = useState<CharacterCountCache>({
		description: 0,
		details: [],
	});

	const setCharacterCount = useCallback((path: string, count: number) =>
		setCache((prevCache) => {
			const newCache = {...prevCache};
			if (path === 'description') {
				newCache.description = count;
			} else {
				const index = Number(path.split('.')[1]);
				newCache.details[index] = count;
			}
			console.log('Updating count from', prevCache, 'to', newCache, 'for path', path, 'with count', count);
			return newCache;
		}), []);

	const reorderDetailsItem = useCallback((fromIndex: number, toIndex: number) =>
		setCache((prevCache) => {
			const details = [...prevCache.details];
			const [movedItem] = details.splice(fromIndex, 1);
			details.splice(toIndex, 0, movedItem);
			const newCache = {
				...prevCache,
				details,
			};
			console.log('Reordering cache from', prevCache, 'to', newCache, 'moving from', fromIndex, 'to', toIndex);
			return newCache;
		}), []);

	const removeDetailsItem = useCallback((removedIndex: number) =>
		setCache((prevCache) => {
			const newCache = {
				...prevCache,
				details: prevCache.details.toSpliced(removedIndex, 1),
			};
			console.log('Updating cache from', prevCache, 'to', newCache, 'after removing index', removedIndex);
			return newCache;
		}), []);

	const value = useMemo(() => ({
		cache,
		setCharacterCount,
		reorderDetailsItem,
		removeDetailsItem,
	}), [cache, setCharacterCount, reorderDetailsItem, removeDetailsItem]);

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
