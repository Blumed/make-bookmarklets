<button
    type="button"
    class="button-inline"
    on:click={() => document.getElementById("dialog-privacy-policy").showModal()}
    >Privacy Policy</button>

<dialog id="dialog-privacy-policy" class="dialog">
    <button
        type="button"
        class="button-close"
        title="Close Dialog"
        on:click={() => document.getElementById("dialog-privacy-policy").close()}
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

<style lang="scss">
    .dialog {
        background-color: var(--color-clay);
        border-color: var(--color-pink);
        border-radius: 0.25rem;
        color: var(--color-black);
        max-width: 900px;
        &::backdrop {
            position: fixed;
            inset: 0px;
            background: rgba(0, 0, 0, 0.1);
        }

        h2 {
            margin-bottom: 0;
            + :is(p, ul) {
                margin-top: 5px;
            }
        }

        @media (max-width: 768px) {
            margin-inline: 15px;
        }
    }

    .button-close {
        position: absolute;
        top: 16px;
        right: 32px;
    }
</style>