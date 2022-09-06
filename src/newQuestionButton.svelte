<script lang="ts">
	import { cards, currentQuestion } from './stores';

	// TODO for now just updates current question, but we want to create a new question
	function nextQuestionEvent() {
		const newAnswer = $cards[Math.floor(Math.random() * $cards.length)];
		$currentQuestion.correctAnswers = [newAnswer.id];
		newAnswer.audioElement?.play(); // TODO don't manually type this. make a Map and look it up?
		$cards.forEach((card) => (card.isSubmitted = false));
	}
</script>

<button id="newQuestion" on:click={nextQuestionEvent}>
	<img src="./media/img/next.png" alt="New Question" />
</button>
