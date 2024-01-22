<script lang="ts">
    let toggleNavigation = false;
</script>

<a href="#skip-main-navigation" class="sr-only">Skip Main Navigation</a>
<nav>
    <ul id="main-navigation" class="list-unstyled">
        <li><a href="/">Home</a></li>
        <li>
            <svg
                aria-hidden="true"
                focusable="false"
                class="svg-circle unfilled"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                ><path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                ></path></svg
            >
        </li>
        <li><a href="/bookmarklets">Bookmark Library</a></li>
    </ul>
</nav>

<style lang="scss">
    nav {
        position: absolute;
        z-index: 2;
        top: 20px;
        right: 5%;
        display: flex;
        flex-direction: row-reverse;
        color: var(--color-black);
    }
    .svg-circle {
        width: 12px;
        height: 12px;
        color: white;
    }
    #main-navigation {
        display: flex;
        align-items: center;
        li {
            padding-inline: 8px;
            a {
                color: inherit;
            }
        }
    }
</style>
