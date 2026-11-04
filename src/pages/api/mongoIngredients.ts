import type {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from '../../backend/lib/dbConnect';
import Ingredients from '../../backend/models/ingredientsModel';

export default async function Handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		await dbConnect();
		switch (request.method) {
			case 'GET': {
				const ingredients = await Ingredients.find();
				console.log(ingredients);
				response.status(200).json({success: true, data: ingredients});
				break;
			}

			case 'POST': {
				const ingredient = await Ingredients.create(request.body);
				response.status(201).json({success: true, data: ingredient});
				break;
			}
		}
	} catch {
		response.status(500).json({error: 'Internal Server Error'});
	}
}
