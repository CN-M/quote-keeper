<script>
	import './style.css';
</script>

<div class="h-screen w-screen flex flex-col justify-between">
	<header class="h-20 flex justify-center items-center border-b border-emerald-300/75">
		<p class="text-black">This is a header</p>
	</header>

	<!-- <main class="flex-1 flex flex-col items-center justify-center"> -->
	<main class="flex-1">
		<slot />
	</main>

	<footer class="h-20 border-t border-emerald-300/75 flex justify-center items-center">
		<p class="text-black">This is a Footer</p>
	</footer>
</div>
