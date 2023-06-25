import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonListState, PokemonListContext } from './pokemin-list.context';
import { type PokemonGameState, PokemonContext } from './pokemon.context';

export const PokemonProvider = component$(() => {
	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 1,
		isVisible: false,
		backImage: false,
	});

	const pokemonList = useStore<PokemonListState>({
		currentPage: 1,
		isLoading: false,
		pokemons: [],
	});

	useContextProvider(PokemonContext, pokemonGame);
	useContextProvider(PokemonListContext, pokemonList);

	useVisibleTask$(() => {
		if (localStorage.getItem('pokemon-game')) {
			const data = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
			pokemonGame.backImage = data.backImage ?? true;
			pokemonGame.isVisible = data.isVisible ?? true;
			pokemonGame.pokemonId = data.pokemonId ?? 1;
		}
	});

	useVisibleTask$(({ track }) => {
		track(() => [pokemonGame.pokemonId, pokemonGame.backImage, pokemonGame.isVisible]);

		localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
	});

	return <Slot></Slot>;
});
