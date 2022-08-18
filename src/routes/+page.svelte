<script>
    import Card from "../card.svelte";

    let words = ['red', 'blue', 'green'];
</script>

{#each words as word}
    <Card imgSrc='https://www.adrobiso.com/media/img/{word}.svg' label={word} audioSrc='https://www.adrobiso.com/media/audio/{word}.mp3'/>
{/each}

<style>
    :global(body){
        background: #2e3440;
    }
</style>