<script lang="ts">
	// export let data: QuoteType;

	let storedQuotes: string | null = '';

	let mainQuotes: QuoteType[] = [];

	const getData = async () => {
		const res = await fetch('https://api.quotable.io/random');
		const data = await res.json();

		return data as QuoteType;
	};

	let data = getData();
	// console.log(data);

	const fetchData = async () => {
		data = await getData();
	};

	fetchData();

	if (typeof window !== 'undefined') {
		storedQuotes = localStorage.getItem('Quotes');

		if (storedQuotes) {
			mainQuotes = JSON.parse(storedQuotes);
			console.log(mainQuotes);
		}
	}

	const getNewQuote = async () => {
		try {
			const data = await getData();
			return data;
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};

	// const bookMarkQuote = async (): Promise<void> => {
	const bookMarkQuote = () => {
		// quotes = [...quotes, data];
		// const data = await getData();
		const data = getData();
		mainQuotes = [...mainQuotes, data];
		// mainQuotes.push(data);
		localStorage.setItem('Quotes', JSON.stringify(mainQuotes));
	};

	const deleteQuote = (idx: number): void => {
		mainQuotes = mainQuotes.filter((quote, i) => i !== idx);

		// mainQuotes = mainQuotes.splice(idx, 1);

		localStorage.setItem('Quotes', JSON.stringify(mainQuotes));
	};
</script>

<div class="flex flex-col justify-center items-center w-full p-10 space-y-5">
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-3xl">Saved Quotes</h1>
		{#if mainQuotes.length < 1}
			<div
				class="border flex flex-col justify-center items-center p-5 m-2 rounded-lg border-emerald-300"
			>
				<p class="text-xl p-5 text-center">Getting Saved Quotes...</p>
			</div>
		{:else}
			{#each mainQuotes as { content, author }, idx}
				<!-- {#each quotes as { content, author }, idx} -->
				<div
					class="border flex flex-col justify-center items-center p-5 m-2 rounded-lg border-emerald-300"
				>
					<p class="text-xl p-5 text-center">"{content}"</p>
					<p class="text-xl font-bold">- {author}</p>
					<button
						class="bg-red-400 mt-2 p-3 rounded-md text-white hover:opacity-80"
						on:click={() => deleteQuote(idx)}
					>
						Delete Quote
					</button>
				</div>
			{/each}
		{/if}
	</div>

	<div class="flex flex-col justify-center items-center border-t border-b p-5">
		<h1 class="text-3xl">Newest Quotes</h1>
		{#await data}
			<div
				class="border flex flex-col justify-center items-center p-5 m-2 rounded-lg border-blue-300"
			>
				<p class="text-xl p-5 text-center">Getting quote...</p>
			</div>
		{:then { content, author }}
			<div
				class="border flex flex-col justify-center items-center p-5 m-2 rounded-lg border-blue-300"
			>
				<p class="text-xl p-5 text-center">"{content}"</p>
				<p class="text-xl font-bold">- {author}</p>
			</div>
		{/await}
	</div>

	<div class="space-x-10">
		<button class="bg-blue-500 p-5 rounded-md text-white hover:opacity-80" on:click={getNewQuote}>
			Get New Quote
		</button>
		<button
			class="bg-slate-500 p-5 rounded-md text-white hover:opacity-80"
			on:click={bookMarkQuote}
		>
			Bookmark Quote
		</button>
	</div>
</div>
