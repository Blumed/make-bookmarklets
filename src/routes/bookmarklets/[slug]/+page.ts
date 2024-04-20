import { error } from '@sveltejs/kit';
export const prerender = true;

export function load({ params }) {
	if (params.slug === 'color-picker') {
		return {
			title: 'Color Picker',
			copy: 'Build and customize a responsive breakpoint bookmarklet',
			code: `   document.cE = document.createElement;
			var s = [], div = document.cE('div');
			var text = document.cE('input');
			var col = [0, 0, 0];
			var aE = "attachEvent", oc = "onchange", ok = "onkeyup";
			var uB  = function() {
				var c = text.value.match(/\w\w?/g), n, i;
				for(i in c) {
					s[i].value = col[i] = parseInt(c[i], 16) || 0;
				}
				div.style.backgroundColor = text.value;
			}
			var uC = function(c, val) {
				col[c] = parseInt(val, 10);
				text.value = '#';
				for(var i in col) {
					n = col[i];
					var v = ((n < 16) ? '0' : '') + n.toString(16).toUpperCase();
					text.value += v;
				}
				div.style.backgroundColor = text.value;
			}
			if(!(text.attachEvent)) { aE = "addEventListener"; oc  = "change"; ok = "keyup" }
			text.size = 7;
			text[aE](ok, uB);
			div.appendChild(text);
			div.appendChild(document.cE('br'));
			with(div.style) {
				position = 'fixed';
				padding = top = left = '5px';
				boxShadow = '0 0 5px black';
				backgroundColor = '#000';
			}
			for(var c in ['r','g','b']) { 
				s[c] = document.cE('input'); 
				s[c].type = 'range'; 
				s[c].value = 0;
				s[c].min = 0; 
				s[c].max = 255; 
				s[c].step = 1;
				s[c][aE](oc, (function() { var col = c; return function() { uC(col, this.value); }})()); 
				div.appendChild(s[c]); 
				div.appendChild(document.cE('br'));
			} 
			
			document.body.appendChild(div);`,
		};
	}

	error(404, 'Not found');
}