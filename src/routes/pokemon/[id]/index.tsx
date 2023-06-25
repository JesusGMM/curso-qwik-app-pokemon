import { component$, useContext } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemo-image';
import { PokemonContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id) || id < 0 || id > 1010) redirect(303, '/');

	return id;
});

export default component$(() => {
	const loc = useLocation();
	const pokemonGame = useContext(PokemonContext);

	return (
		<>
			Pokemon - {loc.params.id}
			<PokemonImage id={+loc.params.id} mostrar={pokemonGame.isVisible} image={pokemonGame.backImage} />
		</>
	);
});
