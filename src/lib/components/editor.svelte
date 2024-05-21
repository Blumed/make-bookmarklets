<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { slide } from "svelte/transition";
    import { minify } from "terser";

    export let codeEditor = "";

    let errorMessage = "";
    let gistMultipleFiles = false;
    let gistValid = true;
    let gistErrorMessage: null | string = null;
    let gistFiles: null | any[] = null;
    let gistEditorMessage = "";
    let selectedGist: number | string = "";
    let codeInputGist = "";
    let codeOutput = "";
    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let gistUrl = "";
    let toggleBookmarklet = false;
    let toggleExamples = false;
    let toggleSnippets = false;
    let toggleGists = false;
    let toggleOptions = false;
    let clickedMobileInstructions = false;
    let files: any;

    async function minification(str: string) {
        const result = await minify(str, {});
        return result.code;
    }

    function result() {
        if (codeInputGist !== "") {
            return minification(codeInputGist)
                .then((result) => {
                    errorMessage = "";
                    if (result === "") {
                        errorMessage =
                            "Sorry something went wrong creating your gist bookmarklet 😅";
                    } else {
                        codeOutput =
                            "javascript:(function(){" + result + "}());";
                    }

                    return;
                })
                .catch((err) => {
                    codeOutput = "";
                    return (errorMessage = err);
                });
        }

        return minification(codeEditor)
            .then((result) => {
                errorMessage = "";
                if (result === "") {
                    errorMessage = "Put some code in there!";
                } else {
                    codeOutput = "javascript:(function(){" + result + "}());";
                }
                return;
            })
            .catch((err) => {
                codeOutput = "";
                return (errorMessage = err);
            });
    }

    function reset() {
        codeOutput = "";
        codeEditor = "";
        errorMessage = "";
        codeInputGist = "";
        gistUrl = "";
        selectedGist = "";
        gistEditorMessage = "";
        clickedMobileInstructions = false;
    }

    $: if (codeEditor === "") reset();
    $: if (codeEditor !== "" && errorMessage === "Put some code in there!")
        errorMessage = "";
    $: codeEditor = codeEditor;
    $: if (gistUrl === "" && !gistValid) gistValid = true;
    gistErrorMessage = null;

    $: if (gistUrl === "") gistMultipleFiles = false;
    $: selectedGist, selectedGist !== "" && createGistBookmarklet();

    // Code merrior config
    const config = {
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
</script>

<CodeMirror
    bind:value={codeEditor}
    lang={javascript()}
    theme={oneDark}
    extensions={[
        javascript(),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config)),
    ]}
/>

{#if errorMessage !== ""}
    <div
        class={`editor-drawer error-message ${codeInputGist && "gist-message"}`}
        in:slide
        out:slide
    >
        <span>{errorMessage}</span>
    </div>
{/if}

<div class="code-input-controls">
    <div class="buttons">
        <button
            type="button"
            class="button button-create fill-white"
            on:click={result}
            >{codeOutput === "" ? "Create" : "Update"} Bookmarklet</button
        >
        <button
            type="button"
            class="button button-reset fill-white"
            on:click={reset}>Reset</button
        >
        {#if codeOutput !== ""}
            <a
                href={codeOutput}
                class="button button-run-code fill-blue mobile-only">Run Code</a
            >
        {/if}
    </div>
</div>

{#if codeOutput !== ""}
    <div class="code-output-controls" in:slide out:slide>
        <a
            role="button"
            href={codeOutput}
            class="button button-run-code fill-blue desktop-only">Run Code</a
        >
        <button
            type="button"
            class="button button-toggle-code fill-white desktop-only"
            on:click={() => (toggleBookmarklet = !toggleBookmarklet)}
            >{`${toggleBookmarklet ? "Hide" : "Show"} Code`}
        </button>
        <div class="group-bookmarklet-output">
            <a
                role="button"
                href={codeOutput}
                on:click={(e) => e.preventDefault()}
                class="button button-bookmarklet">{bookmarkletName}</a
            >
            <div class="inline-field-group desktop-only">
                <label for="name">Name your Bookmarklet</label>
                <input
                    type="text"
                    id="name"
                    class="input"
                    bind:value={bookmarkletName}
                />
            </div>
        </div>

        {#if toggleBookmarklet && codeOutput !== ""}
            <div
                class="inline-field-group output-code-fields desktop-only"
                in:slide
                out:slide
            >
                <input
                    type="text"
                    class="input"
                    name="output"
                    id="output"
                    value={codeOutput}
                />
                <button
                    type="button"
                    class="button-copy"
                    in:slide
                    on:click={() => navigator.clipboard.writeText(codeOutput)}
                    >Copy</button
                >
            </div>
        {/if}

        <div class="inline-field-group output-code-fields mobile-only">
            <label for="output">Bookmarklet Url</label>
            <input
                type="text"
                class="input"
                name="output"
                id="output"
                value={codeOutput}
            />
            <button
                type="button"
                class="button-copy"
                in:slide
                on:click={() => navigator.clipboard.writeText(codeOutput)}
                >Copy</button
            >
        </div>
        <!-- <button
        type="button"
        class="button fill-white button-mobile-instructions mobile-only"
        on:click={() => scrollToMobileInstructions()}
        >Save bookmarklets on mobile?</button
    > -->
    </div>
{/if}

<style lang="scss">
     .code-input-controls {
        margin-top: 50px;
        margin-bottom: 30px;
        .buttons {
            display: flex;
        }
        .button {
            height: 50px;
        }
    }
    .gist-message {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 2px solid white;
        color: var(--color-clay);
        background-color: #282c34;
        box-shadow: 12px 12px 0 0 #fff;
    }
    .gist-message + .editor-wrapper:before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgb(255, 255, 255, 0.1);
        z-index: 1;
        pointer-events: none;
    }
    .editor-wrapper {
        min-height: 230px;
        position: relative;
        z-index: 1;
        box-shadow: 12px 12px 0 0 #fff;
        background-color: #282c34;
    }

    :global(.cm-scroller) {
        min-height: 200px;
    }
    .external-files {
        display: flex;
    }
    .editor-drawer {
        padding: 1rem;
        box-shadow: 12px 12px 0 0 #fff;
        position: relative;
        z-index: 2;
    }
    .error-message {
        height: 100%;
        display: flex;
        align-items: center;
        color: var(--color-dark-red);
        background-color: pink;
    }
    .drawer-options {
        background-color: var(--color-turquoise);
    }
    .code-output-controls {
        display: flex;
        flex-wrap: wrap;
        position: relative;
    }
    .inline-field-group {
        display: flex;
        align-items: center;
        margin-left: auto;
        order: 2;
        #name {
            min-width: 167px;
        }
    }
    .button-upload {
        margin-left: auto;
    }
    .button-upload,
    .button-download {
        display: flex;
        align-items: center;
    }
    .button-download img {
        transform: rotate(180deg);
    }
    .button.button-bookmarklet {
        margin-bottom: 30px;
        background-color: #f78da7;
        line-height: 20px;
    }
    .button-toggle-code {
        height: 50px;
    }
    .button-run-code {
        height: 50px;
        line-height: 17px;
        &.desktop-only {
            margin-right: 20px;
        }
    }
    .button-copy {
        position: absolute;
        cursor: pointer;
        right: 0;
        color: var(--color-black);
        height: 38.5px;
        top: 20px;
        padding-inline: 10px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border: 2px solid var(--color-black);
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        background-color: var(--color-clay);
        transition: var(--global-transition);
        &:hover {
            background-color: var(--color-turquoise);
        }
    }
    .output-code-fields {
        width: calc(100% - 415px);
        margin: 0;
        position: absolute;
        left: 0;
        max-width: 415px;
        bottom: 0;
    }
    #output {
        width: 100%;
        padding: 10px;
        border: 2px solid var(--color-black);
        border-radius: 0.25rem;
        display: flex;
        margin-top: 20px;
        align-self: center;
        order: 3;
        padding-right: 65px;
    }
    .button-reset {
        &:hover {
            background-color: var(--color-pink);
        }
    }

    .group-bookmarklet-output {
        display: flex;
        flex-direction: column;
        margin-left: auto;
    }

    @media (max-width: 768px) {
        .code-input-controls {
            margin-block: 20px;
            .buttons {
                display: flex;
                flex-wrap: wrap;
            }
        }
        .button-create {
            margin-top: 20px;
        }
        .button-reset {
            margin-right: 20px;
        }
        .button-upload {
            width: fit-content;
            margin-left: 0;
            display: inline-flex;
            margin-top: 20px;
            margin-right: 20px;
        }
        .button-download {
            margin-right: 20px;
        }
        :global(.button-create) {
            margin-right: 20px;
        }
        .button-copy {
            top: 23px;
        }
        .button-mobile-instructions {
            order: 2;
            line-height: 22px;
        }
        .button-bookmarklet {
            display: none;
            margin-right: 0;
        }
        :global(.button.button-toggle-code) {
            order: 2;
            margin-top: 0;
        }
        #output {
            width: 100%;
        }
        .inline-field-group {
            position: relative;
            flex-direction: column;
            width: 100%;
            margin-right: 0;
            margin-bottom: 20px;
            align-items: flex-start;
            order: 1;
            label {
                display: block;
                margin-bottom: 3px;
            }
            .input {
                margin-top: 0 !important;
            }
            #name {
                min-width: inherit;
                width: -moz-available;
                width: -webkit-fill-available;
                width: fill-available;
            }
        }
    }
</style>