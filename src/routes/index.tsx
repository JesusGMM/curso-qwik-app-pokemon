import { $, component$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemo-image';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonContext } from '~/context';

export default component$(() => {
	const nav = useNavigate();

	// useSignal VALORES PRIMIVOS
	// const pokemonId = useSignal(1);
	// const voltear = useSignal(false);
	// const mostrar = useSignal(false);

	const pokemonGame = useContext(PokemonContext);

	const buscarPokemon = $((valor: number) => {
		if (pokemonGame.pokemonId + valor <= 0) return;
		pokemonGame.pokemonId += valor;
	});

	const goToPokemon = $(async () => {
		await nav('pokemon/' + pokemonGame.pokemonId);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-7xl'>{pokemonGame.pokemonId}</span>

			<div onClick$={goToPokemon}>
				<PokemonImage id={pokemonGame.pokemonId} image={pokemonGame.backImage} mostrar={pokemonGame.isVisible} />
			</div>

			<div class='mt-3'>
				<button class='btn btn-primary mr-2' onClick$={() => buscarPokemon(-1)}>
					Anterior
				</button>
				<button class='btn btn-primary mr-2' onClick$={() => buscarPokemon(1)}>
					Siguiente
				</button>
				<button class='btn btn-primary mr-2' onClick$={() => (pokemonGame.backImage = !pokemonGame.backImage)}>
					Voltear
				</button>
				<button class='btn btn-primary' onClick$={() => (pokemonGame.isVisible = !pokemonGame.isVisible)}>
					{pokemonGame.isVisible ? 'Mostrar' : 'Ocultar'}
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
