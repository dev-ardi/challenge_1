import { asteroid } from "./page";

export function Asteroid({ asteroid }: { asteroid: asteroid }) {
	return (
		<div className="flex bg-gray-300 justify-between">
			<div className="text-gray-800 text-xl">{asteroid.name}</div>
			<div className="text-gray-500 text-xl">
				{Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max)}m
			</div>
			{asteroid.is_potentially_hazardous_asteroid && (
				<div className="text-xl font-bold text-red-500">DANGEROUS</div>
			)}
		</div>
	);
}

export function AsteroidList({ asteroids }: { asteroids: asteroid[] }) {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-2 bg-gray-700 p-2 m-2">
			{asteroids.map((a) => Asteroid({ asteroid: a }))}
		</div>
	);
}
