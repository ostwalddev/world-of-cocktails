import type {Cocktail} from '../types/domain';
interface CocktailsState {
	cocktails: Cocktail[];
	fetchCocktails: (url: string) => Promise<void>;
}
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const cocktailsStore = create<CocktailsState>()(
	persist(
		set => ({
			cocktails: [],

			fetchCocktails: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json.data;
					set({cocktails: data});
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
		}),
		{
			name: 'cocktails-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default cocktailsStore;
