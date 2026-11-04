import type {AppProps} from 'next/app';
import {StyleSheetManager} from 'styled-components';
import {SessionProvider} from 'next-auth/react';

import {GlobalStyle} from '../styles';

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
	return (
		<>
			<SessionProvider session={session}>
				<StyleSheetManager enableVendorPrefixes>
					<GlobalStyle />
					<Component {...pageProps} />
				</StyleSheetManager>
			</SessionProvider>
		</>
	);
}
