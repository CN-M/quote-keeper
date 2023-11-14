// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

export const load = async ({ fetch }) => {
	// const getstuff = async <TData>(): Promise<TData> => {
	const getstuff = async () => {
		const res = await fetch('https://api.quotable.io/random');
		const data = await res.json();

		return data as QuoteType;
	};

	return getstuff();
};
