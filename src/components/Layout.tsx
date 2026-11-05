import Head from 'next/head';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import SelectFooter from './SelectFooter';

const PageShell = styled.div`
	--navigation-height: 4rem;
	display: grid;
	position: fixed;
	inset: 0;
	grid-template-rows: auto minmax(0, 1fr) auto;
	overflow: hidden;

	> header,
	> footer {
		position: relative;
		z-index: 10;
	}

	@media (orientation: landscape) {
		grid-template-rows: auto minmax(0, 1fr);

		> footer {
			display: none;
		}
	}

	> main {
		min-height: 0;
		min-width: 0;
		padding-bottom: 1rem;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		scrollbar-width: thin;
		scrollbar-color: #2d2826 #f7dda4;

		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #f7dda4;
		}

		&::-webkit-scrollbar-thumb {
			border: 2px solid #f7dda4;
			border-radius: 999px;
			background: #2d2826;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #514640;
		}
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
