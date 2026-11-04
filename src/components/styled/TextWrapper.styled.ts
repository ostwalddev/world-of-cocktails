import {motion} from 'framer-motion';
import styled from 'styled-components';

export const TextWrapper = styled(motion.div)`
	max-height: 47%;
	min-width: 0;
	margin-top: 3%;
	overflow-x: hidden;
	overflow-y: auto;
	overflow-wrap: anywhere;
	scrollbar-width: thin;
	scrollbar-color: rgba(0, 0, 0, 0.4) transparent;

	&::-webkit-scrollbar {
		width: 5px;
		height: 0;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.4);
	}

	&::-webkit-scrollbar-button {
		display: none;
		width: 0;
		height: 0;
	}
`;
