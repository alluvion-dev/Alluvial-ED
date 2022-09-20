<script lang="ts">
	import { tick } from 'svelte';
	import { cards, questionZone, State, state } from './stores';

	// TODO for now just updates current question, but we want to create a new question
	async function nextQuestionEvent() {
		$questionZone.currentQuestion =
			$questionZone.questions[Math.floor(Math.random() * $questionZone.questions.length)];
		$questionZone.currentQuestion.numAttemptsTaken = 0;
		await tick();
		$questionZone.audioElement?.load();
		$questionZone.audioElement?.play(); // TODO wait for new audio to load
		$cards.forEach((card) => (card.isSubmitted = false));
		$cards = $cards; //tell svelte to react, since we're not editing $cards directly
		$state = State.Asking;
	}
</script>

<button id="newQuestion" on:click={nextQuestionEvent} disabled={$state === State.Asking}>
	<img src="./media/img/next.png" alt="New Question" />
</button>

<style>
	#newQuestion {
		position: absolute;
		background-color: lightgreen;
		border-color: rgb(178, 236, 178);
		border-radius: 6px;
		right: 10px;
		top: 10px;
	}

	#newQuestion > img {
		width: 80px;
		height: auto;
	}

	#newQuestion:disabled {
		background-color: revert;
		border-color: revert;
		opacity: 0.5;
	}
</style>
