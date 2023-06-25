import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemo-image';

import { getSmallPokemons } from '~/helpers/get-small-pokemons';

import type { SmallPokemon } from '~/interfaces';

export const useListPokemon = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
	// const offset = Number(query.get('offset') || '0');
	// if (isNaN(offset) || offset < 0 || offset > 1010) redirect(303, pathname);
	// const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${30}&offset=${offset}`);
	// const data = (await resp.json()) as PokemonListResponse;
	// return data.results;

	const offset = Number(query.get('offset') || '0');
	if (isNaN(offset)) redirect(301, pathname);
	if (offset < 0) redirect(301, pathname);

	return getSmallPokemons(offset);
});

export default component$(() => {
	const pokemonList = useListPokemon();
	const location = useLocation();

	const offset = useComputed$(() => {
		const dato = Number(location.url.searchParams.get('offset'));
		return isNaN(dato) || dato < 0 ? 0 : dato;
	});

	return (
		<>
			<div class='flex flex-col'>
				<span class='mt-5 text-2xl'>Listado de pokemons</span>
				<span class='text-2xl'>Cantidad actual: {offset.value + 18} </span>
				<span class='text-2xl'>Cargando.. {location.isNavigating ? 'si' : 'no'}</span>
			</div>

			<div class='mt-10'>
				<Link href={`/pokemons/list-ssr/?offset=${offset.value - 18}`} class='btn btn-primary mr-3'>
					Anteriores
				</Link>
				<Link href={`/pokemons/list-ssr/?offset=${offset.value + 18}`} class='btn btn-primary mr-3'>
					Siguientes
				</Link>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{pokemonList.value.map(({ name, id }) => (
					<div key={id} class='m-5 flex flex-col justify-center items-center'>
						<PokemonImage id={id} />
						<span class='capitalize'>{name}</span>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Servidor',
};
