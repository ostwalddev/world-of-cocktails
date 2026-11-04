import {useEffect, useState} from 'react';

import Layout from '../components/Layout';
import Search from '../components/Search';
import SelectCard from '../components/SelectCard';
import IngredientGrid from '../components/IngredientGrid';
import ingredientsStore from '../hooks/ingredientsStore';
import useStore from '../hooks/useStore';

export default function BarPage() {
	const [expandedIngredientId, setExpandedIngredientId] = useState<string | null>(null);
	const ingredients = useStore(ingredientsStore, state => state.ingredients);
	const searchItem = ingredientsStore(state => state.searchItem);
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const savedIngredients = useStore(ingredientsStore, state => state.savedIngredients);
	const setMoreIngredients = ingredientsStore(state => state.setMoreIngredients);

	useEffect(() => {
		setSearchItem('');
	}, [setSearchItem]);

	useEffect(() => {
		const savedIngredientsIds = savedIngredients?.map(ingredient => ingredient._id);
		setMoreIngredients(savedIngredientsIds);
	}, [savedIngredients, setMoreIngredients]);

	return (
		<Layout>
			<Search />
			<IngredientGrid>
				{ingredients?.map(ingredient => {
					const searchQuery = searchItem.toString().toLowerCase();
					const ingredientName = ingredient.name.toLowerCase();
					if (ingredientName.startsWith(searchQuery)) {
						return (
							<SelectCard
								key={ingredient._id}
								ingredient={ingredient}
								isExpanded={expandedIngredientId === ingredient._id}
								onToggle={() =>
									setExpandedIngredientId(current =>
										current === ingredient._id ? null : ingredient._id
									)
								}
							/>
						);
					} else return null;
				})}
			</IngredientGrid>
		</Layout>
	);
}
