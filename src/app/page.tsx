import { fetchAPI } from "@/api/get_asteroids";
import { AsteroidList } from "./asteroids";

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
