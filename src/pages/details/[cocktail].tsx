import {nanoid} from 'nanoid';
import Head from 'next/head';
import Image from 'next/legacy/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import {PageWrapper} from '../../components/styled/PageWrapper.styled';
import {Wrapper} from '../../components/styled/Wrapper.styled';
import cocktailsStore from '../../hooks/cocktailsStore';
import useStore from '../../hooks/useStore';

const DetailsPage = styled(PageWrapper)`
	width: calc(100% - 3rem);
	margin: 0 auto;
	padding: 0;
	overflow-wrap: anywhere;

	> h3 {
		font-size: 1.755em;
	}

	@media (orientation: landscape) {
		max-width: 50vw;
	}
`;

const StyledImage = styled(Image)`
	border-radius: 0.45rem;
`;

const Ingredients = styled(Wrapper)`
	flex-wrap: wrap;
	margin-left: 0;
	margin-right: 0;
	row-gap: 1rem;
`;

const Details = () => {
	const cocktails = useStore(cocktailsStore, state => state.cocktails);
	const router = useRouter();
	const cocktailID = router.query.cocktail;
	const cocktail = cocktails?.find(cocktail => cocktail.id === cocktailID);

	if (!cocktail)
		return (
			<Layout>
				<p>Cocktail not found.</p>
				<Link href="/cocktails">Back to cocktails</Link>
			</Layout>
		);
	return (
		<Layout>
			<Head>
				<title key="title">My Bar</title>
				<meta key="description" name="description" content="About" />
			</Head>
			<DetailsPage>
				<h3>{cocktail?.name}</h3>
				<StyledImage
					src={cocktail?.image}
					alt={cocktail?.name}
					width={100}
					height={100}
					layout="responsive"
					objectFit="contain"
					sizes="(orientation: landscape) 50vw, 100vw"
				></StyledImage>
				<Ingredients>
					<div>
						<h4>Ingredients:</h4>
						{cocktail?.ingredients.names.map(name => {
							return <p key={nanoid()}>{name}</p>;
						})}
					</div>
					<div>
						<h4>Measurements:</h4>
						{cocktail?.ingredients.measurements.map(measurement => {
							return <p key={nanoid()}>{measurement}</p>;
						})}
					</div>
				</Ingredients>
				<h4>Details:</h4>
				<p>{cocktail?.instructions}</p>
				<br />
				<Link href="/cocktails">Back to cocktails</Link>
			</DetailsPage>
		</Layout>
	);
};

export default Details;
