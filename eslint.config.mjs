import {defineConfig, globalIgnores} from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
	...nextVitals,
	...nextTypescript,
	{
		rules: {
			// Preserve the original components and hydration helper during conversion.
			'react-hooks/static-components': 'off',
			'react-hooks/set-state-in-effect': 'off',
			'react-hooks/purity': 'off',
			'react-hooks/immutability': 'off',
		},
	},
	globalIgnores(['.next/**', 'node_modules/**', 'next-env.d.ts']),
]);
