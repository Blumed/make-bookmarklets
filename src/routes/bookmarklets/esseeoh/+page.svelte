<script lang="ts">
    import Seo from "$lib/components/page-meta.svelte";

    let bookmarkletName = "✨Esseeoh✨";
    const bookmarklet = `javascript:(function()%7B(function()%7Basync function getGist(url)%7Btry%7Bconst response=await fetch(url+Math.random()),gistData=await response.text();if(!response.ok)throw new Error("Network response was not OK");return eval(gistData)%7Dcatch(t)%7Bconsole.log("error",t)%7D%7DgetGist("https://gist.githubusercontent.com/Blumed/b6d4e56b5d943b235c6cf540a51a5bd5/raw/seo-bookmarklet.js?")%7D)();%7D());`;
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
<section class="section call-to-action">
    <div class="container">
        <h2>Take Esseeoh out for a spin</h2>
        <button
            on:click={() =>
                getGist(
                    "https://gist.githubusercontent.com/Blumed/b6d4e56b5d943b235c6cf540a51a5bd5/raw/seo-bookmarklet.js?"
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
                <li>
                    Click and drag the <strong>{bookmarkletName}</strong> button
                    to your browsers bookmark bar.
                </li>
                <li>You did it 🎉</li>
            </ol>
        </div>

        <div class="bookmarklet-control">
            <a
                href={bookmarklet}
                on:click={(e) => e.preventDefault()}
                class="button fill-white">{bookmarkletName}</a
            >
        </div>
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
        .bookmarklet-section {
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
