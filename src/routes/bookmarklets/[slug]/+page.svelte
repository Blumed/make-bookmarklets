<script>
    import Hero from "$lib/components/hero.svelte";
    import CodeEditor from "$lib/components/editor.svelte";

    export let data;
    export let codeEditor;

    let codeInput = codeEditor;
    //if (codeInput === "") {codeInput = data.code}
    $: codeInput = codeInput;
    console.log('on page codeInput', codeInput);
</script>

<Hero>
    <span slot="light">{data.title}</span>
    <ul slot="features">
        <li>{data.copy}</li>
    </ul>
</Hero>

<div class="section code-editor" id="editor">
    <div class="container-small">
        <div class="editor-wrapper">
            <CodeEditor bind:codeEditor={codeInput} />
        </div>
    </div>
</div>
