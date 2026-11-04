import Head from 'next/head';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import SelectFooter from './SelectFooter';

const PageShell = styled.div`
	display: flex;
	flex-direction: column;
	height: 100dvh;
	overflow: hidden;

	> header,
	> footer {
		flex-shrink: 0;
	}

	> main {
		flex: 1;
		min-height: 0;
		padding-bottom: 1rem;
		overflow-y: auto;
	}
`;

export default function Layout({children}: {children: React.ReactNode}) {
	const router = useRouter();
	return (
		<PageShell>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<Header />
			<main>{children}</main>
			{router.pathname === '/select' ? <SelectFooter /> : <Footer />}
		</PageShell>
	);
}
