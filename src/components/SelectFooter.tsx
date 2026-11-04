import {useSession} from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';

import useIngredientsStore from '../hooks/ingredientsStore';
import useStore from '../hooks/useStore';

import {StyledNav} from './styled/Nav.styled';

export default function SelectFooter() {
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
		width: 6rem;
		height: 70%;
		border-radius: 10px;
		background-color: ${props => (props.isActive ? 'black' : '')};
	`;

	const {data: session} = useSession();
	const moreIngredients = useStore(useIngredientsStore, state => state.moreIngredients);

	async function update() {
		await fetch(`/api/users/${session?.user?.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(moreIngredients),
		});
	}

	return (
		<footer>
			<StyledNav>
				<LinkWrapper>
					<StyledLink href={'/bar'}>Back</StyledLink>
				</LinkWrapper>
				<LinkWrapper isActive>
					<StyledLink href={'/bar'} isActive onClick={update}>
						Confirm
					</StyledLink>
				</LinkWrapper>
			</StyledNav>
		</footer>
	);
}
