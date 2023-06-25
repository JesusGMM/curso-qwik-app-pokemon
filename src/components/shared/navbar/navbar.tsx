import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../../icons/qwik';
import styles from './navbar.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<navbar class={styles.header}>
			<div class={['container', styles.wrapper]}>
				<div class={styles.logo}>
					<Link href='/' title='qwik'>
						<QwikLogo height={50} />
					</Link>
				</div>
				<ul>
					<li>
						<Link href='/counter'>Counter Hook</Link>
					</li>
					<li>
						<Link href='/pokemons/list-ssr/'>Lista SSR</Link>
					</li>
					<li>
						<Link href='/pokemons/list-client/'>Lista Client</Link>
					</li>
				</ul>
			</div>
		</navbar>
	);
});
