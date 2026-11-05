import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {StyledNav} from './styled/Nav.styled';

export default function Footer({inline = false}: {inline?: boolean}) {
	const Container = inline ? 'div' : 'footer';
	const router = useRouter();

	const StyledLink = styled(Link)<{isActive?: boolean}>`
		color: ${props => (props.isActive ? '#f7dda4' : 'black')};
		font-family: 'Allenoire', serif;
		font-weight: 600;
		cursor: pointer;
	`;

	const LinkWrapper = styled.div<{isActive?: boolean}>`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 5rem;
		height: 100%;
		background-color: ${props => (props.isActive ? 'black' : '')};
	`;

	return (
		<Container>
			<StyledNav>
				<LinkWrapper isActive={router.pathname === '/bar' || router.pathname === '/select'}>
					<StyledLink
						href="/bar"
						isActive={router.pathname === '/bar' || router.pathname === '/select'}
					>
						My Bar
					</StyledLink>
				</LinkWrapper>
				<LinkWrapper
					isActive={
						router.pathname === '/cocktails' || router.pathname.startsWith('/details/')
					}
				>
					<StyledLink
						href="/cocktails"
						isActive={
							router.pathname === '/cocktails' ||
							router.pathname.startsWith('/details/')
						}
					>
						Cocktails
					</StyledLink>
				</LinkWrapper>
				<LinkWrapper isActive={router.pathname === '/user'}>
					<StyledLink href="/user" isActive={router.pathname === '/user'}>
						User
					</StyledLink>
				</LinkWrapper>
			</StyledNav>
		</Container>
	);
}
