<script type="ts">
	import NewQuestionButton from '../newQuestionButton.svelte';

	import { cards, questionZone, score, type ICard } from '../stores';
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

	let settings = {
		showOptions: false,
		questionOptions: { showImage: false, showLabel: false, playAudio: true },
		answerOptions: { showImage: true, showLabel: false, playAudio: false }
	};
</script>

<NewQuestionButton />
<button
	id="showOptions"
	type="button"
	on:click={() => (settings.showOptions = !settings.showOptions)}>⚙️</button
>
{#if settings.showOptions}
	<div id="forms">
		<form id="questionForm">
			<p>❓</p>
			<hr />
			<label for="questionAudioCheckbox">🔈</label>
			<input
				type="checkbox"
				id="questionAudioCheckbox"
				bind:checked={settings.questionOptions.playAudio}
			/>
			<label for="questionImageCheckbox">🖼️</label>
			<input
				type="checkbox"
				id="questionImageCheckbox"
				bind:checked={settings.questionOptions.showImage}
			/>
			<label for="questionLabelCheckbox">🔤</label>
			<input
				type="checkbox"
				id="questionLabelCheckbox"
				bind:checked={settings.questionOptions.showLabel}
			/>
		</form>
		<br />
		<form id="answerForm">
			<p>🙋</p>
			<hr />
			<label for="answerAudioCheckbox">🔈</label>
			<input
				type="checkbox"
				id="answerAudioCheckbox"
				bind:checked={settings.answerOptions.playAudio}
			/>
			<label for="answerImageCheckbox">🖼️</label>
			<input
				type="checkbox"
				id="answerImageCheckbox"
				bind:checked={settings.answerOptions.showImage}
			/>
			<label for="answerLabelCheckbox">🔤</label>
			<input
				type="checkbox"
				id="answerLabelCheckbox"
				bind:checked={settings.answerOptions.showLabel}
			/>
		</form>
	</div>
{/if}
<div id="score">{$score}/{$cards.length}</div>
<CheckAnswerButton />
<!-- <TestButton /> -->
<div
	class="zone question"
	bind:this={$questionZone.zoneElement}
	on:mousedown={() => $questionZone.audioElement?.play()}
>
	{#each $questionZone.correctAnswers as answer}
		{#if settings.questionOptions.showImage}
			<img class="cardImg" src="static/media/img/{answer}.svg" alt={answer} draggable="false" />
		{/if}
		{#if settings.questionOptions.showLabel}
			<p>{answer}</p>
		{/if}
		{#if settings.questionOptions.playAudio}
			<audio bind:this={$questionZone.audioElement} src="/media/audio/{answer}.mp3">
				<!-- <source src="/media/audio/{moveable.label}.mp3" type="audio/mp3" /> -->
				Your browser does not support the audio element.
			</audio>
			<img class="audioIndicator" src="/media/img/speaker.png" alt="play audio" />
		{/if}
	{/each}
</div>
{#each $cards as moveable}
	<div
		bind:this={moveable.element}
		on:mousedown={() => moveable.audioElement?.play()}
		use:draggable={{ disabled: !moveable.isMoveable }}
		class="card question"
		class:moveable={moveable.isMoveable}
		class:correct={moveable.isSubmitted && moveable.isCorrect}
		class:incorrect={moveable.isSubmitted && !moveable.isCorrect}
	>
		{#if settings.answerOptions.showImage}
			<img class="cardImg" src="/media/img/{moveable.id}.svg" alt={moveable.id} draggable="false" />
		{/if}
		{#if settings.answerOptions.showLabel}
			<p>{moveable.id}</p>
		{/if}
		{#if settings.answerOptions.playAudio}
			<audio bind:this={moveable.audioElement} src="/media/audio/{moveable.id}.mp3">
				<!-- <source src="/media/audio/{moveable.label}.mp3" type="audio/mp3" /> -->
				Your browser does not support the audio element.
			</audio>
			<img class="audioIndicator" src="/media/img/speaker.png" alt="play audio" />
		{/if}
	</div>
{/each}

<style>
	:global(body) {
		font-family: sans-serif;
		background: #2e3440;
	}

	#score {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translate(-50%, 0);
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

	.question .cardImg {
		object-fit: contain;
		max-width: 100px;
		max-height: 100px;
		width: 100px;
		height: auto;
		display: block;
	}

	.question p {
		font-size: larger;
		margin-top: 6px;
		margin-bottom: 0;
		background-color: white;
		color: black;
	}

	.question .audioIndicator {
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
		/* position: relative; */
		margin: auto;
		height: 150px;
		width: 150px;
		outline: 3px dashed whitesmoke;
		z-index: 0;
		/* visibility: hidden; */
	}

	#showOptions {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 50px;
		height: 50px;
	}

	#forms {
		position: absolute;
		bottom: 10px;
		right: 70px;
		text-align: center;
		z-index: 2;
	}

	#forms > form {
		background-color: rgba(220, 220, 220, 0.9);
	}

	#forms > form > input {
		width: 30px;
		height: 30px;
		margin-right: 20px;
	}

	#forms > form > label {
		font-size: 30px;
		margin-left: 20px;
	}
</style>
