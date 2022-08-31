<script lang="ts">
	import { cards } from './stores';
	import type Card from './card.svelte';

	function testEvent() {
		// groupElements(
		// 	($cards as Card[]).map((card) => {
		// 		return card.element;
		// 	})
		// );

		toggleMoveable();
	}

	function toggleMoveable() {
		($cards as Card[]).forEach((card) => {
			card.isMoveable = !card.isMoveable;
		});
	}

	function groupElements(elements: (HTMLElement | undefined)[]) {
		let outerDiv = document.createElement('div');
		elements[0]?.parentElement?.appendChild(outerDiv);
		elements.forEach((element) => {
			if (element) {
				outerDiv.appendChild(element);
			}
		});
	}
</script>

<button id="test" on:click={testEvent}> test </button>
