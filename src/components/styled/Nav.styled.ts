import styled from 'styled-components';

export const StyledNav = styled.nav`
	display: flex;
	position: relative;
	z-index: 1;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	height: var(--navigation-height, 4rem);
	padding-bottom: env(safe-area-inset-bottom, 0px);
	border-radius: 25px 25px 0 0;
	background-color: #f7dda4;
	filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 1.5));
`;
