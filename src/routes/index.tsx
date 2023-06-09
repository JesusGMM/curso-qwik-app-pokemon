import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '../components/pokemons/pokemo-image';

export default component$(() => {
	// useSignal VALORES PRIMIVOS
	const pokemonId = useSignal(1);
	const voltear = useSignal(false);
	const mostrar = useSignal(false);

	const buscarPokemon = $((valor: number) => {
		if (pokemonId.value + valor <= 0) return;
		pokemonId.value += valor;
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-7xl'>{pokemonId}</span>

			<PokemonImage id={pokemonId.value} image={voltear.value} mostrar={mostrar.value} />

			<div class='mt-3'>
				<button class='btn btn-primary mr-2' onClick$={() => buscarPokemon(-1)}>
					Anterior
				</button>
				<button class='btn btn-primary mr-2' onClick$={() => buscarPokemon(1)}>
					Siguiente
				</button>
				<button class='btn btn-primary mr-2' onClick$={() => (voltear.value = !voltear.value)}>
					Voltear
				</button>
				<button class='btn btn-primary' onClick$={() => (mostrar.value = !mostrar.value)}>
					{mostrar.value ? 'Mostrar' : 'Ocultar'}
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
