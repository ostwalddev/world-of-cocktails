import styled from 'styled-components';

export const StyledButton = styled.button<{saved?: boolean; expanded?: boolean; top?: string}>`
	display: inline-block;
	position: absolute;
	width: 70px;
	height: 10px;
	padding: 5px 5px 18px;
	border: 1px solid;
	border-radius: 400px;
	border-color: white;
	background-color: black;
	color: white;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 2px;
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
	${({saved}) =>
		saved
			? `background-color: hsla(0, 0%, 0%, 0);
	color: black;
	border-color: black;`
			: ''};
	${({expanded}) =>
		expanded
			? `
			top: 5px;
			right: 5px;`
			: `	bottom: 5px;
				right 15.5%`};
`;
