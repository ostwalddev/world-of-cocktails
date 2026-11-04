import {motion} from 'framer-motion';
import styled, {css} from 'styled-components';

import {TextWrapper} from './TextWrapper.styled';

export const StyledIngredientGrid = styled.ul`
	display: grid;
	position: relative;
	overflow: hidden;
	grid-auto-flow: row;
	grid-auto-rows: 1px;
	grid-column-gap: 15px;
	grid-row-gap: 0;
	grid-template-columns: repeat(auto-fit, minmax(100px, 100px));
	align-content: start;
	width: 100%;
	margin: 0 auto;
	padding-right: 2%;
	padding-left: 7.5%;
	list-style: none;
`;

export const StyledIngredientCard = styled(motion.li)<{
	expanded?: boolean;
	clicked?: boolean;
	color?: string;
}>`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 100%;
	align-self: start;
	grid-row-end: span 205;
	row-gap: 10px;
	border-radius: 0.55rem;
	background-color: ${props => props.color};
	cursor: pointer;
	${({expanded}) =>
		expanded
			? css`
				height: max-content;
				max-height: 600px;
				padding: 1em;
				grid-column: auto / span 2;
				grid-row-end: span 615;

				> div {
					flex-shrink: 0;
				}

				> ${TextWrapper} {
					flex-shrink: 1;
					min-height: 0;
					max-height: none;
				}
			`
			: `height: 190px; padding: 0.4em`};
	${({clicked}) =>
		clicked
			? `	
		border-style: solid;
  		border-color: black;
		opacity: 60%`
			: ''}
`;
