import { AsteroidList } from "./asteroids";

type APIResponse = {
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

export type asteroid = {
	links: {
		self: string;
	};
	id: string;
	neo_reference_id: string;
	name: string;
	nasa_jpl_url: string;
	absolute_magnitude_h: number;
	estimated_diameter: {
		kilometers: {
			estimated_diameter_min: number;
			estimated_diameter_max: number;
		};
		meters: {
			estimated_diameter_min: number;
			estimated_diameter_max: number;
		};
		miles: {
			estimated_diameter_min: number;
			estimated_diameter_max: number;
		};
		feet: {
			estimated_diameter_min: number;
			estimated_diameter_max: number;
		};
	};
	is_potentially_hazardous_asteroid: boolean;
	close_approach_data: Array<{
		close_approach_date: string;
		close_approach_date_full: string;
		epoch_date_close_approach: number;
		relative_velocity: {
			kilometers_per_second: string;
			kilometers_per_hour: string;
			miles_per_hour: string;
		};
		miss_distance: {
			astronomical: string;
			lunar: string;
			kilometers: string;
			miles: string;
		};
		orbiting_body: string;
	}>;
	is_sentry_object: boolean;
};

async function fetchAPI(
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

export default async function Home() {
	const asteroids = await fetchAPI("2023-06-01", new Date());
	if (!asteroids)
		return <div className="text-4xl text-red-700">ERROR FETCHING DATA</div>;
	const elements = [];
	for (const i in asteroids.near_earth_objects) {
		elements.push(
			<>
				<div className="text-xl">{i}</div>
				<div>
					{AsteroidList({ asteroids: asteroids.near_earth_objects[i] })}
				</div>
			</>,
		);
	}

	return (
		<main className="text-4xl bg-gray-900">
			Asteroids
			<div>{elements}</div>
		</main>
	);
}
