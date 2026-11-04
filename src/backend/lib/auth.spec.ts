import {authOptions} from '../../pages/api/auth/[...nextauth]';

jest.mock('./mongodb', () => ({__esModule: true, default: jest.fn()}));

test('new GitHub accounts start with an empty bar and a string provider ID', async () => {
	const provider = authOptions.providers.find(provider => provider.id === 'github');
	if (!provider || !('options' in provider)) throw new Error('GitHub provider missing');
	const options = provider.options as {
		profile: (profile: Record<string, unknown>) => {id: string; ingredients: string[]};
	};
	const user = options.profile({
		id: 123,
		login: 'bartender',
		name: 'Bartender',
		email: 'bar@example.com',
		avatar_url: 'https://example.com/avatar.png',
	});
	expect(user.id).toBe('123');
	expect(user.ingredients).toEqual([]);
});
