<script>
	import Lesson from "./components/Lesson.svelte"
	import { tips } from './test-utils/data';
</script>

<div>
	<Lesson country={"Argentina"} tips={tips} />
</div>

<style>
	div {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
</style>
