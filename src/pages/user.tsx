import {useSession} from 'next-auth/react';
import {signOut} from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/legacy/image';
import styled from 'styled-components';

import Layout from '../components/Layout';
import {AccountWrapper} from '../components/styled/AccountWrapper.styled';
import {StyledLogout} from '../components/styled/Login.styled';
const StyledImage = styled(Image)`
	border-radius: 50%;
`;

const ProfileImage = styled.div`
	align-self: center;
	width: 20%;
`;

export default function AboutPage() {
	const {data: session} = useSession();

	return (
		<Layout>
			<Head>
				<title key="title">About</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<AccountWrapper>
				{session?.user?.image && (
					<ProfileImage>
						<StyledImage
							src={session?.user?.image}
							alt="Profile Picture"
							width={200}
							height={200}
							layout="responsive"
							objectFit="contain"
							sizes="(orientation: landscape) 10vw, 20vw"
						></StyledImage>
					</ProfileImage>
				)}
				<p>{`name: ${session?.user?.name}`}</p>
				<p>{`email: ${session?.user?.email}`}</p>

				{session && (
					<>
						<StyledLogout onClick={() => signOut()}>Logout</StyledLogout>
					</>
				)}
			</AccountWrapper>
		</Layout>
	);
}
