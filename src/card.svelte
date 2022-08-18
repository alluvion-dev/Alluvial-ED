<script lang="ts">
    import { draggable } from '@neodrag/svelte';

    export let imgSrc = 'https://www.adrobiso.com/media/img/blue.svg';
    export let label = 'blue';
    export let audioSrc = "";

    let audioElement : HTMLAudioElement;

    function handleClick() {
        audioElement.play();
    }
</script>

<div class="moveable" on:mousedown={handleClick} use:draggable>
    <img class="cardImg" src={imgSrc} alt={label} draggable="false">
    <p>{label}</p>
    <audio bind:this={audioElement}>
        <source src={audioSrc} type="audio/mp3">
        Your browser does not support the audio element.
    </audio> 
    <img class="audioIndicator" src='https://www.adrobiso.com/media/img/speaker.png' alt='play audio'>
</div>

<style>
    .moveable {
        z-index: 1;
        filter: drop-shadow(0.3rem 0.3rem 0.3rem rgba(0, 0, 20, 0.8));
        touch-action: none;
    }

    div {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .cardImg {
        object-fit: contain;
        max-width: 100px;
        max-height: 100px;
        width: 100px;
        height: auto;
        display: block;
    }

    p {
        font-size: larger;
        margin-top: 6px;
        margin-bottom: 0;
        background-color: white;
        color: black;
    }

    .audioIndicator {
        width: 20px;
    }
</style>