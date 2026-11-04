import type {NextApiRequest, NextApiResponse} from 'next';
import User from '../models/userModel';

export async function getUser(request: NextApiRequest, response: NextApiResponse) {
	try {
		const {userId} = request.query;
		const user = await User.find({email: userId}).populate('ingredients');
		response.status(200).json(user);
	} catch {
		response.status(404).json({error: 'Cannot get the User'});
	}
}

export async function putUser(request: NextApiRequest, response: NextApiResponse) {
	try {
		const {userId} = request.query;
		const data = request.body;
		const filter = {email: userId};
		const update = {ingredients: data};

		await User.findOneAndUpdate(filter, update);
		response.status(200).json(data);
	} catch {
		response.status(404).json({error: 'Error while updating the Data'});
	}
}
