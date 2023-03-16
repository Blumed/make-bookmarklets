<script>
    // Going to make something fun here soon.
    let width = "20";
    let height = "20";

    const increaseLove = () => {
        width = (Number(width) * 2).toString();
        height = (Number(height) * 2).toString();
    };
</script>

<span>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        {width}
        {height}
        style={`top: -${width === "20" ? "0" : width}px;left: -${
            width === "20" ? "0" : width
        }px;`}
        viewBox="0 0 24 24"
        on:click={() => increaseLove()}
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
        svg {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            cursor: pointer;
        }
    }
</style>
