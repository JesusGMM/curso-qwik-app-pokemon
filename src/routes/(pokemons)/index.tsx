import { $, component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../../components/pokemons/pokemo-image';
import { useNavigate } from '@builder.io/qwik-city';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {
	const nav = useNavigate();

	const {
		backImage,
		isVisible,
		toggleFromBack: toogleFromBack,
		nextPokemon,
		pokemonId,
		prevPokemon,
		toggleVisible: tooggleVisible,
	} = usePokemonGame();

	const goToPokemon = $(async () => {
		await nav('pokemon/' + pokemonId.value);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-7xl'>{pokemonId.value}</span>

			<div onClick$={goToPokemon}>
				<PokemonImage id={pokemonId.value} image={backImage.value} mostrar={isVisible.value} />
			</div>

			<div class='mt-3'>
				<button class='btn btn-primary mr-2' onClick$={prevPokemon}>
					Anterior
				</button>
				<button class='btn btn-primary mr-2' onClick$={nextPokemon}>
					Siguiente
				</button>
				<button class='btn btn-primary mr-2' onClick$={toogleFromBack}>
					Voltear
				</button>
				<button class='btn btn-primary' onClick$={tooggleVisible}>
					{isVisible.value ? 'Mostrar' : 'Ocultar'}
				</button>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Pokemon Qwik',
	meta: [
		{
			name: 'Jesus MArtinez',
			content: 'Esta es pokemon con qwick',
		},
	],
};
