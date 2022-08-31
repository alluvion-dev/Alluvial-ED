<svelte:options accessors={true} />

<script lang="ts">
	import { moveable } from './moveable';
	export let imgSrc = '';
	export let label = '';
	export let audioSrc = '';
	export let element: HTMLElement | undefined = undefined;
	export let isMoveable = true;
	export let isSubmitted = false;
	export let isCorrect = false;

	$: correct = isSubmitted && isCorrect;
	$: incorrect = isSubmitted && !isCorrect;

	let audioElement: HTMLAudioElement;

	function handleClick() {
		playAudio();
	}

	export function playAudio() {
		audioElement.play();
	}
</script>

<div
	bind:this={element}
	on:mousedown={handleClick}
	use:moveable={isMoveable}
	class:correct
	class:incorrect
>
	<img class="cardImg" src={imgSrc} alt={label} draggable="false" />
	<p>{label}</p>
	<audio bind:this={audioElement}>
		<source src={audioSrc} type="audio/mp3" />
		Your browser does not support the audio element.
	</audio>
	<img
		class="audioIndicator"
		src="https://www.adrobiso.com/media/img/speaker.png"
		alt="play audio"
	/>
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		touch-action: none;
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

	.correct {
		filter: drop-shadow(0 0 1.6rem lightgreen);
	}

	.incorrect {
		filter: drop-shadow(0 0 1.6rem red);
	}
</style>
