<script lang="ts">
    interface ButtonProps {
        buttonText: string | undefined;
        type: "button" | "submit" | "reset" | null | undefined;
        href: string | undefined;
        ariaExpanded: boolean | undefined;
        ariaControls: string | undefined;
        handleClick?: () => void | undefined | boolean;
    }

    export let buttonText: ButtonProps["buttonText"] = undefined;
    export let type: ButtonProps["type"] = undefined;
    export let href: ButtonProps["href"] = undefined;
    export let ariaExpanded: ButtonProps["ariaExpanded"] = undefined;
    export let ariaControls: ButtonProps["ariaControls"] = undefined;
    export let handleClick: ButtonProps["handleClick"] = undefined;
</script>

{#if href}
    <a {href} class="button {$$restProps.class}"
        ><span class="button-text">{buttonText}</span></a
    >
{:else}
    <button
        {type}
        class="button {$$restProps.class}"
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        on:click={() => handleClick && handleClick()}
        ><span class="button-text">{buttonText}</span></button
    >
{/if}

<style lang="scss">
    .button {
        display: inline-block;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
        padding: 15px 20px;
        border: 2px solid currentColor;
        color: var(--black-color);
        border-radius: 0.25rem;
        background-color: transparent;
        box-shadow: 6px 6px 0 0 var(--black-color);
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        text-decoration: none;
        transition: var(--global-transition);
        line-height: 1;
        cursor: pointer;
        .button-text {
            display: inline-block;
            vertical-align: sub;
        }
        &:focus-within:not(:hover) {
            &:after {
                opacity: 0;
            }
            &:before {
                opacity: 0;
            }
        }

        &.button-bookmarklet {
            background-color: #f78da7;
        }
        &.fill-clay {
            background-color: var(--clay-color);
            &:hover {
                background-color: var(--purple-color);
            }
        }
        &.fill-white {
            background-color: #ffffff;
            &:hover {
                background-color: var(--turquoise-color);
            }
        }
        &.button-reset {
            &:hover {
                background-color: var(--pink-color);
            }
        }
        &:hover {
            background-color: var(--clay-color);
            &:after {
                rotate: -45deg;
                translate: -6px 2.5px;
                height: 1.5px;
            }
            &:before {
                rotate: 45deg;
                translate: -6px -2px;
                height: 1.5px;
            }
        }
        &::after {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            width: 10px;
            height: 1px;
            background-color: var(--pure-black);
            transition: var(--global-transition);
            rotate: 90deg;
            translate: 6px 0px;
        }
        &::before {
            content: "";
            position: absolute;
            right: 0;
            bottom: 50%;
            width: 10px;
            height: 1px;
            background-color: var(--pure-black);
            transition: var(--global-transition);
            rotate: -270deg;
            translate: 6px 0px;
        }
        &[aria-expanded="false"]:hover {
            padding-right: 30px;
            &:before {
                rotate: 45deg;
                translate: -12px 4px;
                height: 1.5px;
            }
        }
        &[aria-expanded="true"]:hover {
            padding-right: 30px;
            &:before {
                rotate: -45deg;
                translate: -12px 4px;
            }
            &:after {
                rotate: 45deg;
                translate: -6px 2.5px;
            }
        }
    }
    :global(.button + .button) {
        margin-left: 20px;
    }

    @media (max-width: 768px) {
        :global(.button + .button) {
            margin-top: 20px;
            margin-left: 0;
        }
    }
</style>
