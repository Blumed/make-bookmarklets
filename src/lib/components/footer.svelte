<script lang="ts">
    import Heart from "$lib/components/heart-icon/heart.svelte";
    import DialogContact from '$lib/components/dialogs/contact.svelte';
    import DialogPrivacy from '$lib/components/dialogs/privacy.svelte';
</script>

<footer class="footer-section section">
    <div class="container">
        <div class="contact-section">
            <h2>Say Hello</h2>
            <p>
                Let me know if you have any questions, or if you just want to
                say hi.
            </p>
            <DialogContact />
        </div>
        <div class="boring-section">
            <p>
                Copyright &copy;{new Date().getFullYear()} All Rights Reserved | <DialogPrivacy />
            </p>

            <p>
                Made with lots of <Heart /> by
                <a
                    href="https://cullanluther.com"
                    target="_blank"
                    rel="noopener">Cullan Luther</a
                >
            </p>
        </div>
    </div>
</footer>

<style lang="scss">
    .footer-section {
        padding-block: 10px;
    }

    .contact-section {
        padding: 0 40px 40px;
        text-align: center;
        h2 {
            text-align: right;
            max-width: 360px;
            margin-bottom: 0;
        }
        p {
            display: inline-block;
        }
        .button {
            margin-left: 20px;
        }
    }

    .boring-section {
        display: flex;
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        .contact-section {
            padding-inline: 0;
            text-align: left;
            h2 {
                margin-left: 0;
                max-width: 100%;
                text-align: left;
            }
            .button {
                margin-left: 0;
            }
        }
        
        .boring-section {
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