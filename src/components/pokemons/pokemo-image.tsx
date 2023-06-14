import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export const PokemonImage = component$((props: { id: number; image?: boolean; mostrar?: boolean }) => {
	const cargando = useSignal(true);

	useTask$(({ track }) => {
		track(() => props.id);
		cargando.value = true;
	});

	return (
		<div
			class='bg-purple-600 rounded mt-3 flex items-center justify-center'
			style={{
				height: '96px',
				width: '96px',
			}}
		>
			{cargando.value && <span>Cargando...</span>}
			<img
				class={['object-cover transition-all', { hidden: cargando.value, 'brightness-0': props.mostrar }]}
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/
				${(props.image ? 'back/' : '') + props.id}.png`}
				alt='Pokemon'
				height={96}
				width={96}
				onLoad$={() => (cargando.value = false)}
			/>
		</div>
	);
});
