export const defaultQueryFn = async (endpoint: string) => {
	const {data} = await fetch(`${endpoint[0]}`).then(res => res.json());
	return data;
};
