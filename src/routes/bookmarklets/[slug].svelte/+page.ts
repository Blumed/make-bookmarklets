// import { error } from '@sveltejs/kit';

// /** @type {import('./$types').PageLoad} */
// export function load({ params }) {
// 	if (params.slug === 'bookmarklets/hello-world') {
// 		return {
// 			title: 'Hello world!',
// 			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
// 		};
// 	}

// 	error(404, 'Not found');
// }

// export const prerender = true;

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch('../bookmarklets.json');
	return await res.json();
}