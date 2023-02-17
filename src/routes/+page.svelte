<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import { slide } from "svelte/transition";
    // Uses linter.mjs
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { minify } from "terser";

    let auto = true;
    let errorMessage = "";
    let codeInput = "";
    let codeOutput = "";
    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let toggleBookmarklet = false;

    const minification = async (str: string) => {
        const result = await minify(str, {});
        return result.code;
    };
    const result = () => {
        return minification(codeInput)
            .then((result) => {
                errorMessage = "";
                codeOutput = "javascript:!function(){" + result + "}();";
                return;
            })
            .catch((err) => {
                codeOutput = "";
                return (errorMessage = err);
            });
    };

    const config = {
        // eslint configuration
        parserOptions: {
            ecmaVersion: 2019,
            sourceType: "module",
        },
        env: {
            browser: true,
            node: true,
        },
        rules: {
            semi: ["warn", "always"],
            "valid-typeof": ["error", "always"],
            "no-unused-vars": ["error", "always"],
            "no-unreachable": ["error", "always"],
            "no-dupe-args": ["error", "always"],
            "no-dupe-else-if": ["error", "always"],
            "no-console": ["warn", "always"],
        },
    };
    // function storeAutoRun() {
    // 	auto = !auto;
    // 	localStorage.setItem('autoProcess', auto.toString());
    // }

    // function manualMinify() {
    // 	if (codeIn.length > 0) server('minify');
    // }
    // function manualBeautify() {
    // 	if (codeIn.length > 0) server('beautify');
    // }

    // if (browser) {
    // 	localStorage.autoProcess === 'false' ? (auto = false) : (auto = true);
    // }

    // // Allow code to process when auto is checked
    // $: if (auto && codeIn.length > 0) {
    // 	server(processType);
    // } else if (auto && codeIn.length === 0) {
    // 	defaultValues();
    // }
</script>

<h1>Welcome to Make Bookmarklets</h1>

<CodeMirror
    bind:value={codeInput}
    lang={javascript()}
    theme={oneDark}
    extensions={[
        javascript(),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config)),
    ]}
/>

{#if errorMessage !== ""}
    <div class="error-message" in:slide out:slide>
        <span>{errorMessage}</span>
    </div>
{/if}

<label for="name">Name your Bookmarklet</label>
<input type="text" id="name" bind:value={bookmarkletName} />

<div class="buttons">
    <button type="button" on:click={result}>Create Bookmarklet</button>
    <button
        type="button"
        on:click={() => {
            codeOutput = "";
            codeInput = "";
            errorMessage = "";
        }}>Reset</button
    >
</div>

{#if codeOutput !== ""}
    <a href={codeOutput}>{bookmarkletName}</a>
    <button
        type="button"
        on:click={() => (toggleBookmarklet = !toggleBookmarklet)}
        class="button-toggle-bookmarklet"
        >{`${toggleBookmarklet ? "Hide" : "Show"} Bookmarklet`}</button
    >
{/if}

{#if toggleBookmarklet && codeOutput !== ""}
    <textarea name="output" id="output" value={codeOutput} />
{/if}

<style lang="scss">
    .error-message {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        width: 100%;
        color: red;
        background-color: pink;
    }
</style>
