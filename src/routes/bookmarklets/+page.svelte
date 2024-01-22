<script>
    import Hero from "$lib/components/hero.svelte";
    import dataBookmarklets from "./bookmarklets.json";

    let filterSearch = "";
    $: searchBookmarklets = dataBookmarklets.filter((bookmarklet) => {
        const title = bookmarklet.title.toLowerCase().includes(filterSearch);
        const copy = bookmarklet.copy.toLowerCase().includes(filterSearch);
        const categories = bookmarklet.categories.includes(filterSearch);
        return title || copy || categories;
    });
</script>

<Hero>
    <span slot="light">Bookmarklet</span>
    <span slot="dark">Library</span>
    <p slot="copy">
        Compiling a collection of useful bookmarklets created on this site. Let
        me know if you have a bookmarklet you think should be on this page.
    </p>
</Hero>

<section class="section">
    <div class="container">
        <search>
            <form method="null">
                <label for="bookmarklets" class="">Pick out a Bookmarklet</label
                >
                <input
                    type="search"
                    id="bookmarklets"
                    placeholder="...search"
                    name="search"
                    bind:value={filterSearch}
                />
            </form>
        </search>
    </div>
</section>

<div class="cards-list container">
    {#if searchBookmarklets.length}
        <div class="cards-list-container">
            {#each searchBookmarklets.reverse() as card}
                <article class="cards-list-card">
                    <header>
                        <h2>
                            <a href={card.url} class="cards-list-title"
                                >{card.title}</a
                            >
                        </h2>
                    </header>
                    <a href={card.url} class="cards-list-copy"
                        ><p>{card.copy}</p></a
                    >
                    <footer>
                        <ul class="list-unstyled">
                            {#each card.categories as category}
                                <li>{category}</li>
                            {/each}
                        </ul>
                    </footer>
                </article>
            {/each}
        </div>
    {:else}
        <p>Sorry, no bookmarklets found with "{filterSearch}"</p>
    {/if}
</div>

<style lang="scss">
    .section,
    .cards-list {
        position: relative;
        z-index: 1;
    }
    [type="search"] {
        padding: 5px;
    }
    .cards-list-container {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 30px;
        margin-bottom: 60px;
    }
    .cards-list-card {
        padding: 20px;
        outline: 2px solid currentColor;
        box-shadow: 6px 6px 0 0 var(--color-black);
        transition: all 0.3s ease;
        border-radius: 8px;
        background-color: var(--color-white);
        p {
            opacity: 0.7;
        }
        &:hover {
            transform: scale(1.01);
            outline-width: 5px;
        }
    }
</style>
