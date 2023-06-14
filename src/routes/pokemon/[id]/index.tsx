import { component$ } from '@builder.io/qwik';
import { useLocation, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '../../../components/pokemons/pokemo-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	const id = Number(params.id);

	if (isNaN(id) || id < 0 || id > 1010) redirect(303, '/');

	return id;
});

export default component$(() => {
	const loc = useLocation();

	return (
		<>
			Pokemon - {loc.params.id}
			<PokemonImage id={+loc.params.id} />
		</>
	);
});
