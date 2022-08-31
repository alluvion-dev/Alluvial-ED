<script>
	export let element;
</script>

<div bind:this={element} />

<style>
	div {
		height: 150px;
		width: 150px;
		outline: 3px dashed whitesmoke;
		z-index: 0;
	}
</style>
