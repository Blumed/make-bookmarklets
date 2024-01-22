<script lang="ts">
    import Seo from "$lib/components/page-meta.svelte";
    import Hero from "$lib/components/hero.svelte";

    let bookmarkletName = "✨Esseeoh✨";
    const bookmarklet = `javascript:(function()%7B(function()%7Basync function getGist(url)%7Btry%7Bconst response=await fetch(url+Math.random()),gistData=await response.text();if(!response.ok)throw new Error("Network response was not OK");return eval(gistData)%7Dcatch(t)%7Bconsole.log("error",t)%7D%7DgetGist("https://bookmarklets.make-bookmarklets.com/esseeoh.js?")%7D)();%7D());`;
    async function getGist(url) {
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
    }
</script>

<Seo
    title="SEO Bookmarklet | Make Bookmarklets"
    pageMetaDescription="Identify and validate webpage SEO. Works on all devices and automatically updates."
    pageCanonicalUrl="/bookmarklets/esseeoh"
/>
<Hero>
    <span slot="light" class="butt">Esseeoh</span>
    <ul slot="features">
        <li>Its free</li>
        <li>
            Unlike browser extensions Esseeoh can be installed on any browser
            and on any mobile or desktop device
        </li>
        <li>Auto updates so you always have the latest version</li>
        <li>
            Display and edit meta tags. Meta tags pertinent to SEO are also
            validated against suggested character counts
        </li>
        <li>
            Scroll to and highlight all header tags. Each tag can be edited and
            validated against suggested character counts
        </li>
        <li>Count and list all internal and external links</li>
        <li>View Rich Text Snippets and checks for malformatted json</li>
        <li>View sitemap and checks for malformatted xml</li>
    </ul>
</Hero>
<section class="section call-to-action">
    <div class="container">
        <h2>Take Esseeoh out for a spin</h2>
        <button
            on:click={() =>
                getGist(
                    "https://bookmarklets.make-bookmarklets.com/esseeoh.js?",
                )}
            class="button button-bookmarklet">See the value for yourself</button
        >
    </div>
</section>
<section class="section bookmarklet-section">
    <div class="container">
        <div class="bookmarklet-copy">
            <h2>How to install Esseeoh</h2>
            <ol class="how-to-install">
                <li class="desktop-only">
                    Click and drag the <strong>{bookmarkletName}</strong> button
                    to your browsers bookmark bar.
                </li>
                <li class="mobile-only">Click copy button below</li>
                <li class="mobile-only">
                    Create a bookmark on your phone. You can bookmark this page.
                </li>
                <li class="mobile-only">Open up your bookmarks and edit</li>
                <li class="mobile-only">Change the name to Esseeoh</li>
                <li class="mobile-only">
                    Paste the copied code into the url and save
                </li>
                <li class="mobile-only">
                    Not all devices are as simple as clicking the bookmark to
                    launch it. You may need to read up on how your phone or
                    tablet works with bookmarklets
                </li>
                <li>You did it 🎉</li>
            </ol>
        </div>

        <div class="bookmarklet-control">
            <a
                href={bookmarklet}
                on:click={(e) => e.preventDefault()}
                class="button fill-white desktop-only">{bookmarkletName}</a
            >
        </div>
        <input
            type="text"
            class="input mobile-only"
            name="output"
            id="output"
            value={bookmarklet}
        />
        <button
            type="button"
            class="button-copy mobile-only"
            on:click={() => navigator.clipboard.writeText(bookmarklet)}
            >Copy</button
        >
    </div>
</section>

<style lang="scss">
    .call-to-action {
        text-align: center;
    }
    .bookmarklet-section {
        position: relative;
        z-index: 1;
        margin-bottom: 60px;
        .container {
            display: flex;
            justify-content: center;
            padding-left: 72px;
        }
        h2,
        p {
            max-width: 765px;
        }
        h2 {
            margin: 0;
        }
    }
    .bookmarklet-copy {
        max-width: 600px;
        margin-right: 30px;
    }
    .bookmarklet-control {
        display: flex;
        flex-direction: column;
        align-self: center;
    }
    .bookmarklet-input {
        margin-bottom: 20px;
    }
    .button-bookmarklet {
        margin-left: auto;
        background-color: #f78da7;
        line-height: 20px;
    }
    .how-to-install {
        padding-left: 15px;
    }
    @media (max-width: 768px) {
        .section {
            position: relative;
            z-index: 1;
            margin-bottom: 0;
            .container {
                flex-direction: column;
                padding-left: 0;
            }
        }
    }
</style>
