import {useLayoutEffect, useRef} from 'react';
import styled from 'styled-components';

import {StyledTitle} from './styled/Title.styled';
import {TitleWrapper} from './styled/TitleWrapper.styled';

const HeadingSpace = styled(TitleWrapper)`
	padding-right: 1.25rem;
	min-width: 0;
`;

const Heading = styled(StyledTitle)`
	display: flex;
	flex-wrap: wrap;
	column-gap: 0.25em;
	white-space: normal;
	word-break: normal;
	overflow-wrap: normal;
	hyphens: none;

	> span {
		flex-shrink: 0;
		white-space: nowrap;
	}
`;

export default function IngredientTitle({name, expanded}: {name: string; expanded: boolean}) {
	const titleRef = useRef<HTMLHeadingElement>(null);

	useLayoutEffect(() => {
		const title = titleRef.current;
		if (!title) return;
		let active = true;
		const fit = () => {
			if (!active) return;
			title.style.removeProperty('font-size');
			let size = Number.parseFloat(getComputedStyle(title).fontSize);
			const minimumSize = expanded ? 16 : 12;
			const words = Array.from(title.children) as HTMLElement[];
			// Wrapping handles the full title; only an oversized individual word needs shrinking.
			while (words.some(word => word.offsetWidth > title.clientWidth) && size > minimumSize) {
				size = Math.max(minimumSize, size - 0.5);
				title.style.fontSize = `${size}px`;
			}
		};
		fit();
		const observer = new ResizeObserver(fit);
		if (title.parentElement) observer.observe(title.parentElement);
		void document.fonts.ready.then(fit);
		return () => {
			active = false;
			observer.disconnect();
		};
	}, [name, expanded]);

	return (
		<HeadingSpace>
			<Heading ref={titleRef} layout="position" expanded={expanded || undefined}>
				{name.split(/\s+/).map((word, index) => (
					<span key={index}>{word}</span>
				))}
			</Heading>
		</HeadingSpace>
	);
}
