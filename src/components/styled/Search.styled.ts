import styled from 'styled-components';

export const SearchBar = styled.div<{$inHeader?: boolean}>`
	display: ${({$inHeader}) => ($inHeader ? 'none' : 'flex')};
	position: sticky;
	top: 0;
	z-index: 5;
	justify-content: space-evenly;
	padding-bottom: 1em;
	background-color: #f7dda4;

	@media (orientation: landscape) {
		display: ${({$inHeader}) => ($inHeader ? 'flex' : 'none')};
		position: static;
		justify-content: flex-end;
		min-width: 0;
		padding-bottom: 0;
	}
`;

export const SearchContainer = styled.div`
	min-width: 0;
	max-width: 100%;
	padding: 0.3em;
	border-radius: 10px;
	background-color: black;
`;

export const SearchInput = styled.input`
	width: 100%;
	min-width: 0;
	border-radius: 10px;
	background-color: #f7dda4;
`;
