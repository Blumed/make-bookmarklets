<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript, esLint } from "@codemirror/lang-javascript";
    import { linter, lintGutter } from "@codemirror/lint";
    import * as eslint from "eslint-linter-browserify";
    import { oneDark } from "@codemirror/theme-one-dark";
    import { config } from "$lib/components/constants";
    export let codeEditor: string = "";
</script>

<CodeMirror
    bind:value={codeEditor}
    lang={javascript()}
    theme={oneDark}
    extensions={[
        javascript(),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config)),
    ]}
/>
