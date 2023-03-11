<script>
    import { slide } from "svelte/transition";
    export let id = "";
    export let title = "";
    let isExpanded = false;
</script>

<h3>
    <button
        class="button"
        id={`${id}-header`}
        aria-controls={`${id}-panel`}
        aria-expanded={isExpanded}
        on:click={() => (isExpanded = !isExpanded)}>{title}</button
    >
</h3>
{#key isExpanded}
    <section
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        hidden={!isExpanded}
        in:slide
        out:slide
    >
        <slot />
    </section>
{/key}

<style lang="scss">
    h3 {
        font-size: 1.2675rem;
        margin-top: 27px;
        margin-bottom: 0;
    }
    section {
        padding: 35px 15px 0;
    }
    .button {
        border-radius: 0;
        box-shadow: 12px 12px 0 0 var(--pink-color);
        line-height: 25px;
        padding-right: 50px;
        position: relative;

        &::after {
            content: "";
            width: 12px;
            background-color: var(--red-color);
            height: 2px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        &::before {
            content: "";
            width: 2px;
            background-color: var(--red-color);
            height: 12px;
            position: absolute;
            right: 25px;
            top: 50%;
            transform: rotate(0deg) translateY(-50%);
            transform-origin: 50% 0px;
            transition: all 0.4s ease;
        }
        &[aria-expanded="true"]::before {
            transform: rotate(90deg) translateY(-6px);
        }
    }
    @media (max-width: 768px) {
        .button {
            text-align: left;
        }
    }
</style>
