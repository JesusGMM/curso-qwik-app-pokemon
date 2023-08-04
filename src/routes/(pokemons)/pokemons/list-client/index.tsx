import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemo-image';
import { PokemonListContext } from '~/context';

import { getSmallPokemons } from '~/helpers/get-small-pokemons';

export default component$(() => {
	const pokemonState = useContext(PokemonListContext);

	// Solo el client
	// useVisibleTask$(async ({ track }) => {
	// 	track(() => pokemonState.currentPage);

	// 	const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
	// 	pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
	// });

	useTask$(async ({ track }) => {
		track(() => pokemonState.currentPage);

		const pokemons = await getSmallPokemons(pokemonState.currentPage * 48, 48);
		pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

		pokemonState.isLoading = false;
	});

	useOnDocument(
		'scroll',
		$(() => {
			const maxScroll = document.body.scrollHeight;
			const currentScroll = window.scrollY + window.innerHeight;

			if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading && pokemonState.currentPage < 26) {
				pokemonState.isLoading = true;
				pokemonState.currentPage++;
			}
		})
	);

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Página actual: {pokemonState.currentPage}</span>
				<span>Está cargando: {pokemonState.isLoading ? 'Si' : 'No'}</span>
			</div>

			<div class='mt-10'>
				{/* <button onClick$={() => pokemonState.currentPage--} class='btn btn-primary mr-2'>
					Anteriores
				</button> */}
				<button
					onClick$={() => {
						if (pokemonState.currentPage < 26) pokemonState.currentPage++;
					}}
					class='btn btn-primary'
				>
					Siguientes
				</button>
			</div>

			<div class='grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4'>
				{pokemonState.pokemons.map(({ name, id }) => (
					<div key={name} class='flex flex-col justify-center items-center'>
						<PokemonImage id={id} />
						<span class='capitalize'>{name}</span>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Lista Client',
};
