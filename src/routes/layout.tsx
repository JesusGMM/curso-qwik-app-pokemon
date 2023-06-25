import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import NavBar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonProvider } from '~/context';

export default component$(() => {
	useStyles$(styles);

	return (
		<PokemonProvider>
			<NavBar />
			<main class='flex flex-col items-center justify-center'>
				<Slot />
			</main>
		</PokemonProvider>
	);
});
