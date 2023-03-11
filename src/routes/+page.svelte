<script lang="ts">
    import { browser } from "$app/environment";
    import Seo from "$lib/components/seo/page-meta.svelte";
    import AccordionItem from "$lib/components/accordion.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import { slide } from "svelte/transition";
    import Button from "$lib/components/buttons/button.svelte";
    // Uses linter.mjs
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { minify } from "terser";
    import Accordion from "$lib/components/accordion.svelte";

    let errorMessage = "";
    export let codeInput = "";
    let codeOutput = "";
    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let toggleBookmarklet = false;
    let toggleExamples = false;

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

    const toggleDrawer = () => {
        if (browser) document.getElementById("examples-menu").click();
    };
    const addExampleCode = (exampleCode: string, openDrawer: boolean) => {
        () => (toggleExamples = false);
        codeInput = "";
        codeInput = exampleCode;
        if (openDrawer) toggleDrawer();
        if (browser) {
            const editor =
                document.getElementById("editor").getBoundingClientRect().top +
                window.scrollY;
            window.scroll({
                top: editor,
                behavior: "smooth",
            });
        }
        // window.scrollTo({ top: 0, behavior: "smooth" });
    };

    let useExample1 = `if(document.designMode === "off") {
  document.designMode = "on";
} else {
  document.designMode = "off"; 
}`;

    let useExample2 = `const capture = async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const video = document.createElement("video");

  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    context.drawImage(video, 0, 0, window.width, window.height);
    const frame = canvas.toDataURL("image/png");
    captureStream.getTracks().forEach(track => track.stop());
    window.location.href = frame;
  } catch (err) {
    console.error('Full page screenshot bookmarklet did not work: ' + err);
  }
};

capture();`;

    let useExample3 = `function pageSpeedInsights(currentSite){
  try {
   window.open('https://pagespeed.web.dev/report?url=' + currentSite, '_blank', 'noopener,noreferrer'); 
  } catch (error){
    console.log('pagespeed insights bookmarklet did not work: ', error);
  }
};
pageSpeedInsights(window.location.href);`;

    let useExample4 = `try {   
  navigator.clipboard.writeText('ADD WHAT EVER TEXT YOU WANT HERE');
} catch(error) {
  console.log('Copy To Clipboard Bookmarklet did not work: ', error);
}`;
</script>

<Seo title="Not War" pageCanonicalUrl="/" />
<section class="hero section">
    <div class="container">
        <header>
            <h1><span>Welcome to <br /></span>Make Bookmarklets</h1>
            <!-- <p>
                What are bookmarklets? Teeny tiny javascript applications stored
                in a bookmark url. Clicking the bookmark will launch it, so you
                can customize and extend your browsing experience.
            </p> -->
            <section class="features-section">
                <h2>Features Include</h2>
                <ul>
                    <li>
                        All javascript created in the editor is wrapped in
                        bookmarklet executable iife for you, so you just need to
                        focus on the javascript you wanna write
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
<div class="section code-editor" id="editor">
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
                    class="button-toggle-code fill-white "
                    handleClick={() => (toggleBookmarklet = !toggleBookmarklet)}
                    buttonText={`${toggleBookmarklet ? "Hide" : "Show"} Code`}
                />
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
<section class="section example-section">
    <div class="container">
        <div class="example-content">
            <img
                class="example-image"
                src="/flame-no-connection.webp"
                alt="Mind Expanded Illustration"
            />
            <div class="example-cta">
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
<section class="section content-section">
    <div class="container">
        <h2>Frequently Asked Questions</h2>
        <Accordion id="item-1" title="What are Bookmarklets?">
            <p>
                What are bookmarklets? Teeny tiny javascript applications stored
                in a bookmark url. Clicking the bookmark will launch it, so you
                can customize and extend your browsing experience.
            </p>
        </Accordion>
        <Accordion id="item-2" title="Why Bookmarklets?">
            <p>Why use a bookmarklet? From micro to minor task automation.</p>
            <ul>
                <li>
                    Is there a Zoom url you constantly need to copy & paste for
                    quick impromptu meetings? Use the clipboard API to copy the
                    url to your clipboard with simple click of a bookmark. Here
                    is an <button
                        type="button"
                        class="button-inline"
                        on:click={() => addExampleCode(useExample4, false)}
                        >Example</button
                    >
                </li>
            </ul>
        </Accordion>
        <AccordionItem
            id="item-3"
            title="Why do bookmarklets stop working on specific sites?"
        >
            <h4>Sites with Content Security Policies</h4>
            <p>
                A new security feature many large websites are implementing
                called Content Security Policy (CSP). The reason CSP exists is
                to prevent Cross Site Scripting (XSS) attacks by blocking the
                execution of inline styles and scripts. So, bookmarklets won't
                run on these sites. The work around are browser extensions.
                Browser extensions work regardless of CSP for whatever reason.
                Seems like an odd hole, because you can create a local browser
                extension quickly which is not audited by the browser extension
                team. I am working on a chrome extension that will allow you to
                add and organize your bookmarklets and fire them from there.
            </p>
            <h4>Global variable collision</h4>
            <p>
                If you use window to store variables in your bookmarklet it is
                possible that the site uses that variable name already. I
                recommend not using the window object to store objects period.
                Keep your objects scoped to your bookmarklet and do your best to
                not let them leak.
            </p>
            <h4>Reactive elements</h4>
            <p>
                If your script manipulates existing dom elements. Site which use
                javascript frameworks or libraries like react may wipe your
                changes. This is because of the reactive nature of virtual dom
                (vdom) which depending on how components are made might render
                and rerender quickly which means the element you targeted has
                been destroyed and recreated essentially causing your changes to
                stop working or disappear.
            </p>
            <h4>Bookmark drawer is not visible</h4>
            <p>
                Depending on what your bookmarklet is doing, there might be a
                requirement that the bookmark drawer below the search bar needs
                to be visible in order for it to execute appropriately. I ran
                into this when the bookmarklet I created wrote to the users
                clipboard when they clicked the bookmarklet. It showed an error
                in the console and didn't run until I reenabled the bookmark
                drawer.
            </p>
            <h4>Chrome browser on an Android device</h4>
            <p>
                Bookmarks saved on desktop are accessible on your mobile
                devices. Clicking on your bookmarklet from the bookmark menu
                will not work. You need to access your bookmarklet through the
                search bar dropdown in order for it to execute.
            </p>
        </AccordionItem>
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
        <Button
            type="button"
            class="button-small  fill-white"
            handleClick={() => addExampleCode(useExample1, true)}
            buttonText="Add To Editor"
        />
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
        <Button
            type="button"
            class="button-small  fill-white"
            handleClick={() => addExampleCode(useExample2, true)}
            buttonText="Add To Editor"
        />
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
        <Button
            type="button"
            class="button-small  fill-white"
            handleClick={() => addExampleCode(useExample3, true)}
            buttonText="Add To Editor"
        />
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
        <Button
            type="button"
            class="button-small  fill-white"
            handleClick={() => addExampleCode(useExample4, true)}
            buttonText="Add To Editor"
        />
    </aside>
</div>

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
    :global(.codemirror-wrapper) {
        box-shadow: 12px 12px 0 0 #ffffff;
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
    .content-section {
        h2 {
            text-align: center;
            margin-bottom: 40px;
        }
        p {
            margin: 0;
        }
    }
    .content-section,
    .example-section {
        position: relative;
        z-index: 1;
    }
    .example-section {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        h2 {
            max-width: 635px;
            margin-bottom: 40px;
        }
    }
    .example-content {
        display: grid;
        grid-template-columns: auto auto;
        gap: 30px;
    }
    .example-cta {
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
        border-left: 1px solid var(--black-color);
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
        .example-content {
            display: block;
        }
        .example-image {
            width: 100%;
        }
        .example-cta {
            text-align: center;
            .button {
                align-self: center;
            }
        }
    }
</style>
