<script>
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
</script>

<h1>
    {$page.status} error 😭 can't find
    <strong>{browser && window.location.pathname}</strong>
</h1>
