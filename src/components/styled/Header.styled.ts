import styled from 'styled-components';

export const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	height: var(--navigation-height, 4rem);
	justify-content: space-evenly;
	margin-bottom: 1em;
	padding: 1em clamp(2rem, 5vw, 5rem);
	border-radius: 0 0 25px 25px;
	background-color: #f7dda4;
	filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

	@media (orientation: landscape) {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, max-content) minmax(0, 1fr);
		column-gap: 1rem;
		height: auto;
		min-height: var(--navigation-height, 4rem);
		padding: 0.75rem clamp(2rem, 5vw, 5rem);

		h1 {
			font-size: 1.5rem;
			min-width: 0;
			text-align: center;
		}
	}
`;

export const Headline = styled.h1`
	font-family: 'Allenoire', serif;
	font-size: 1.5em;
	font-weight: 700;
`;
