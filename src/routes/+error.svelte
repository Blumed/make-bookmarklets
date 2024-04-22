<script>
    import { browser } from "$app/environment";
    import "$lib/styles/global.scss";
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="true"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Nixie+One&display=swap"
        rel="stylesheet"
    />
    <meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="container">
    <h1>
        <span class="four">4</span>
        <span class="oh">0</span>
        <span class="for">4</span>
    </h1>
    <div class="the-message">
        <img
            src="https://assets.make-bookmarklets.com/goathead.svg"
            role="presentation"
            alt="Goat Head"
            class="the-goat"
        />
    </div>
</div>

<style lang="scss">
    h1 {
        font-family: "Nixie One", cursive;
        text-align: center;
        font-size: 7rem;
        position: relative;
        margin: 0;
        z-index: 4;
        translate: -33px 55px;
        text-align: center;
        color: #d53253;
    }
    span {
        position: absolute;
    }

    .four {
        animation: four 10s infinite;
    }
    .oh {
        top: 10px;
    }
    .for {
        animation: for 10s infinite;
    }
    .the-goat {
        object-fit: cover;
        overflow-clip-margin: inherit;
        overflow: inherit;
    }
    .the-message {
        position: relative;
        z-index: -1;
    }

    @keyframes four {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(1800deg);
        }
    }

    @keyframes for {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(-900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(-1800deg);
        }
    }
</style>
