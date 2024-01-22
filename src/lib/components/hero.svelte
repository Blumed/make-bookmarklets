<section class="hero section">
    <div class="container">
        <header>
            <h1>
                <slot name="light" /><br />
                {#if $$slots.dark}
                    <slot name="dark" />
                {:else}
                    Bookmarklet
                {/if}
            </h1>
            {#if $$slots.features}
                <div class="features-section">
                    <h2><slot name="light" /> Features Include</h2>
                    <slot name="features" />
                </div>
            {/if}
            {#if $$slots.copy}
                <slot name="copy" />
            {/if}
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

<style lang="scss">
    .hero {
        display: flex;
        align-items: center;
        padding-bottom: 0;
        :global(p) {
            margin-inline: auto;
            max-width: 903px;
            padding-right: 115px;
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
        left: 980px;
        height: 1029px;
    }
    h1 {
        font-size: 5rem;
        line-height: 76px;
        margin-top: 0;
        margin-bottom: 40px;
        padding-right: 431px;
        :global(span[slot="light"]) {
            text-shadow:
                -1px -1px 0 var(--color-black),
                1px -1px 0 var(--color-black),
                -1px 1px 0 var(--color-black),
                1px 1px 0 var(--color-black);
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
            background-color: var(--color-pink);
            overflow: inherit;
            header::after {
                content: "";
                background-color: var(--color-pink);
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
            :global(span[slot="light"]) {
                letter-spacing: 1.5px;
                font-size: 2.7rem;
            }
        }
    }
</style>
