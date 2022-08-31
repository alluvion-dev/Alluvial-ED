import { draggable } from '@neodrag/svelte';

export function moveable(node: HTMLElement, enabled = true) {
	const draggableAction = draggable(node, { disabled: !enabled });

	if (enabled) {
		node.classList.add('moveable');
	}

	return {
		destroy() {
			draggableAction.destroy();
		},

		update(enabled: boolean) {
			draggableAction.update({ disabled: !enabled });

			if (enabled) {
				node.classList.add('moveable');
			} else {
				node.classList.remove('moveable');
			}
		}
	};
}
