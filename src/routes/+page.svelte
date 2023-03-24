<script lang="ts">
    import { browser } from "$app/environment";
    import Seo from "$lib/components/page-meta.svelte";
    import AccordionItem from "$lib/components/accordion.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import { slide } from "svelte/transition";
    import {
        useExample1,
        useExample2,
        useExample3,
        useExample4,
        useExample5,
        config,
    } from "$lib/components/constants";

    // Uses linter.mjs
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { minify } from "terser";
    import Accordion from "$lib/components/accordion.svelte";

    let errorMessage = "";
    let codeInput = "";
    let codeOutput = "";
    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let toggleBookmarklet = false;
    let toggleExamples = false;

    async function minification(str: string) {
        const result = await minify(str, {});
        return result.code;
    }

    function result() {
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
    }

    function reset() {
        codeOutput = "";
        codeInput = "";
        errorMessage = "";
    }

    function toggleSidebarExamples() {
        if (browser) document.getElementById("examples-menu").click();
    }

    function scrollToEditor() {
        if (browser) {
            const editor =
                document.getElementById("editor").getBoundingClientRect().top +
                window.scrollY;
            window.scroll({
                top: editor,
                behavior: "smooth",
            });
        }
    }

    function addExampleCode(exampleCode: string, openSidebar: boolean) {
        () => (toggleExamples = false);
        codeInput = "";
        codeInput = exampleCode;
        if (openSidebar) toggleSidebarExamples();
        scrollToEditor();
    }

    $: if (codeInput === "") reset();
    $: if (codeInput !== "" && errorMessage === "Put some code in there!")
        errorMessage = "";
</script>

<Seo title="Make it easy" pageCanonicalUrl="/" />

<section class="hero section">
    <div class="container">
        <header>
            <h1><span>Welcome to <br /></span>Make Bookmarklets</h1>
            <div class="features-section">
                <h2>Features Include</h2>
                <ul>
                    <li>
                        All Javascript is wrapped in an Immediately Invoked
                        Function Expression (IIFE) for you
                    </li>
                    <li>Javascript linting</li>
                    <li>Multiline cursor</li>
                    <li>Javascript intellisense</li>
                    <li>Code is automatically minified and uglified</li>
                    <li>Works great on mobile devices</li>
                </ul>
            </div>
        </header>
        <img
            class="ribbon"
            src="/flat-bookmark.svg"
            alt="Cullan Luther Smiling At You"
        />
    </div>
</section>

<div class="section code-editor" id="editor">
    <div class="container-small">
        <div class="editor-wrapper">
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
        </div>

        {#if errorMessage !== ""}
            <div class="error-message" in:slide out:slide>
                <span>{errorMessage}</span>
            </div>
        {/if}

        <div class="code-input-controls">
            <div class="buttons">
                <button
                    type="button"
                    class="button button-create fill-white"
                    on:click={result}>Create Bookmarklet</button
                >
                <button
                    type="button"
                    class="button button-reset fill-white"
                    on:click={reset}>Reset</button
                >
                {#if codeOutput !== ""}
                    <a href={codeOutput} class="button button-bookmarklet"
                       on:click={(e) => ( e.preventDefault())}>{bookmarkletName}</a
                    >
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

                <button
                    type="button"
                    class="button button-toggle-code fill-white "
                    on:click={() => (toggleBookmarklet = !toggleBookmarklet)}
                    >{`${toggleBookmarklet ? "Hide" : "Show"} Code`}
                </button>

                {#if toggleBookmarklet && codeOutput !== ""}
                    <div
                        class="inline-field-group output-code-fields"
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
                            on:click={() =>
                                navigator.clipboard.writeText(codeOutput)}
                            >Copy</button
                        >
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>

<section class="section examples-section">
    <div class="container">
        <div class="examples-content">
            <img
                class="examples-image"
                src="/flame-no-connection.webp"
                alt="Mind Expanded Illustration"
            />
            <div class="examples-cta">
                <h2>
                    Would you like to see some example bookmarklets to get the
                    juices flowing?
                </h2>
                <label
                    for="examples-menu"
                    role="button"
                    class="button fill-white"
                    tabindex="0"
                    >{`${toggleExamples ? "Hide" : "Show"} Examples`}</label
                >
            </div>
        </div>
    </div>
</section>

<input
    type="checkbox"
    id="examples-menu"
    class="button-close"
    aria-hidden="true"
    on:click={() => (toggleExamples = !toggleExamples)}
/>
<div class="examples-sidebar">
    <aside>
        <h2>Make all text editable on a webpage.</h2>
        <p>
            Great for finding spelling errors or to see how different text would
            look using your type treatments. Clicking the bookmark will toggle
            it on and off.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExample1}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small  fill-white"
            on:click={() => addExampleCode(useExample1, true)}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Full webpage snapshot</h2>
        <p>
            Take a snapshot of your current webpage on any device and on any
            browser. Just a heads up, you will need to give the browser
            permission to do this action on your device.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExample2}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small  fill-white"
            on:click={() => addExampleCode(useExample2, true)}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Google page speed insights</h2>
        <p>
            Are you a website performance nerd like me? This bookmarklet will
            open up google page speed scores and test the current page you are
            on.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExample3}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small  fill-white"
            on:click={() => addExampleCode(useExample3, true)}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Copy text to clipboard</h2>
        <p>
            Quickly add text or maybe a url you copy and paste all the time to
            your clipboard.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExample4}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small  fill-white"
            on:click={() => addExampleCode(useExample4, true)}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Google highlighted text</h2>
        <p>
            Highlight any text on the page and search google if the text you
            highlighted has indexed. If you're keeping an eye on your SEO this
            is a best practice for making sure google bot is able to reach your
            content.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExample5}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small  fill-white"
            on:click={() => addExampleCode(useExample5, true)}
            >Add To Editor</button
        >
    </aside>
</div>

<section class="section faq-section">
    <div class="container">
        <h2>Frequently Asked Questions</h2>
        <Accordion id="item-1" title="What are Bookmarklets?">
            <p>
                What are bookmarklets? Teeny tiny Javascript applications stored
                in a bookmark url. Clicking the bookmark will launch it, so you
                can customize and extend your browsing experience.
            </p>
        </Accordion>
        <Accordion id="item-2" title="Why Bookmarklets?">
            <h4>Why use a bookmarklet? From micro to macro task automation</h4>
            <p>
                Is there a Zoom url you constantly need to copy & paste for
                quick impromptu meetings? Use the clipboard API to copy the url
                to your clipboard with a simple click of a bookmark. Here is an <button
                    type="button"
                    class="button-inline"
                    on:click={() => addExampleCode(useExample4, false)}
                    >Example</button
                >.
            </p>
        </Accordion>
        <AccordionItem
            id="item-3"
            title="Why do bookmarklets stop working on specific sites?"
        >
            <h4 class="faq-title">Sites with Content Security Policies</h4>
            <p>
                A new security feature many large websites are implementing is
                called Content Security Policy (CSP). The reason CSP exists is
                to prevent Cross Site Scripting (XSS) attacks by blocking the
                execution of inline styles and scripts. So, bookmarklets won't
                run on these sites. The work around is browser extensions.
                Browser extensions work regardless of CSP for whatever reason.
                Seems like an odd hole, because you can create a local browser
                extension quickly which is not audited by the browser extension
                team. I am working on a Chrome extension that will allow you to
                add and organize your bookmarklets and fire them from there.
            </p>
            <h4>Global variable collision</h4>
            <p>
                If you use the window object to store variables in your
                bookmarklet it is possible that the site uses that variable name
                already. I recommend not using the window object to store
                objects, period. Keep your objects scoped to your bookmarklet
                and do your best to not let them leak.
            </p>
            <h4>Reactive elements</h4>
            <p>
                If your script manipulates existing dom elements, any site which
                uses Javascript frameworks or libraries like React may wipe your
                changes. This is because of the reactive nature of the virtual
                dom (vdom) which, depending on how components are made, might
                render and rerender quickly. This means the element you targeted
                has been destroyed and recreated, essentially causing your
                changes to stop working or disappear.
            </p>
            <h4>Bookmark drawer is not visible</h4>
            <p>
                Depending on what your bookmarklet is doing, there might be a
                requirement that the bookmark drawer below the search bar needs
                to be visible in order for it to execute properly. I ran into
                this when the bookmarklet I created wrote to the user's
                clipboard when they clicked the bookmarklet. It showed an error
                in the console and didn't run until I reenabled the bookmark
                drawer.
            </p>
            <h4>Chrome browser on Android devices</h4>
            <p>
                Bookmarks saved on desktop are accessible on your mobile
                devices. Clicking on your bookmarklet from the bookmark menu
                will not work. You need to access your bookmarklet through the
                search bar dropdown by typing the exact name of your bookmarklet
                in the search bar in order for it to execute it.
            </p>
        </AccordionItem>
        <Accordion id="item-4" title="Are Bookmarklets Safe?">
            <h4>Absolutely, as long as you understand what they are doing</h4>
            <p>
                Some basic common sense should be applied when using any old
                bookmarklet you find laying around on the internet. Make sure
                the site and source is credible. Always copy and paste them into
                an editor for safe reading. Be weary of bookmarklets that
                execute external scripts. If they do have external scripts
                generate a readable version so you can understand what it is
                doing. You can also skip all this and make your own 😊
            </p>
        </Accordion>
    </div>
</section>

<style lang="scss">
    .hero {
        display: flex;
        align-items: center;
        padding-bottom: 0;
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
        left: 980px;
        height: 1029px;
    }
    h1 {
        font-size: 5rem;
        line-height: 76px;
        margin-top: 0;
        margin-bottom: 40px;
        padding-right: 431px;
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
        padding-right: 115px;
        h2 {
            font-size: 1.3rem;
            margin-bottom: 10px;
        }
        ul {
            padding-left: 23px;
            margin-top: 10px;
            margin-bottom: 0;
        }
        li {
            list-style: circle;
            line-height: 24px;
        }
    }
    .code-input-controls {
        margin-top: 50px;
        margin-bottom: 30px;
        .buttons {
            display: flex;
        }
    }
    .editor-wrapper {
        min-height: 200px;
    }
    :global(.codemirror-wrapper) {
        box-shadow: 12px 12px 0 0 #fff;
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

    :global(.button.button-toggle-code) {
        margin-left: 0;
        margin-right: 20px;
    }
    .output-code-fields {
        width: calc(100% - 415px);
        margin: 0;
        position: relative;
    }
    #output {
        width: 100%;
        padding: 10px;
        border: 2px solid var(--black-color);
        border-radius: 0.25rem;
        display: flex;
        margin-top: 20px;
        align-self: center;
        order: 3;
        padding-right: 65px;
    }
    .button-reset {
        &:hover {
            background-color: var(--pink-color);
        }
    }
    .button.button-bookmarklet {
        margin-left: auto;
        background-color: #f78da7;
        line-height: 20px;
    }
    .button-copy {
        position: absolute;
        cursor: pointer;
        right: 0;
        color: var(--black-color);
        height: 38.5px;
        top: 20px;
        padding-inline: 10px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border: 2px solid var(--black-color);
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        background-color: var(--clay-color);
        transition: var(--global-transition);
        &:hover {
            background-color: var(--turquoise-color);
        }
    }
    .faq-section {
        h2 {
            text-align: center;
            margin-bottom: 40px;
        }
        h4 {
            margin-top: 0;
            margin-bottom: 5px;
        }
        p {
            margin: 0;
        }
    }
    .faq-section,
    .examples-section {
        position: relative;
        z-index: 1;
    }
    .examples-section {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        h2 {
            max-width: 635px;
            margin-bottom: 40px;
        }
    }
    .examples-content {
        display: grid;
        grid-template-columns: auto auto;
        gap: 30px;
    }
    .examples-cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        .button {
            align-self: flex-start;
        }
    }
    .examples-sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 100%;
        width: 16rem;
        visibility: hidden;
        overflow-y: auto;
        font-size: 0.875rem;
        z-index: 6;
        color: var(--black-color);
        background-color: var(--clay-color);
        transition: var(--global-transition);
        backface-visibility: hidden;
        padding: 16px 16px 60px;
        border-left: 2px solid var(--black-color);
        h2 {
            font-size: 1.3rem;
            margin-top: 35px;
            margin-bottom: 0;
        }
    }
    #examples-menu {
        display: none;
        position: fixed;
        &:checked {
            appearance: none;
        }
    }
    #examples-menu:checked + .examples-sidebar {
        visibility: visible;
    }
    #examples-menu:checked ~ .examples-sidebar {
        transform: translate(-16rem);
    }
    .example-code {
        padding: 5px;
        width: 100%;
        resize: vertical;
        margin-bottom: 20px;
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
            top: 342px;
            overflow: inherit;
        }
        .hero {
            height: auto;
            text-align: left;
            padding-bottom: 0;
            background-color: var(--pink-color);
            overflow: inherit;
            header::after {
                content: "";
                background-color: var(--pink-color);
                z-index: -1;
                height: 100px;
                width: 100%;
                display: block;
                left: 0;
                position: absolute;
            }
        }
        .features-section {
            padding-right: 0;
            h2 {
                font-size: 1.1rem;
                margin-bottom: 0;
            }
        }
        h1 {
            font-size: 2.4rem;
            line-height: 46px;
            margin-bottom: 20px;
            padding-right: 0;
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
        .button-bookmarklet {
            margin-right: 0;
        }
        :global(.button.button-toggle-code) {
            order: 2;
        }
        #output {
            width: 100%;
        }
        .examples-content {
            display: block;
        }
        .examples-image {
            width: 100%;
            padding-top: 70px;
        }
        .examples-cta {
            text-align: center;
            .button {
                align-self: center;
            }
        }
    }
</style>
