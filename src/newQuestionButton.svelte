<script lang="ts">
	import Card from './card.svelte';

	import { cards, currentQuestion } from './stores';

	function newQuestionEvent() {
		chooseNewQuestion();
		resetAnswers();
	}

	function chooseNewQuestion() {
		const newIndex = Math.floor(Math.random() * $cards.length);
		const newAnswerCard = $cards[newIndex];
		$currentQuestion.correctAnswers = [newAnswerCard.label!];
		newAnswerCard.playAudio();
	}

	function resetAnswers() {
		$cards.forEach((card) => (card.isSubmitted = false));
	}
</script>

<button id="newQuestion" on:click={newQuestionEvent}>
	<img src="./media/img/next.png" alt="New Question" />
</button>
