import type {StoreApi, UseBoundStore} from 'zustand';
import {useState, useEffect} from 'react';

const useStore = <State, Result>(
	store: UseBoundStore<StoreApi<State>>,
	callback: (state: State) => Result
) => {
	const result = store(callback);
	const [data, setData] = useState<Result>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

export default useStore;
