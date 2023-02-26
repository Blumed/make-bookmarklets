<script>
    import "$lib/styles/global.scss";
</script>

<slot />
<footer class="section">
    <div class="container">
        <p>
            &copy;{new Date().getFullYear()} Make Bookmarklets |
            <a href="/privacy-policy">Privacy Policy</a>
        </p>

        <p>
            Made with lots of ❤️ by
            <a
                href="https://cullanluther.com"
                target="_blank"
                rel="noopener noreferrer">CullanLuther</a
            >
        </p>
    </div>
</footer>

<style lang="scss">
    .section {
        padding-block: 10px;
    }
    .container {
        display: flex;
        justify-content: space-between;
    }
    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            justify-content: flex-start;
            p {
                margin-top: 0;
                &:first-child {
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
