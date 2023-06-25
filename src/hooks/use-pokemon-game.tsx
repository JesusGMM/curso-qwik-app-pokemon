import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonContext } from '~/context';

export const usePokemonGame = () => {
	const pokemonGame = useContext(PokemonContext);

	const changePokemonId = $((value: number) => {
		if (pokemonGame.pokemonId + value <= 0) return;
		pokemonGame.pokemonId += value;
	});

	const toggleFromBack = $(() => {
		pokemonGame.backImage = !pokemonGame.backImage;
	});

	const toggleVisible = $(() => {
		pokemonGame.isVisible = !pokemonGame.isVisible;
	});

	return {
		pokemonId: useComputed$(() => pokemonGame.pokemonId),
		backImage: useComputed$(() => pokemonGame.backImage),
		isVisible: useComputed$(() => pokemonGame.isVisible),

		nextPokemon: $(() => changePokemonId(+1)),
		prevPokemon: $(() => changePokemonId(-1)),

		toggleFromBack,
		toggleVisible,
	};
};
