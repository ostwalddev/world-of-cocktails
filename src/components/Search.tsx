import {useRouter} from 'next/router';

import ingredientsStore from '../hooks/ingredientsStore';

import {SearchBar, SearchContainer, SearchInput} from './styled/Search.styled';

export default function Search({inHeader = false}: {inHeader?: boolean}) {
	const {pathname} = useRouter();
	const placeholder = pathname === '/cocktails' ? 'search cocktails' : 'search ingredients';
	const setSearchItem = ingredientsStore(state => state.setSearchItem);
	const searchItem = ingredientsStore(state => state.searchItem);

	return (
		<SearchBar $inHeader={inHeader}>
			<SearchContainer>
				<SearchInput
					value={searchItem}
					placeholder={placeholder}
					onChange={event => {
						event.preventDefault();
						const search = event.target.value;
						setSearchItem(search);
					}}
					type="search"
					name="search"
					aria-label={placeholder}
				/>
			</SearchContainer>
		</SearchBar>
	);
}
