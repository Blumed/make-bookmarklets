<script lang="ts">
    import "$lib/styles/global.scss";
    import Heart from "$lib/components/heart-icon/heart.svelte";
    import { browser } from "$app/environment";
    let dialog: any;
    function toggleDialog(state: boolean) {
        if (browser) {
            dialog = document.getElementById("dialog-privacy-policy");
            state === true ? dialog.showModal() : dialog?.close();
        }
    }
</script>

<main>
    <slot />
</main>
<dialog id="dialog-privacy-policy">
    <button
        type="button"
        class="button-close"
        title="Close Dialog"
        on:click={() => toggleDialog(false)}
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
            Use <a href="https://withcabin.com/">Cabin Analytics</a> which is a service
            for anonymous analytics. Cabin doesn't store cookies on your computer.
            I use it for analyzing basic site traffic. They're data isn't pooled
            in a way in which it is even useful for them to sell, so they don't.
            They are a paid services which is how they make their money.
        </p>
    </aside>
</dialog>
<footer class="section">
    <div class="container">
        <p>
            &copy;{new Date().getFullYear()} Make Bookmarklets |
            <button
                type="button"
                class="button-inline"
                on:click={() => toggleDialog(true)}>Privacy Policy</button
            >
        </p>

        <p>
            Made with lots of <Heart /> by
            <a href="https://cullanluther.com" target="_blank" rel="noopener"
                >CullanLuther</a
            >
        </p>
    </div>
</footer>

<style lang="scss">
    .section {
        padding-block: 10px;
    }
    .container {
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
    }
    @media (max-width: 768px) {
        #dialog-privacy-policy {
            margin-inline: 15px;
        }
        .container {
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
