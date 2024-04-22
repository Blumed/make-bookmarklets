<button
type="button"
class="button fill-white button-contact"
on:click={() => document.getElementById("dialog-contact").showModal()}>Contact</button
>

<dialog id="dialog-contact" class="dialog">
    <button
        type="button"
        class="button-close"
        title="Close Dialog"
        on:click={() => document.getElementById("dialog-contact").close()}
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
    .button-contact {
            margin-left: 20px;
    }

    .dialog {
        background-color: var(--color-clay);
        border-color: var(--color-pink);
        border-radius: 0.25rem;
        color: var(--color-black);
        max-width: 400px;

        &::backdrop {
            position: fixed;
            inset: 0px;
            background: rgba(0, 0, 0, 0.1);
        }

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

    .button-close {
        position: absolute;
        top: 16px;
        right: 32px;
    }

    @media (max-width: 768px) {
        .dialog {
            margin-inline: 15px;
        }
        
        .button-contact {
            margin-left: 0;
        }
    }
</style>