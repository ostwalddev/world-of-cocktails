import type {Ingredient} from '../types/domain';
interface IngredientsState {
	ingredients: Ingredient[];
	savedIngredients: Ingredient[];
	searchItem: string;
	moreIngredients: string[];
	setMoreIngredients: (ingredients: string[] | undefined) => void;
	removeMoreIngredients: (ingredients: string[], ingredient: string) => void;
	addMoreIngredients: (ingredients: string[], ingredient: string) => void;
	setSearchItem: (item: string) => void;
	setSavedIngredients: (ingredients: Ingredient[]) => void;
	fetchIngredients: (url: string) => Promise<void>;
	fetchSavedIngredients: (url: string) => Promise<void>;
}
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useIngredientsStore = create<IngredientsState>()(
	persist(
		set => ({
			ingredients: [],
			savedIngredients: [],
			searchItem: '',
			moreIngredients: [],
			setMoreIngredients: state => {
				set({moreIngredients: state ?? []});
			},
			removeMoreIngredients: (ingredients, ingredient) => {
				set({
					moreIngredients: ingredients.filter(item => item !== ingredient),
				});
			},
			addMoreIngredients: (ingredients, ingredient) => {
				if (ingredients) {
					set({moreIngredients: [...ingredients, ingredient]});
				} else set({moreIngredients: [ingredient]});
			},
			setSearchItem: item => {
				set({searchItem: item});
			},
			setSavedIngredients: ingredients => {
				set({savedIngredients: ingredients});
			},
			fetchIngredients: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json.data;
					set({ingredients: data});
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
			fetchSavedIngredients: async url => {
				try {
					const response = await fetch(url);
					const json = await response.json();
					const data = json[0].ingredients;
					set({savedIngredients: data});
				} catch (error) {
					console.error(`Oops, there was an error: ${error}`);
				}
			},
		}),
		{
			name: 'ingredients-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useIngredientsStore;
