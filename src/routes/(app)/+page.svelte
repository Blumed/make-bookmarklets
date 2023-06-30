<script lang="ts">
    import { browser } from "$app/environment";
    import Seo from "$lib/components/page-meta.svelte";
    import AccordionItem from "$lib/components/accordion.svelte";
    import CodeEditor from "$lib/components/editors/js-editor.svelte";

    import { slide } from "svelte/transition";
    import {
        useExampleBookmarklet1,
        useExampleBookmarklet2,
        useExampleBookmarklet3,
        useExampleBookmarklet4,
        useExampleBookmarklet5,
        useExampleSnippet1,
        useExampleSnippet2,
    } from "$lib/components/constants";

    import { minify } from "terser";
    import Accordion from "$lib/components/accordion.svelte";

    let errorMessage = "";
    let gistMultipleFiles = false;
    let gistValid = true;
    let gistErrorMessage: null | string = null;
    let gistFiles: null | any[] = null;
    let gistEditorMessage = "";
    let selectedGist: number | string = "";
    let codeInputGist = "";
    let codeInput = "";
    let codeOutput = "";
    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let gistUrl = "";
    let toggleBookmarklet = false;
    let toggleExamples = false;
    let toggleSnippets = false;
    let toggleGists = false;
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
        codeInputGist = "";
        gistUrl = "";
        selectedGist = "";
        gistEditorMessage = "";
        clickedMobileInstructions = false;
    }

    function toggleSidebar(id: string) {
        if (browser) {
            const sidebarMenu = document.getElementById(id) as HTMLElement;
            sidebarMenu.click();
        }
    }

    function scrollToEditor() {
        if (browser) {
            const editor = document.getElementById("editor") as HTMLElement;
            const editorPosition =
                editor.getBoundingClientRect().top + window.scrollY;
            window.scroll({
                top: editorPosition,
                behavior: "smooth",
            });
        }
    }

    function scrollToMobileInstructions() {
        if (browser) {
            const mobileInstruction = document.querySelector(
                "#item-5-header"
            ) as HTMLElement;
            mobileInstruction?.click();
            const mobileInstructionPosition =
                mobileInstruction.getBoundingClientRect().top +
                window.scrollY +
                100;
            window.scroll({
                top: mobileInstructionPosition,
                behavior: "smooth",
            });
            clickedMobileInstructions = true;
            navigator.clipboard.writeText(codeOutput);
        }
    }

    function addToCodeEditor(
        getCodeInput: string,
        openSidebar: boolean,
        id: string
    ) {
        if (id === "gists-menu") {
            codeInput = "";
            codeInput = getCodeInput;

            if (openSidebar) toggleSidebar(id);
            scrollToEditor();
        } else if (id === "examples-menu" || id === "snippets-menu") {
            codeInput = "";
            codeInputGist = "";
            gistUrl = "";
            selectedGist = "";
            codeInput = getCodeInput;

            if (openSidebar) toggleSidebar(id);
            scrollToEditor();
        }
    }

    function thereCanBeOnlyMenu(menu: string) {
        if (menu === "examples-menu") {
            if (toggleSnippets) {
                toggleSidebar("snippets-menu");
                toggleSnippets = false;
            }
            if (toggleGists) {
                toggleSidebar("gists-menu");
                toggleGists = false;
            }
            toggleExamples = !toggleExamples;
        }
        if (menu === "snippets-menu") {
            if (toggleExamples) {
                toggleSidebar("examples-menu");
                toggleExamples = false;
            }
            if (toggleGists) {
                toggleSidebar("gists-menu");
                toggleGists = false;
            }
            toggleSnippets = !toggleSnippets;
        }
        if (menu === "gists-menu") {
            if (toggleExamples) {
                toggleSidebar("examples-menu");
                toggleExamples = false;
            }
            if (toggleSnippets) {
                toggleSidebar("snippets-menu");
                toggleSnippets = false;
            }
            toggleGists = !toggleGists;
        }
    }

    function isValidUrl(str: string) {
        try {
            new URL(str);
            return true;
        } catch (err) {
            gistValid = false;
            return false;
        }
    }

    async function getGist(url: string) {
        try {
            const response = await fetch(`https://api.github.com/gists/${url}`);
            const gistData = await response.json();

            gistFiles = Object.values(gistData.files).filter(
                (javascriptFile) => javascriptFile?.language === "JavaScript"
            );

            if (gistFiles.length === 0) {
                gistValid = false;
                gistErrorMessage = "No JS files detected";
                return;
            }
            if (gistFiles.length === 1) {
                selectedGist = 0;
                gistMultipleFiles = false;
            } else {
                selectedGist = "";
                gistMultipleFiles = true;
            }
        } catch (err) {
            gistValid = false;
            gistErrorMessage = null;
            console.log("error", err);
        }
    }

    function validateGist() {
        if (
            gistUrl.startsWith("https://gist.github.com/") &&
            isValidUrl(gistUrl)
        ) {
            gistValid = true;
            const gistHash = gistUrl.split("/")[4];

            getGist(gistHash);
        } else {
            gistValid = false;
        }
    }

    function createGistBookmarklet() {
        addToCodeEditor(
            gistFiles && gistFiles[selectedGist].content,
            true,
            "gists-menu"
        );

        codeInputGist = `async function getGist(url) {
  try {
      const response = await fetch(url + Math.random());
      const gistData = await response.text();
    
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
    
      return eval(gistData);
  } catch (err) {
      console.log("error", err);
  }
};
getGist('https://gist.githubusercontent.com/${
            gistFiles && gistFiles[selectedGist]?.raw_url.split("/")[3]
        }/${gistFiles && gistFiles[selectedGist]?.raw_url.split("/")[4]}/raw/${
            gistFiles && gistFiles[selectedGist]?.filename
        }?');`;
        gistEditorMessage =
            "It is unnecessary to edit code below. It is only a snapshot of your gist for verification purposes. Your generated bookmarklet will contain the selected gist url";
    }
    async function read(file) {
        codeInput = await file.text();
    }
    async function save() {
        if (browser) {
            const suggestedName = `${new Date()
                .toISOString()
                .slice(0, 10)}-${new Date()
                .toLocaleTimeString()
                .replace(/( |:|\_)/g, "-")}.js`;
            const options = {
                suggestedName: suggestedName,
                types: [
                    {
                        description: "Make Bookmarklet File",
                        accept: {
                            "text/javascript": [".js"],
                        },
                    },
                ],
            };
            const supportsFileSystemAccess =
                "showSaveFilePicker" in window &&
                (() => {
                    try {
                        return window.self === window.top;
                    } catch {
                        return false;
                    }
                })();
            if (supportsFileSystemAccess) {
                try {
                    const handle = await showSaveFilePicker(options);
                    const writable = await handle.createWritable();
                    await writable.write(codeInput);
                    await writable.close();
                    return;
                } catch (err) {
                    if (err.name !== "AbortError") {
                        console.error(err.name, err.message);
                        return;
                    }
                }
            } else {
                const blobURL = URL.createObjectURL(
                    new Blob([codeInput], { type: "text/javascript" })
                );
                const a = document.createElement("a");
                a.href = blobURL;
                a.download = suggestedName;
                a.style.display = "none";
                document.body.append(a);
                a.click();
                setTimeout(() => {
                    URL.revokeObjectURL(blobURL);
                    a.remove();
                }, 1000);
            }
        }
    }

    $: if (codeInput === "") reset();
    $: if (codeInput !== "" && errorMessage === "Put some code in there!")
        errorMessage = "";
    $: codeInput = codeInput;
    $: if (gistUrl === "" && !gistValid) gistValid = true;
    gistErrorMessage = null;

    $: if (gistUrl === "") gistMultipleFiles = false;
    $: selectedGist, selectedGist !== "" && createGistBookmarklet();

    $: if (files) {
        for (const file of files) {
            read(file);
            console.log(`${file.name}: ${file.size} bytes`);
        }
    }
</script>

<Seo title="Make Bookmarklets | Make it easy" pageCanonicalUrl="/" />

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
            role="presentation"
            alt="ribbon"
            loading="eager"
        />
    </div>
</section>

<div class="section code-editor" id="editor">
    <div class="container-small">
        {#if codeInputGist !== ""}
            <div class="gist-message" in:slide out:slide>
                <span>{gistEditorMessage}</span>
            </div>
        {/if}
        <div class="editor-wrapper">
            <CodeEditor bind:codeEditor={codeInput} />
        </div>

        {#if errorMessage !== ""}
            <div
                class={`error-message ${codeInputGist && "gist-message"}`}
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
                <input hidden type="file" id="upload" accept=".js" bind:files />
                <label class="button button-upload fill-white" for="upload"
                    ><img src="/file.svg" alt="file upload icon" /> Up</label
                >
                <button
                    type="button"
                    class="button button-download fill-white"
                    on:click={save}
                    ><img
                        src="/file.svg"
                        alt="file download icon"
                    />Down</button
                >
                {#if codeOutput !== ""}
                    <a
                        href={codeOutput}
                        class="button button-run-code fill-blue mobile-only"
                        >Run Code</a
                    >
                {/if}
            </div>
        </div>

        {#if codeOutput !== ""}
            <div class="code-output-controls" in:slide out:slide>
                <a
                    role="button"
                    href={codeOutput}
                    class="button button-run-code fill-blue desktop-only"
                    >Run Code</a
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
                            on:click={() =>
                                navigator.clipboard.writeText(codeOutput)}
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
                        on:click={() =>
                            navigator.clipboard.writeText(codeOutput)}
                        >Copy</button
                    >
                </div>
                <button
                    type="button"
                    class="button fill-white button-mobile-instructions mobile-only"
                    on:click={() => scrollToMobileInstructions()}
                    >Save bookmarklets on mobile?</button
                >
            </div>
        {/if}
    </div>
</div>

<section class="section examples-section">
    <div class="container">
        <div class="examples-content">
            <img
                class="examples-image"
                width="400"
                height="400"
                loading="eager"
                src="/flame-no-connection.webp"
                role="presentation"
                title="Mind Expanded Illustration created by Thierry Fousse"
                alt="Mind Expanded Illustration created by Thierry Fousse"
            />

            <div class="examples-cta">
                <h2>
                    Would you like to see some example bookmarklets to get the
                    juices flowing?
                </h2>
                <p>
                    Check out a few example bookmarklets to start from, or use
                    them as a reference. The bookmarklets on this site are quick
                    and simple to build. Small snippets are great for micro
                    automatons but you can go to the moon as far as size and
                    complexity.
                </p>
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
    on:click={() => thereCanBeOnlyMenu("examples-menu")}
/>

<div class="examples-sidebar">
    <aside>
        <h2>Play an mp3 file</h2>
        <p>
            Record an uplifting message and play it to yourself when you get
            frustrated. You could stick a whole piano in your bookmarks! Not
            sure why you would want to do that, but you could.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExampleBookmarklet1}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleBookmarklet1, true, "examples-menu")}
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
            value={useExampleBookmarklet2}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleBookmarklet2, true, "examples-menu")}
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
            value={useExampleBookmarklet3}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleBookmarklet3, true, "examples-menu")}
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
            value={useExampleBookmarklet4}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleBookmarklet4, true, "examples-menu")}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Google, highlighted text</h2>
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
            value={useExampleBookmarklet5}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleBookmarklet5, true, "examples-menu")}
            >Add To Editor</button
        >
    </aside>
</div>

<section class="section snippets-section">
    <div class="container">
        <div class="snippets-content">
            <img
                class="snippets-image"
                width="400"
                height="400"
                src="/triangle.webp"
                role="presentation"
                title="Sparkle Triangle Illustration created by Thierry Fousse"
                alt="Sparkle Triangle Illustration created by Thierry Fousse"
            />
            <div class="snippets-cta">
                <h2>
                    Want to create some UI? Sometimes you need a command center
                    of buttons
                </h2>
                <p>
                    Making dashboards in javascript is pretty straight forward.
                    Yes, I know the code can be incredibly redundant. Having a
                    display for data or buttons, which can interact with a
                    webpage is pretty handy though.
                </p>
                <label
                    for="snippets-menu"
                    role="button"
                    class="button fill-white"
                    tabindex="0"
                    >{`${toggleSnippets ? "Hide" : "Show"} Snippets`}</label
                >
            </div>
        </div>
    </div>
</section>

<input
    type="checkbox"
    id="snippets-menu"
    class="button-close"
    aria-hidden="true"
    on:click={() => thereCanBeOnlyMenu("snippets-menu")}
/>

<div class="snippets-sidebar">
    <aside>
        <h2>Basic UI Element</h2>
        <p>
            Here is a little tippy top banner with a close button. Purely using
            javascript to generate UI is easy to do. For organizational
            purposes, I recommend storing repeated styles and text in an object.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExampleSnippet1}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleSnippet1, true, "snippets-menu")}
            >Add To Editor</button
        >
    </aside>
    <aside>
        <h2>Dialog Box</h2>
        <p>
            Creating a dialog element and count headings displayed on the
            current page. This info is nice to know on the fly to double check
            you have an h1 on the page or if your heading counts look off.
        </p>
        <textarea
            name="webpage-editable"
            id="webpage-editable"
            class="example-code"
            value={useExampleSnippet2}
            rows="8"
            readonly
        />
        <button
            type="button"
            class="button button-small fill-white"
            on:click={() =>
                addToCodeEditor(useExampleSnippet2, true, "snippets-menu")}
            >Add To Editor</button
        >
    </aside>
</div>

<section class="section gists-section">
    <div class="container">
        <div class="gists-content">
            <img
                class="gists-image"
                loading="lazy"
                src="/planning.webp"
                width="400"
                height="400"
                role="presentation"
                title="Plans and Designs Illustration created by Thierry Fousse"
                alt="Plans and Designs Illustration created by Thierry Fousse"
            />
            <div class="gists-cta">
                <h2>
                    Create a bookmarklet from a github gist. Keep your
                    bookmarklets under control
                </h2>
                <p>
                    Are you asking yourself why would I do this? No worries, I
                    asked myself the same question when I first stumbled upon
                    this feature. A common use case is keeping your bookmarklets
                    version controlled. Another reason may be to keep url
                    character count low. This allows you to create a static
                    bookmarklet and the code it points to can update
                    independently inside your gist.
                </p>
                <label
                    for="gists-menu"
                    role="button"
                    class="button fill-white"
                    tabindex="0"
                    >{`${toggleGists ? "Hide" : "Show"} Gist Menu`}</label
                >
            </div>
        </div>
    </div>
</section>

<input
    type="checkbox"
    id="gists-menu"
    class="button-close"
    aria-hidden="true"
    on:click={() => thereCanBeOnlyMenu("gists-menu")}
/>

<div class="gists-sidebar">
    <aside>
        <h2>Create Gist Bookmarklet</h2>
        <p>
            The github gist you select should be valid javascript. Only gists
            with filenames which end with dot js will be let in. Both public and
            private gists work. <a
                href="https://gist.github.com/"
                target="_blank"
                rel="noopener noreferrer"><strong>Go grab your gists</strong></a
            >
        </p>
        <label for="gist-url" class="gist-label">Gist Url</label>
        <input
            type="text"
            name="gist-url"
            id="gist-url"
            class="input"
            placeholder="https://gist.github.com/bob/2dueba311c820170fad230902feab25"
            bind:value={gistUrl}
            on:keyup={() => setTimeout(() => validateGist(null), 1000)}
        />
        {#if !gistValid}
            <div class="error-message" in:slide out:slide>
                <span
                    >{gistErrorMessage ?? "Please enter a valid gist url"}</span
                >
            </div>
        {/if}
        {#if gistValid && gistMultipleFiles}
            <select
                class="button gist-file-select fill-white button-small"
                in:slide
                out:slide
                bind:value={selectedGist}
            >
                <option value="">Choose Your File</option>
                {#each gistFiles as { filename }, i}
                    <option value={i}>{filename}</option>
                {/each}
                <span>Please enter a valid gist url</span>
            </select>
        {/if}
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
            <h4 class="faq-title">
                Why use a bookmarklet? From micro to macro task automation
            </h4>
            <p>
                Is there a Zoom url you constantly need to copy & paste for
                quick impromptu meetings? Use the clipboard API to copy the url
                to your clipboard with a simple click of a bookmark. Here is an <button
                    type="button"
                    class="button-inline"
                    on:click={() =>
                        addToCodeEditor(
                            useExampleBookmarklet4,
                            false,
                            "examples-menu"
                        )}>Example</button
                >.
            </p>
            <h4 class="faq-title">Browser extensions vs bookmarklets</h4>
            <p>
                Most of the browser extensions I have built started off as
                bookmarklets, which is why I love them both. Browser extension
                are powerful. You can do so much with them and they are also fun
                to build. It is important to have a healthy amount of suspicion
                when vetting any javascript tool which has access to possible
                private information on your browser. Both bookmarklets and
                extensions share similar risks, which is why I advocate for you
                to make your own.
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
            <h4 class="faq-title">Global variable collision</h4>
            <p>
                If you use the window object to store variables in your
                bookmarklet it is possible that the site uses that variable name
                already. I recommend not using the window object to store
                objects, period. Keep your objects scoped to your bookmarklet
                and do your best to not let them leak.
            </p>
            <h4 class="faq-title">Reactive elements</h4>
            <p>
                If your script manipulates existing dom elements, any site which
                uses Javascript frameworks or libraries like React may wipe your
                changes. This is because of the reactive nature of the virtual
                dom (vdom) which, depending on how components are made, might
                render and rerender quickly. This means the element you targeted
                has been destroyed and recreated, essentially causing your
                changes to stop working or disappear.
            </p>
            <h4 class="faq-title">Bookmark drawer is not visible</h4>
            <p>
                Depending on what your bookmarklet is doing, there might be a
                requirement that the bookmark drawer below the search bar needs
                to be visible in order for it to execute properly. I ran into
                this when the bookmarklet I created wrote to the user's
                clipboard when they clicked the bookmarklet. It showed an error
                in the console and didn't run until I reenabled the bookmark
                drawer.
            </p>
            <h4 class="faq-title">Chrome browser on Android devices</h4>
            <p>
                Bookmarks saved on desktop are accessible on your mobile
                devices. Clicking on your bookmarklet from the bookmark menu
                will not work. You need to access your bookmarklet through the
                search bar dropdown by typing the exact name of your bookmarklet
                in the search bar in order for it to execute.
            </p>
        </AccordionItem>
        <Accordion id="item-4" title="Are Bookmarklets Safe?">
            <h4 class="faq-title">
                Absolutely, as long as you understand what they are doing
            </h4>
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
        <Accordion id="item-5" title="How to save bookmarklets on mobile?">
            <h4 class="faq-title">
                There is nothing fancy about saving bookmarklets on a mobile
                device. It is a manual process.
            </h4>
            <ol class="mobile-bookmark-instructions">
                <li>
                    {clickedMobileInstructions && codeOutput !== ""
                        ? "I added your script to your clipboard for you."
                        : "Once you are done creating and testing your bookmarklet copy the script to your clipboard."}
                </li>
                <li>
                    Favorite this page and then edit the bookmark in your
                    browser settings.
                </li>
                <li>
                    Name it whatever you want then paste your script into the
                    url field and once you're done click save.
                </li>
                <li>🎉 You did it 🎉</li>
            </ol>
        </Accordion>
    </div>
    <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "What are Bookmarklets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "What are bookmarklets? Teeny tiny Javascript applications stored in a bookmark url. Clicking the bookmark will launch it, so you can customize and extend your browsing experience."
            }
          }, {
            "@type": "Question",
            "name": "Why Bookmarklets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "<b>Why use a bookmarklet? From micro to macro task automation</b><p>Is there a Zoom url you constantly need to copy & paste for quick impromptu meetings? Use the clipboard API to copy the url to your clipboard with a simple click of a bookmark.</p>"
            }
          }, {
            "@type": "Question",
            "name": "Why do bookmarklets stop working on specific sites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "<ol><li>Sites with Content Security Policies</li><li>Global variable collision</li><li>Reactive elements</li><li>Bookmark drawer is not visible (On some browsers)</li></ol>"
            }
          }, {
            "@type": "Question",
            "name": "Are Bookmarklets Safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "<b>Absolutely, as long as you understand what they are doing</b><p>Some basic common sense should be applied when using any old bookmarklet you find laying around on the internet. Make sure the site and source is credible. Always copy and paste them into an editor for safe reading. Be weary of bookmarklets that execute external scripts. If they do have external scripts generate a readable version so you can understand what it is doing. You can also skip all this and make your own</p>"
            }
          }, {
            "@type": "Question",
            "name": "How to save bookmarklets on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":"<b>There is nothing fancy about saving bookmarklets on a mobile device. It is a manual process.:</b> <ol><li>Once you are done creating and testing your bookmarklet copy the script to your clipboard.</li><li>Favorite a page and then edit the bookmark in your browser settings.</li><li>Name it whatever you want then paste your script into the url field and once you're done click save.</li><li>You did it! Well done.</li></ol>"}
            }]
        }
    </script>
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
        color: var(--clay-color);
        background-color: #282c34;
        box-shadow: 12px 12px 0 0 #ffffff;
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
        min-height: 200px;
        position: relative;
        z-index: 1;
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
        position: relative;
        z-index: 2;
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

    :global(.button.button-toggle-code) {
        margin-left: 0;
        margin-right: 20px;
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
    .group-bookmarklet-output {
        display: flex;
        flex-direction: column;
        margin-left: auto;
    }
    .faq-section {
        h2 {
            text-align: center;
            margin-bottom: 40px;
        }
        .faq-title {
            margin-top: 0;
            margin-bottom: 5px;
            + p {
                margin-bottom: 15px;
            }
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
    .examples-section,
    .snippets-section,
    .gists-section {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        h2,
        p {
            max-width: 635px;
        }
        h2 {
            margin-block: 0;
        }
        p {
            margin-bottom: 40px;
        }
    }
    .snippets-image {
        order: 2;
    }
    .examples-content,
    .snippets-content,
    .gists-content {
        display: grid;
        grid-template-columns: auto auto;
        gap: 30px;
    }
    .examples-cta,
    .snippets-cta,
    .gists-cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: left;
        .button {
            align-self: flex-start;
        }
    }
    .examples-sidebar,
    .snippets-sidebar,
    .gists-sidebar {
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
    #examples-menu,
    #snippets-menu {
        display: none;
        position: fixed;
        &:checked {
            appearance: none;
        }
    }
    #gists-menu {
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
    #snippets-menu:checked + .snippets-sidebar {
        visibility: visible;
    }
    #snippets-menu:checked ~ .snippets-sidebar {
        transform: translate(-16rem);
    }
    #gists-menu:checked + .gists-sidebar {
        visibility: visible;
    }
    #gists-menu:checked ~ .gists-sidebar {
        transform: translate(-16rem);
    }
    .example-code {
        padding: 5px;
        width: 100%;
        resize: vertical;
        margin-bottom: 20px;
    }
    .gists-button {
        margin-bottom: 30px;
    }
    .gist-label {
        display: inline-block;
    }
    #gist-url + .error-message {
        box-shadow: none;
    }
    .gist-file-select {
        width: 100%;
        margin-top: 30px;
    }
    .mobile-only {
        display: none;
    }
    .mobile-bookmark-instructions {
        li {
            margin-bottom: 15px;
        }
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
        .mobile-bookmark-instructions {
            background-color: var(--clay-color);
            padding: 10px 30px 10px;
            border-radius: 0.25rem;
        }
        .examples-content,
        .snippets-content,
        .gists-content {
            display: block;
        }
        .examples-image {
            padding-top: 70px;
        }
        .examples-image,
        .snippets-image,
        .gists-image {
            width: 100%;
            height: 100%;
        }

        .mobile-only {
            display: inline-block;
        }
        .desktop-only {
            display: none;
        }
    }
</style>
