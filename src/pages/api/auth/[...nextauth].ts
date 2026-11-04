import type {NextAuthOptions} from 'next-auth';
import type {NextApiRequest, NextApiResponse} from 'next';
import {MongoDBAdapter} from '@next-auth/mongodb-adapter';
import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import getClientPromise from '../../../backend/lib/mongodb';

const current = new Date();
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
const providers: NextAuthOptions['providers'] = [];
if (process.env.VERCEL_ENV === 'preview') {
	providers.push(
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
				password: {label: 'Password', type: 'password'},
			},
			async authorize(credentials) {
				if (credentials?.username === 'test' && credentials?.password === 'test') {
					return {
						id: 'test',
						name: 'Test User',
						email: 'test@example.com',
					};
				} else {
					return null;
				}
			},
		})
	);
} else {
	providers.push(
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.name,
					userName: profile.login,
					email: profile.email,
					image: profile.avatar_url,
					ingredients: [
						{
							type: mongoose.Schema.Types.ObjectId,
							ref: 'Ingredients',
						},
					],
					createdAt: date,
				};
			},
		})
	);
}

export const authOptions: NextAuthOptions = {
	providers,
	debug: process.env.NODE_ENV === 'development',
};
export default function handler(request: NextApiRequest, response: NextApiResponse) {
	return NextAuth(request, response, {
		...authOptions,
		adapter: MongoDBAdapter(getClientPromise()),
	});
}
