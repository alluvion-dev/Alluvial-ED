<script type="ts">
	import NewQuestionButton from '../newQuestionButton.svelte';

	import Zone from '../zone.svelte';
	import Card from '../card.svelte';
	import { cards, currentQuestion, score } from '../stores';
	import CheckAnswerButton from '../checkAnswerButton.svelte';
	import TestButton from '../testButton.svelte';

	let words = ['red', 'blue', 'green'];

	$currentQuestion.correctAnswers.push(words[0]);
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
<Zone bind:element={$currentQuestion.target} />
{#each words as word, i}
	<Card
		bind:this={$cards[i]}
		imgSrc="https://www.adrobiso.com/media/img/{word}.svg"
		label={word}
		audioSrc="https://www.adrobiso.com/media/audio/{word}.mp3"
	/>
{/each}

<style>
	:global(body) {
		font-family: sans-serif;
		background: #2e3440;
	}

	:global(.moveable) {
		z-index: 1;
		filter: drop-shadow(0.3rem 0.3rem 0.3rem rgba(0, 0, 20, 0.8));
		touch-action: none;
	}

	#score {
		/* position: absolute;
		top: 10px;
		left: 50%;
		transform: translate(-50%, 0); */
		color: white;
		font-size: x-large;
	}
</style>
