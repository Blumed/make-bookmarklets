import { error } from '@sveltejs/kit';
export const prerender = true;
import { colorPicker } from '$lib/components/code-snippets';

export function load({ params }) {
	if (params.slug === 'color-picker') {
		return {
			title: 'Color Picker',
			copy: 'Build and customize a responsive breakpoint bookmarklet',
			code: colorPicker,
		};
	}

	error(404, 'Not found');
}