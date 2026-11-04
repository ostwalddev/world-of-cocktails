export interface Ingredient {
	_id: string;
	name: string;
	alternatives?: string[];
	description: string;
	alcoholic: boolean;
	color: string;
	image: string;
}
export interface Cocktail {
	id: string;
	name: string;
	ingredients: {names: string[]; measurements: string[]};
	instructions: string;
	image: string;
}
