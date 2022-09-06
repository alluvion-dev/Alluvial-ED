<script lang="ts">
	import { cards, currentQuestion, score } from './stores';
	import { areOverlapping } from './checkOverlap';

	function checkAnswerEvent() {
		const overlappingCards = $cards.filter((moveable) => {
			return areOverlapping(moveable?.element, $currentQuestion.target);
		});

		let isCorrect = false;
		if (overlappingCards.length === 1) {
			const submittedCard = overlappingCards[0];
			submittedCard.isSubmitted = true;
			isCorrect = $currentQuestion.correctAnswers.includes(submittedCard.id);
			submittedCard.isCorrect = isCorrect;
			$cards = $cards; //tell svelte to react, since we're not editing cards directly
			$score = isCorrect ? $score + 1 : 0;
		}

		//     if (isCorrect) {
		//     document.getElementById('newQuestion').disabled = false;
		//     event.currentTarget.disabled = true;
		//     }

		//     const question = questionOrder[questionOrder.length - 1];
		//     if (!question.hasOwnProperty("wasCorrect")) {
		//     question.wasCorrect = isCorrect;
		//     if (isCorrect) {
		//         if (!correctAnswers.includes(question.answer)) {
		//         correctAnswers.push(question.answer);
		//         }
		//     } else {
		//         correctAnswers.length = 0;
		//     }
		//     updateScoreText();
		//     }
	}
</script>

<button id="checkAnswer" on:click={checkAnswerEvent}>
	<img src="./media/img/yesno.png" alt="Check Answer" />
</button>
