<script lang="ts">
    import Seo from "$lib/components/seo/page-meta.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import { slide } from "svelte/transition";
    import Button from "$lib/components/buttons/button.svelte";
    // Uses linter.mjs
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { minify } from "terser";

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
    };
    const reset = () => {
        codeOutput = "";
        codeInput = "";
        errorMessage = "";
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
    $: if (codeInput === "") reset();
    $: if (codeInput !== "" && errorMessage === "Put some code in there!")
        errorMessage = "";
</script>

<Seo title="Not War" pageCanonicalUrl="/" />
<section class="hero section">
    <div class="container">
        <header>
            <h1><span>Welcome to <br /></span>Make Bookmarklets</h1>
            <p>
                What are bookmarklets? Teeny tiny javascript applications stored
                in a bookmark url. Clicking the bookmark will launch it, so you
                can customize and extend your browsing experience.
            </p>
            <section class="features-section">
                <h2>Features Include:</h2>
                <ul>
                    <li>
                        All javascript created in the editor is wrapped in
                        bookmarklet executable iife for you
                    </li>
                    <li>Javascript linting</li>
                    <li>Multiline cursor</li>
                    <li>Javascript intellisense</li>
                    <li>Code is automatically minified and uglified for you</li>
                </ul>
            </section>
        </header>
        <img
            class="ribbon"
            src="/flat-bookmark.svg"
            alt="Cullan Luther Smiling At You"
        />
    </div>
</section>
<section class="section code-editor">
    <div class="container-small">
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
        <div class="code-input-controls">
            <div class="buttons">
                <Button
                    type="button"
                    class="button-create fill-white"
                    handleClick={result}
                    buttonText="Create Bookmarklet"
                />
                <Button
                    type="button"
                    class="button-reset fill-white"
                    handleClick={reset}
                    buttonText="Reset"
                />
                {#if codeOutput !== ""}
                    <Button
                        href={codeOutput}
                        class="button-bookmarklet"
                        buttonText={bookmarkletName}
                    />
                {/if}
            </div>
        </div>

        {#if codeOutput !== ""}
            <div class="code-output-controls" in:slide out:slide>
                <div class="inline-field-group">
                    <label for="name">Name your Bookmarklet</label>
                    <input
                        type="text"
                        id="name"
                        class="input"
                        bind:value={bookmarkletName}
                    />
                </div>

                <Button
                    type="button"
                    class="button-toggle-code fill-white"
                    handleClick={() => (toggleBookmarklet = !toggleBookmarklet)}
                    buttonText={`${toggleBookmarklet ? "Hide" : "Show"} Code`}
                />
                {#if toggleBookmarklet && codeOutput !== ""}
                    <input
                        type="text"
                        class="input"
                        name="output"
                        id="output"
                        value={codeOutput}
                        in:slide
                    />
                {/if}
            </div>
        {/if}
    </div>
</section>
<section class="section content-section">
    <div class="container">
        <h2>When bookmarklets stop working on specific sites</h2>
        <h3>Sites with Content Security Policies</h3>
        <p>
            A new security feature many large websites are implementing called
            Content Security Policy (CSP). The reason CSP exists is to prevent
            Cross Site Scripting (XSS) attacks by blocking the execution of
            inline styles and scripts. So, bookmarklets won't run on these
            sites. The work around are browser extensions. Browser extensions
            work regardless of CSP for whatever reason. Seems like an odd hole,
            because you can create a local browser extension quickly which is
            not audited by the browser extension team. I am working on a chrome
            extension that will allow you to add and organize your bookmarklets
            and fire them from there.
        </p>
        <h3>Global variable collision</h3>
        <p>
            If you use window to store variables in your bookmarklet it is
            possible that the site uses that variable name already. I recommend
            not using the window object to store objects period. Keep your
            objects scoped to your bookmarklet and do your best to not let them
            leak.
        </p>
        <h3>Reactive elements</h3>
        <p>
            If your script manipulates existing dom elements. Site which use
            javascript frameworks or libraries like react may wipe your changes.
            This is because of the reactive nature of virtual dom (vdom) which
            depending on how components are made might render and rerender
            quickly which means the element you targeted has been destroyed and
            recreated essentially causing your changes to stop working or
            disappear.
        </p>
    </div>
</section>

<style lang="scss">
    .hero {
        // background-color: var(--pink-color);
        height: 400px;
        display: flex;
        align-items: center;
        p {
            // max-width: 70%;
            // margin-inline: auto;
            // margin-block: 0;
            margin-block: 0;
            margin-left: 381px;
            max-width: 55%;
        }
    }
    .container,
    .code-editor {
        position: relative;
        z-index: 1;
    }
    .ribbon {
        position: absolute;
        z-index: -1;
        top: -139px;
        // left: 35px;
        // height: 529px;
        left: 853.1px;
        height: 1029px;
    }
    h1 {
        font-size: 5rem;
        line-height: 76px;
        margin-top: 0;
        margin-bottom: 40px;
        span {
            text-shadow: -1px -1px 0 var(--black-color),
                1px -1px 0 var(--black-color), -1px 1px 0 var(--black-color),
                1px 1px 0 var(--black-color);
            color: white;
            font-size: 5.3rem;
        }
    }
    .features-section {
        margin-inline: auto;
        max-width: 903px;
        h2 {
            margin-bottom: 15px;
        }
        ul {
            padding-left: 23px;
            margin-top: 10px;
            margin-bottom: 0;
        }
    }
    .code-input-controls {
        margin-top: 50px;
        margin-bottom: 30px;
        .buttons {
            display: flex;
        }
    }
    :global(.codemirror-wrapper) {
        box-shadow: 12px 12px 0 0 white;
    }
    :global(.cm-scroller) {
        min-height: 200px;
    }
    .error-message {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 1rem;
        color: var(--dark-red-color);
        background-color: pink;
        box-shadow: 12px 12px 0 0 #ffffff;
    }
    .code-output-controls {
        display: flex;
        flex-wrap: wrap;
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
    :global(.button.button-bookmarklet) {
        margin-left: auto;
    }
    :global(.button.button-toggle-code) {
        margin-left: 0;
        margin-right: 20px;
    }
    #output {
        width: calc(100% - 415px);
        padding: 10px;
        border: 2px solid var(--black-color);
        border-radius: 0.25rem;
        height: 15px;
        display: flex;
        margin-top: 20px;
        align-self: center;
        order: 3;
    }
    .content-section {
        position: relative;
        z-index: 1;
    }
    @media (max-width: 768px) {
        .container {
            position: static;
        }
        .ribbon {
            width: 100%;
            inset: 0;
            object-fit: cover;
            height: 100%;
            overflow: inherit;
        }
        .hero {
            height: auto;
            text-align: left;
            padding-bottom: 0;
            p {
                margin-inline: 0;
                max-width: 100%;
            }
        }
        h1 {
            font-size: 2.4rem;
            line-height: 46px;
            margin-bottom: 20px;
            span {
                letter-spacing: 1.5px;
                font-size: 2.7rem;
            }
        }
        .code-input-controls {
            margin-block: 20px;
            .buttons {
                display: block;
            }
        }
        :global(.button-create) {
            margin-right: 20px;
        }
        :global(.button-reset) {
            margin-right: 20px;
        }
        .inline-field-group {
            flex-direction: column;
            width: 100%;
            margin-right: 0;
            margin-bottom: 20px;
            align-items: flex-start;
            order: 1;
            label {
                margin-bottom: 3px;
            }
            #name {
                min-width: inherit;
                width: -moz-available;
                width: -webkit-fill-available;
                width: fill-available;
            }
        }
        :global(.button-bookmarklet) {
            margin-right: 0;
        }
        :global(.button.button-toggle-code) {
            order: 2;
        }
        #output {
            width: 100%;
        }
    }
</style>
