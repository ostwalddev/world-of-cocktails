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

test.each([null, '', '   '])('uses the GitHub username when the display name is %p', name => {
	const provider = authOptions.providers.find(provider => provider.id === 'github');
	if (!provider || !('options' in provider)) throw new Error('GitHub provider missing');
	const options = provider.options as {
		profile: (profile: Record<string, unknown>) => {name: string};
	};
	expect(options.profile({id: 123, login: 'bartender', name}).name).toBe('bartender');
});

test('existing accounts with a missing name use their stored GitHub username', async () => {
	const callback = authOptions.callbacks?.session;
	if (!callback) throw new Error('Session callback missing');
	const session = await callback({
		session: {user: {name: null}, expires: '2099-01-01'},
		user: {id: '123', userName: 'bartender'},
	} as unknown as Parameters<typeof callback>[0]);
	expect(session.user?.name).toBe('bartender');
});
