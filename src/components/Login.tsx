import {useSession, signIn, signOut} from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';

import {StyledLogin} from './styled/Login.styled';
import {LoginWrapper} from './styled/LoginCard.styled';
export default function Login() {
	const {data: session} = useSession();
	const isPreview = process.env.VERCEL_ENV === 'preview';
	const StyledLink = styled(Link)`
		font-weight: 400;
	`;
	if (session) {
		return (
			<>
				<LoginWrapper>
					<p>Welcome, {session.user?.name}</p>
					<p>Signed in as </p>
					<p>{session?.user?.email}</p>
					<StyledLogin>
						<StyledLink href="/bar">Start</StyledLink>
					</StyledLogin>
					<StyledLogin onClick={() => signOut()}>Logout</StyledLogin>
				</LoginWrapper>
			</>
		);
	}
	return (
		<>
			<LoginWrapper>
				<p>Not signed in.</p>
				<p>Please sign in with gitHub to continue.</p>
				<StyledLogin
					onClick={() => {
						signIn(isPreview ? 'credentials' : 'github');
					}}
				>
					Login
				</StyledLogin>
			</LoginWrapper>
		</>
	);
}
