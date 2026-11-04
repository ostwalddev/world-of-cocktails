import styled from 'styled-components';
export const AccountWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100%;
	padding-block: 1rem;
	row-gap: 1.6em;
	width: calc(100% - 3rem);
	margin: 0 auto;
	overflow-wrap: anywhere;
	text-align: center;
	font-family: 'Allenoire', serif;
	font-size: 1.1rem;

	button {
		font-family: inherit;
		font-size: 13.2px;
	}

	@media (orientation: landscape) {
		max-width: 50vw;
	}
`;
