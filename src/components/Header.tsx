import {useRouter} from 'next/router';
import styled from 'styled-components';

import Footer from './Footer';
import SelectFooter from './SelectFooter';
import Search from './Search';
import {StyledHeader, Headline} from './styled/Header.styled';

const Navigation = styled.div`
	display: none;

	@media (orientation: landscape) {
		display: block;
		min-width: 0;

		nav {
			height: auto;
			padding: 0;
			border-radius: 0;
			background: transparent;
			filter: none;
			flex-wrap: wrap;
			justify-content: flex-start;
			gap: 0.25rem;
		}

		nav > div {
			width: auto;
			height: auto;
			padding: 0.4rem;
			border-radius: 8px;
		}

		a {
			font-size: clamp(0.9rem, 1.4vw, 1rem);
		}
	}
`;

export default function Header() {
	const {pathname} = useRouter();
	const hasSearch = ['/bar', '/select', '/cocktails'].includes(pathname);
	return (
		<StyledHeader>
			<Navigation>
				{pathname === '/select' ? <SelectFooter inline /> : <Footer inline />}
			</Navigation>
			<Headline>World of Cocktails</Headline>
			{hasSearch && <Search inHeader />}
		</StyledHeader>
	);
}
