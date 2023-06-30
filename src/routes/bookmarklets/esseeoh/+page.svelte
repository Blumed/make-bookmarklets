<script lang="ts">
    import Seo from "$lib/components/page-meta.svelte";

    let bookmarkletName = "Drag Me To Your Nearest Bookmark Bar";
    let bookmarklet = `javascript:(function()%7B(function()%7Basync function getGist(url)%7Btry%7Bconst response=await fetch(url+Math.random()),gistData=await response.text();if(!response.ok)throw new Error("Network response was not OK");return eval(gistData)%7Dcatch(t)%7Bconsole.log("error",t)%7D%7DgetGist("https://gist.githubusercontent.com/Blumed/b6d4e56b5d943b235c6cf540a51a5bd5/raw/seo-bookmarklet.js?")%7D)();%7D());`;
</script>

<Seo
    title="SEO Bookmarklet | Make Bookmarklets"
    pageMetaDescription="Identify and validate webpage SEO. Works on all devices and automatically updates."
    pageCanonicalUrl="/bookmarklets/esseeoh"
/>

<section class="section bookmarklet-section">
    <div class="container">
        <div class="bookmarklet-copy">
            <h2>About this SEO bookmarklet</h2>
            <p>
                Name it whatever you would like and if you are on desktop drag
                it up into your bookmark bar. This bookmarklet points to a
                github gist and you will receive automatic updates as I work on
                it. This bookmarklet is still in early beta, so any feedback is
                welcome. If something isn't working the way it should or if
                there is a feature you would like please feel free to contact
                me.
            </p>
        </div>

        <div class="bookmarklet-control">
            <div class="bookmarklet-input">
                <label for="name">Name your Bookmarklet</label>
                <input
                    type="text"
                    id="name"
                    class="input"
                    bind:value={bookmarkletName}
                />
            </div>

            <a
                href={bookmarklet}
                on:click={(e) => e.preventDefault()}
                class="button button-bookmarklet">{bookmarkletName}</a
            >
        </div>
    </div>
</section>

<style lang="scss">
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
