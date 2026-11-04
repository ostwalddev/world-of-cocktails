import type {NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth/next';
import handler from '../../pages/api/users/[userId]';
import connectMongo from './dbConnect';
import {getUser, putUser} from './controller';

jest.mock('next-auth/next', () => ({getServerSession: jest.fn()}));
jest.mock('../../pages/api/auth/[...nextauth]', () => ({getAuthOptions: () => ({})}));
jest.mock('./dbConnect', () => ({__esModule: true, default: jest.fn()}));
jest.mock('./controller', () => ({getUser: jest.fn(), putUser: jest.fn()}));

const email = 'bar@example.com';
function responseMock() {
	const response = {status: jest.fn(), json: jest.fn(), setHeader: jest.fn()};
	response.status.mockReturnValue(response);
	return response;
}
async function run(method = 'PUT', userId = email) {
	const response = responseMock();
	await handler(
		{method, query: {userId}, body: []} as unknown as NextApiRequest,
		response as unknown as NextApiResponse
	);
	return response;
}
beforeEach(() => {
	jest.resetAllMocks();
	jest.mocked(getServerSession).mockResolvedValue({user: {email}, expires: '2099-01-01'});
	jest.mocked(putUser).mockImplementation(async (_request, response) => {
		response.status(200).json([]);
	});
});
test('saves ingredients and sends exactly one response', async () => {
	const response = await run();
	expect(connectMongo).toHaveBeenCalledTimes(1);
	expect(putUser).toHaveBeenCalledTimes(1);
	expect(response.json).toHaveBeenCalledTimes(1);
	expect(response.status).toHaveBeenCalledWith(200);
});
test('does not query users when the database connection fails', async () => {
	jest.mocked(connectMongo).mockRejectedValueOnce(new Error('offline'));
	const response = await run('GET');
	expect(getUser).not.toHaveBeenCalled();
	expect(response.status).toHaveBeenCalledWith(500);
	expect(response.json).toHaveBeenCalledTimes(1);
});
test('requires a signed-in session', async () => {
	jest.mocked(getServerSession).mockResolvedValueOnce(null);
	expect((await run()).status).toHaveBeenCalledWith(401);
	expect(connectMongo).not.toHaveBeenCalled();
});
test('rejects access to another user’s bar', async () => {
	expect((await run('GET', 'someone@example.com')).status).toHaveBeenCalledWith(403);
	expect(getUser).not.toHaveBeenCalled();
	expect(connectMongo).not.toHaveBeenCalled();
});
test('returns allowed methods for unsupported requests', async () => {
	const response = await run('DELETE');
	expect(response.status).toHaveBeenCalledWith(405);
	expect(response.setHeader).toHaveBeenCalledWith('Allow', ['GET', 'PUT']);
	expect(getServerSession).not.toHaveBeenCalled();
});
test('waits for the database before fetching the bar', async () => {
	const calls: string[] = [];
	jest.mocked(connectMongo).mockImplementationOnce(async () => {
		calls.push('connected');
	});
	jest.mocked(getUser).mockImplementationOnce(async () => {
		calls.push('read');
	});
	await run('GET');
	expect(calls).toEqual(['connected', 'read']);
});
