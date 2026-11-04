import {useLayoutEffect, useRef, type ReactNode} from 'react';

import {StyledIngredientGrid} from './styled/IngredientCard.styled';

export default function IngredientGrid({children}: {children: ReactNode}) {
	const gridRef = useRef<HTMLUListElement>(null);

	const positions = useRef(new Map<HTMLElement, {left: number; top: number}>());
	const animations = useRef(new Map<HTMLElement, Animation>());

	useLayoutEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		// Use layout dimensions, unaffected by the cards' motion transforms.
		const updateSpan = (card: HTMLElement) => {
			card.style.gridRowEnd = `span ${Math.ceil(card.offsetHeight + 15)}`;
		};
		const animateWrappingCards = () => {
			const nextPositions = new Map<HTMLElement, {left: number; top: number}>();
			const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			for (const child of Array.from(grid.children)) {
				if (!(child instanceof HTMLElement) || child.tagName !== 'LI') continue;
				const next = {left: child.offsetLeft, top: child.offsetTop};
				const previous = positions.current.get(child);
				nextPositions.set(child, next);
				if (!previous || reducedMotion) continue;

				const wrapsForward = next.left < previous.left && next.top > previous.top;
				const wrapsBackward = next.left > previous.left && next.top < previous.top;
				if (!wrapsForward && !wrapsBackward) continue;

				animations.current.get(child)?.cancel();
				const opacity = getComputedStyle(child).opacity;
				const exitX = wrapsForward ? grid.clientWidth : -child.offsetWidth;
				const entryX = wrapsForward ? -child.offsetWidth : grid.clientWidth;
				const animation = child.animate(
					[
						{transform: `translate(${previous.left - next.left}px, ${previous.top - next.top}px)`, opacity, offset: 0},
						{transform: `translate(${exitX - next.left}px, ${previous.top - next.top}px)`, opacity: 0, offset: 0.45},
						{transform: `translate(${entryX - next.left}px, 0)`, opacity: 0, offset: 0.5},
						{transform: 'translate(0, 0)', opacity, offset: 1},
					],
					{duration: 1000, easing: 'ease-in-out'}
				);
				animations.current.set(child, animation);
			}
			positions.current = nextPositions;
		};

		const observer = new ResizeObserver(entries => {
			for (const entry of entries) updateSpan(entry.target as HTMLElement);
			animateWrappingCards();
		});

		for (const child of Array.from(grid.children)) {
			if (child instanceof HTMLElement && child.tagName === 'LI') {
				updateSpan(child);
				observer.observe(child);
			}
		}

		animateWrappingCards();

		return () => observer.disconnect();
	}, [children]);

	return <StyledIngredientGrid ref={gridRef}>{children}</StyledIngredientGrid>;
}
