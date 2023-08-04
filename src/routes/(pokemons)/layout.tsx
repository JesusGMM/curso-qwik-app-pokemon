import { Slot, component$ } from '@builder.io/qwik';
import { PokemonProvider } from '~/context';
import NavBar from '~/components/shared/navbar/navbar';

export default component$(() => {
	return (
		<PokemonProvider>
			<NavBar />
			<main class='flex flex-col items-center justify-center'>
				<Slot />
			</main>
		</PokemonProvider>
	);
});
