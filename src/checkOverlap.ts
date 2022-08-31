export function areOverlapping(a?: HTMLElement, b?: HTMLElement) {
	if (!a || !b) return false;

	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	if (bRect.left > aRect.right || bRect.right < aRect.left) {
		return false;
	} //overlap not possible
	if (bRect.top > aRect.bottom || bRect.bottom < aRect.top) {
		return false;
	} //overlap not possible
	return true;
}
