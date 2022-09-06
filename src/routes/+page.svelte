<script type="ts">
	import NewQuestionButton from '../newQuestionButton.svelte';

	import { cards, currentQuestion, score, type ICard } from '../stores';
	import CheckAnswerButton from '../checkAnswerButton.svelte';
	import TestButton from '../testButton.svelte';
	import { draggable } from '@neodrag/svelte';

	let words = ['red', 'blue', 'green'];
	words.forEach((word) => {
		let card: ICard = {
			id: word,
			isMoveable: true,
			isSubmitted: false,
			isCorrect: false
		};
		$cards.push(card);
	});
</script>

<NewQuestionButton />
<!-- <button id="showOptions" type="button">⚙️</button>
   <div id="forms">
      <form id="questionForm">
         <p>❓</p>
         <hr>
         <label for="questionAudioCheckbox">🔈</label>
         <input type="checkbox" id="questionAudioCheckbox">
         <label for="questionImageCheckbox">🖼️</label>
         <input type="checkbox" id="questionImageCheckbox">
         <label for="questionLabelCheckbox">🔤</label>
         <input type="checkbox" id="questionLabelCheckbox">
      </form>
      <br>
      <form id="answerForm">
         <p>🙋</p>
         <hr>
         <label for="answerAudioCheckbox">🔈</label>
         <input type="checkbox" id="answerAudioCheckbox" checked='false'>
         <label for="answerImageCheckbox">🖼️</label>
         <input type="checkbox" id="answerImageCheckbox" checked='true'>
         <label for="answerLabelCheckbox">🔤</label>
         <input type="checkbox" id="answerLabelCheckbox" checked='false'>
      </form>
   </div> -->
<div id="score">{$score}</div>
<CheckAnswerButton />
<TestButton />
<div class="zone" bind:this={$currentQuestion.target} />
{#each $cards as moveable}
	<div
		bind:this={moveable.element}
		on:mousedown={() => moveable.audioElement?.play()}
		use:draggable={{ disabled: !moveable.isMoveable }}
		class="card"
		class:moveable={moveable.isMoveable}
		class:correct={moveable.isSubmitted && moveable.isCorrect}
		class:incorrect={moveable.isSubmitted && !moveable.isCorrect}
	>
		<img
			class="cardImg"
			src="https://www.adrobiso.com/media/img/{moveable.id}.svg"
			alt={moveable.id}
			draggable="false"
		/>
		<p>{moveable.id}</p>
		<audio
			bind:this={moveable.audioElement}
			src="https://www.adrobiso.com/media/audio/{moveable.id}.mp3"
		>
			<!-- <source src="https://www.adrobiso.com/media/audio/{moveable.label}.mp3" type="audio/mp3" /> -->
			Your browser does not support the audio element.
		</audio>
		<img
			class="audioIndicator"
			src="https://www.adrobiso.com/media/img/speaker.png"
			alt="play audio"
		/>
	</div>
{/each}

<style>
	:global(body) {
		font-family: sans-serif;
		background: #2e3440;
	}

	#score {
		/* position: absolute;
		top: 10px;
		left: 50%;
		transform: translate(-50%, 0); */
		color: white;
		font-size: x-large;
	}

	.card {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		touch-action: none;
	}

	.card .cardImg {
		object-fit: contain;
		max-width: 100px;
		max-height: 100px;
		width: 100px;
		height: auto;
		display: block;
	}

	.card p {
		font-size: larger;
		margin-top: 6px;
		margin-bottom: 0;
		background-color: white;
		color: black;
	}

	.card .audioIndicator {
		width: 20px;
	}

	div.correct {
		filter: drop-shadow(0 0 1.6rem lightgreen);
	}

	div.incorrect {
		filter: drop-shadow(0 0 1.6rem red);
	}

	.moveable {
		z-index: 1;
		filter: drop-shadow(0.3rem 0.3rem 0.3rem rgba(0, 0, 20, 0.8));
		touch-action: none;
	}

	.zone {
		height: 150px;
		width: 150px;
		outline: 3px dashed whitesmoke;
		z-index: 0;
	}
</style>
