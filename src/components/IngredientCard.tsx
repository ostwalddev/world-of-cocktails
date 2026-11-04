import type {Ingredient} from '../types/domain';
import {useSession} from 'next-auth/react';
import Image from 'next/legacy/image';
import styled from 'styled-components';

import ingredientsStore from '../hooks/ingredientsStore';

import {DeleteButton} from './styled/DeleteButton.styled copy';
import {ImageWrapper} from './styled/ImageWrapper.styled';
import {StyledIngredientCard} from './styled/IngredientCard.styled';
import {TextWrapper} from './styled/TextWrapper.styled';
import IngredientTitle from './IngredientTitle';

export default function IngredientCard({
	ingredient,
	isExpanded,
	onToggle,
}: {
	ingredient: Ingredient;
	isExpanded: boolean;
	onToggle: () => void;
}) {
	const savedIngredients = ingredientsStore(state => state.savedIngredients);
	const setSavedIngredients = ingredientsStore(state => state.setSavedIngredients);
	const {data: session} = useSession();

	async function update() {
		const newIngredients = savedIngredients.filter(
			newIngredients => newIngredients !== ingredient
		);
		setSavedIngredients(newIngredients);
		await fetch(`/api/users/${session?.user?.email}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(newIngredients),
		});
	}

	const StyledImage = styled(Image)`
		border-radius: 0.55em;
		cursor: pointer;
	`;

	return (
		<StyledIngredientCard
			onClick={onToggle}
			key={ingredient._id}
			color={ingredient.color}
			expanded={isExpanded ? true : undefined}
			transition={{layout: {duration: 1, type: 'spring'}}}
			layout
		>
			<IngredientTitle name={ingredient.name} expanded={isExpanded} />
			<DeleteButton
				title="remove ingredient"
				aria-label={`Remove ${ingredient.name} from your bar`}
				onClick={event => {
					event.stopPropagation();
					void update();
				}}
			>
				<svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
					<path
						d="M4 4L12 12M12 4L4 12"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</DeleteButton>
			<ImageWrapper>
				<StyledImage
					layout="responsive"
					src={ingredient.image}
					alt={ingredient.name}
					width={100}
					height={147}
				/>
			</ImageWrapper>
			{isExpanded ? (
				<TextWrapper
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 1}}
				>
					<p>{ingredient.description}</p>
				</TextWrapper>
			) : undefined}
		</StyledIngredientCard>
	);
}
