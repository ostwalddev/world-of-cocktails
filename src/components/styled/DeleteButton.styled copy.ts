import styled from 'styled-components';

export const DeleteButton = styled.button<{saved?: boolean; expanded?: boolean; top?: string}>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0.5%;
	right: 1%;
	width: 2.5em;
	height: 2.5em;
	padding: 0;
	border: none;
	border-radius: 400px;
	background-color: #2d2826;
	color: white;
	font-size: 0.5em;
	font-weight: 700;
	line-height: 1;
	text-align: center;
	text-transform: uppercase;
	white-space: normal;
	cursor: pointer;
	transition: outline-color 150ms ease, transform 100ms ease;
	outline: 2px solid transparent;
	outline-offset: 1px;

	&:hover:not(:disabled),
	&:focus-visible {
		outline-color: #f7dda4;
	}

	&:active:not(:disabled) {
		transform: scale(0.94);
	}

	&:disabled {
		cursor: default;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;
