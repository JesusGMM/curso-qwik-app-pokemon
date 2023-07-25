import { component$, useComputed$, useSignal, $, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemo-image';
import { Modal } from '~/components/shared';

import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { getChatGptPokemon } from '~/helpers/get-chat-gpt-response';

import type { SmallPokemon } from '~/interfaces';

export const useListPokemon = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
	const offset = Number(query.get('offset') || '0');
	if (isNaN(offset)) redirect(301, pathname);
	if (offset < 0) redirect(301, pathname);

	return getSmallPokemons(offset);
});

export default component$(() => {
	const modalVisible = useSignal(false);
	const modalPokemon = useStore({
		id: 1,
		name: '',
	});
	const pokemonList = useListPokemon();
	const location = useLocation();

	const offset = useComputed$(() => {
		const dato = Number(location.url.searchParams.get('offset'));
		return isNaN(dato) || dato < 0 ? 0 : dato;
	});

	const chatGptPokemonFact = useSignal('');
	// Modal functions
	const showModal = $((id: number, name: string) => {
		modalPokemon.id = id;
		modalPokemon.name = name;
		modalVisible.value = true;
	});

	const closeModal = $(() => {
		modalVisible.value = false;
	});

	// TODO: Probar asycn
	useVisibleTask$(({ track }) => {
		track(() => modalPokemon.name);
		chatGptPokemonFact.value = '';
		if (modalPokemon.name.length > 0) {
			getChatGptPokemon(modalPokemon.name).then((resp) => (chatGptPokemonFact.value = resp));
		}
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
					<div key={id} class='m-5 flex flex-col justify-center items-center' onClick$={() => showModal(id, name)}>
						<PokemonImage id={id} />
						<span class='capitalize'>{name}</span>
					</div>
				))}
			</div>

			<Modal persistent showModal={modalVisible.value} closeFn={closeModal}>
				<div q:slot='title'>{modalPokemon.name}</div>

				<div q:slot='content' class='flex flex-col justify-center items-center'>
					<PokemonImage id={modalPokemon.id} />

					<span class='mt-3'>{chatGptPokemonFact.value === '' ? 'Preguntando a ChatGPT' : chatGptPokemonFact}</span>
				</div>
			</Modal>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Servidor',
};
