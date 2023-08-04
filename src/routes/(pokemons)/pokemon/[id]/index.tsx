import { component$ } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemo-image';

import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id) || id < 0 || id > 1010) redirect(303, '/');

	return id;
});

export default component$(() => {
	const loc = useLocation();
	const { isVisible, backImage, toggleFromBack: toogleFromBack, toggleVisible: tooggleVisible } = usePokemonGame();

	return (
		<>
			Pokemon - {loc.params.id}
			<PokemonImage id={+loc.params.id} mostrar={isVisible.value} image={backImage.value} />
			<div class='mt-2'>
				<button onClick$={toogleFromBack} class='btn btn-primary mr-2'>
					Voltear
				</button>
				<button onClick$={tooggleVisible} class='btn btn-primary'>
					{isVisible.value ? 'Mostrar' : 'Ocultar'}
				</button>
			</div>
		</>
	);
});
