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
    .footer-section {
        padding-block: 10px;
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
    .contact-section {
        padding: 40px;
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

    #dialog-contact {
        width: 100%;
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
        #dialog-privacy-policy {
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
