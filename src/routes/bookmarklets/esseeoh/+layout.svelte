<script lang="ts">
    import "$lib/styles/global.scss";
    import Heart from "$lib/components/heart-icon/heart.svelte";
    import { browser } from "$app/environment";
    let dialog: any;
    function toggleDialog(state: boolean, dialogName: string) {
        if (browser) {
            const dialogPrivacy = document.getElementById(
                "dialog-privacy-policy"
            );
            const dialogContact = document.getElementById("dialog-contact");
            if (dialogName === "privacy") dialog = dialogPrivacy;
            if (dialogName === "contact") dialog = dialogContact;

            state === true ? dialog?.showModal() : dialog?.close();
        }
    }
</script>

<main>
    <section class="hero section">
        <div class="container">
            <header>
                <h1><span>Esseeoh<br /></span> Bookmarklet</h1>
                <div class="features-section">
                    <h2>Esseeoh Features Include</h2>
                    <ul>
                        <li>
                            Validate meta tag existence and if content is filled
                            out
                        </li>
                        <li>
                            Displays minimal Opengraph and Twitter meta data for
                            social sharing insight
                        </li>
                        <li>
                            Counts and validates against suggested length of all
                            header tags
                        </li>
                        <li>
                            Displays and counts all internal and external links
                        </li>
                        <li>
                            Guardrails for showing the correct number of h1 tags
                            on a the current page
                        </li>
                        <li>
                            Edit and copy changes to meta tags and headers.
                            Validation will continue while you edit so you can
                            dial your text in to suggested lengths. Don't worry
                            text changes will go back to normal after a page
                            refresh
                        </li>
                        <li>Locate and scroll to headers</li>
                        <li>Copy</li>
                        <li>
                            Displays the sites robots.txt and sitemap.xml files
                            for easy inspection
                        </li>
                        <li>Can be installed on any device</li>
                        <li>
                            No tracking! This tool is 100% javascript running in
                            your browser
                        </li>
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
    <slot />
</main>

<footer class="footer-section section">
    <div class="container">
        <div class="contact-section">
            <h2>Say Hello</h2>
            <p>
                Let me know if you have any questions, or if you just want to
                say hi.
            </p>
            <button
                type="button"
                class="button fill-white"
                on:click={() => toggleDialog(true, "contact")}>Contact</button
            >
        </div>
        <div class="boring-section">
            <p>
                Copyright &copy;{new Date().getFullYear()} All Rights Reserved |
                <button
                    type="button"
                    class="button-inline"
                    on:click={() => toggleDialog(true, "privacy")}
                    >Privacy Policy</button
                >
            </p>

            <p>
                Made with lots of <Heart /> by
                <a
                    href="https://cullanluther.com"
                    target="_blank"
                    rel="noopener">CullanLuther</a
                >
            </p>
        </div>
    </div>
</footer>

<dialog id="dialog-privacy-policy" class="dialog">
    <button
        type="button"
        class="button-close"
        title="Close Dialog"
        on:click={() => toggleDialog(false, "privacy")}
    />
    <aside>
        <h2>Make Bookmarklets doesn't:</h2>
        <ul>
            <li>Collect any user data what so ever</li>
            <li>Collect any personal information of any kind</li>
            <li>Use 3rd-party tracking or ad server technology</li>
            <li>Use cookies, local storage, or a backend to store data</li>
        </ul>
    </aside>
    <aside>
        <h2>Make Bookmarklets does:</h2>
        <p>
            Use <a
                href="https://withcabin.com/"
                target="_blank"
                rel="noopener noreferrer">Cabin Analytics</a
            > which is a service for anonymous analytics. Cabin doesn't store cookies
            on your computer. I use it for analyzing basic site traffic. They're
            data isn't pooled in a way in which it is even useful for them to sell,
            so they don't. They are a paid services which is how they make their
            money.
        </p>
    </aside>
</dialog>

<dialog id="dialog-contact" class="dialog">
    <button
        type="button"
        class="button-close"
        title="Close Dialog"
        on:click={() => toggleDialog(false, "contact")}
    />
    <form action="https://formspree.io/f/xeqwzrkq" method="POST">
        <label for="name">Full Name</label>
        <input
            type="text"
            id="name"
            class="input"
            name="name"
            required
            autocomplete="name"
        />
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            class="input"
            name="email"
            required
            autocomplete="email"
        />
        <label for="message">Message</label>
        <textarea name="message" id="message" class="input" required />
        <button type="submit" class="button fill-white">Send</button>
    </form>
    <p>
        Found an issue? Reach out on
        <a
            href="https://github.com/Blumed/make-bookmarklets/issues/new"
            target="_blank"
            rel="noopener noreferrer">Github</a
        >.
    </p>
</dialog>

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
    .footer-section {
        padding-block: 10px;
    }

    .contact-section {
        padding: 0 40px 40px;
        text-align: center;
        h2 {
            text-align: right;
            max-width: 360px;
            margin-bottom: 0;
        }
        p {
            display: inline-block;
        }
        .button {
            margin-left: 20px;
        }
    }
    .boring-section {
        display: flex;
        justify-content: space-between;
    }

    .button-close {
        position: absolute;
        top: 16px;
        right: 32px;
    }
    #dialog-privacy-policy {
        max-width: 900px;
        h2 {
            margin-bottom: 0;
            + :is(p, ul) {
                margin-top: 5px;
            }
        }
    }

    #dialog-contact {
        max-width: 400px;
        form {
            display: grid;
            padding: 20px;
        }
        label {
            margin-bottom: 5px;
        }
        .input {
            margin-bottom: 15px;
        }
        .button {
            max-width: 130px;
            background-color: #f78da7;
        }
        p {
            margin: 0;
            padding-inline: 20px;
        }
    }

    .dialog {
        background-color: var(--clay-color);
        border-color: var(--pink-color);
        border-radius: 0.25rem;
        color: var(--black-color);
        &::backdrop {
            position: fixed;
            inset: 0px;
            background: rgba(0, 0, 0, 0.1);
        }
    }
    @media (max-width: 768px) {
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
            .container {
                position: static;
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
        .dialog {
            margin-inline: 15px;
        }
        .contact-section {
            padding-inline: 0;
            text-align: left;
            h2 {
                margin-left: 0;
                max-width: 100%;
                text-align: left;
            }
            .button {
                margin-left: 0;
            }
        }
        .boring-section {
            flex-direction: column;
            justify-content: flex-start;
            p {
                margin-top: 0;
                &:first-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
