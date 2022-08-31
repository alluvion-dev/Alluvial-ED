<script lang="ts">
	import { cards, currentQuestion, score } from './stores';
	import { areOverlapping } from './checkOverlap';

	function checkAnswerEvent() {
		const isCorrect = checkAnswer();
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

	function checkAnswer() {
		const overlappingCards = $cards.filter((card) => {
			return areOverlapping(card?.element, $currentQuestion.target);
		});

		if (overlappingCards.length === 1) {
			const submittedCard = overlappingCards[0];
			submittedCard.isSubmitted = true;
			const isCorrect = $currentQuestion.correctAnswers.includes(submittedCard.label!);
			submittedCard.isCorrect = isCorrect;
			$score = isCorrect ? $score + 1 : 0;
			return isCorrect;
		} else {
			return false;
		}
	}
</script>

<button id="checkAnswer" on:click={checkAnswerEvent}>
	<img src="./media/img/yesno.png" alt="Check Answer" />
</button>
