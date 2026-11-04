import Link from 'next/link';
import styled from 'styled-components';

export const MoreButton = styled(Link)`
	display: flex;
	position: fixed;
	top: 70%;
	right: 7%;
	align-items: center;
	justify-content: center;
	width: min(6rem, 64.5vw);
	aspect-ratio: 1;
	padding: 0.75rem;
	border-radius: 50%;
	background-color: #2d2826;
	color: white;
	font-size: 0.75rem;
	font-weight: 700;
	line-height: 1.3;
	text-align: center;
	text-decoration: none;
	cursor: pointer;

	&:visited {
		color: white;
	}

	&:focus-visible {
		outline: 3px solid currentColor;
		outline-offset: -6px;
	}
`;
