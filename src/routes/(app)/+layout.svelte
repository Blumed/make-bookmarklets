<script lang="ts">
    import "$lib/styles/global.scss";
    import Heart from "$lib/components/heart-icon/heart.svelte";
    import MainNavigation from "$lib/components/main-navigation.svelte";
    import Footer from "$lib/components/footer.svelte";
</script>

<MainNavigation />

<main id="skip-main-navigation">
    <slot />
</main>

<Footer />
