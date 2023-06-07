import { asteroid } from "@/response";

export type APIResponse = {
	// auto generated from json
	links: {
		next: string;
		previous: string;
		self: string;
	};
	element_count: number;
	near_earth_objects: {
		[date: string]: Array<asteroid>;
	};
};

export async function fetchAPI(
	start: Date | string,
	end: Date | string,
): Promise<APIResponse | null> {
	const stringify = (date: Date | string) => {
		if (typeof date === "string") return date;
		return date.toISOString().slice(0, 10); // the date in the format "yyyy-mm-dd"
	};
	const input = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${stringify(
		start,
	)}&end_date=${stringify(end)}&api_key=DEMO_KEY`;
	const res = await fetch(input);
	if (!res.ok) {
		console.log(`Failed to fetch data: ${await res.text()}`);
		return null;
	}

	return await res.json();
}
