<script lang="ts">
	import { cards, questionZone, score, State, state } from './stores';
	import { areOverlapping } from './checkOverlap';

	// Should we send events (or something) instead of modifying "global" stores?
	function checkAnswerEvent() {
		const overlappingCards = $cards.filter((moveable) => {
			return areOverlapping(moveable?.element, $questionZone.zoneElement);
		});

		let isCorrect = false;
		if (overlappingCards.length === 1) {
			const submittedCard = overlappingCards[0];
			submittedCard.isSubmitted = true;
			isCorrect = $questionZone.correctAnswers.includes(submittedCard.id);
			submittedCard.isCorrect = isCorrect;
			$cards = $cards; //tell svelte to react, since we're not editing cards directly
			if (isCorrect) {
				$state = State.Review;
				if ($questionZone.numAttemptsTaken === 0) {
					$score++;
				}
			} else {
				$score = 0;
			}
			$questionZone.numAttemptsTaken++;
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

<button id="checkAnswer" on:click={checkAnswerEvent} disabled={$state !== State.Asking}>
	<img src="./media/img/yesno.png" alt="Check Answer" />
</button>

<style>
	#checkAnswer {
		position: absolute;
		height: 90px;
		left: 10px;
		top: 10px;
		border-radius: 6px;
	}

	#checkAnswer > img {
		width: 80px;
		height: auto;
	}

	#checkAnswer:disabled > img {
		opacity: 0.3;
	}
</style>
