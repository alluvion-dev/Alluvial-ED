<script lang="ts">
	import { cards, type IMoveable } from './stores';

	function testEvent() {
		// groupElements(
		// 	($cards as Card[]).map((card) => {
		// 		return card.element;
		// 	})
		// );

		// toggleMoveable();

		changeALabel();
	}

	function changeALabel() {
		$cards[0].id = 'yellow';
	}

	function toggleMoveable() {
		$cards.forEach((card) => {
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
