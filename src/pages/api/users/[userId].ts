import type {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth/next';
import {getUser, putUser} from '../../../backend/lib/controller';
import connectMongo from '../../../backend/lib/dbConnect';
import {getAuthOptions} from '../auth/[...nextauth]';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	if (request.method !== 'GET' && request.method !== 'PUT') {
		response.setHeader('Allow', ['GET', 'PUT']);
		return response.status(405).json({error: 'Method not allowed'});
	}
	try {
		const session = await getServerSession(request, response, getAuthOptions());
		if (!session?.user?.email) return response.status(401).json({error: 'Sign in required'});
		if (
			typeof request.query.userId !== 'string' ||
			session.user.email !== request.query.userId
		) {
			return response.status(403).json({error: 'You can only access your own bar'});
		}
		await connectMongo();
		if (request.method === 'GET') return await getUser(request, response);
		return await putUser(request, response);
	} catch {
		return response.status(500).json({error: 'Unable to access saved ingredients'});
	}
}
