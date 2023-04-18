<script>
    // Going to make something fun here soon.
    let dimension = "20";

    const increaseLove = () => (dimension = (Number(dimension) * 2).toString());
</script>

<span
    on:click={() => increaseLove()}
    tabindex="0"
    role="button"
    aria-label="Click and my heart grows"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={dimension}
        height={dimension}
        style={`top: -${dimension === "20" ? "0" : dimension}px;left: -${
            dimension === "20" ? "0" : dimension
        }px;`}
        viewBox="0 0 24 24"
        ><path
            d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z"
            fill="#ec6e89"
        /></svg
    >
</span>

<style lang="scss">
    span {
        position: relative;
        width: 24px;
        display: inline-block;
        height: 24px;
        vertical-align: bottom;
        border: 0;
        box-shadow: none;
        padding: 0;
        &:hover {
            box-shadow: none !important;
        }
        svg {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
    }
</style>
