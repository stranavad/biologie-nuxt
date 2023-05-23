export function shuffle<T extends any[]>(array: T): T {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function getRandomElements<T extends any[]>(array: T, n: number): T {
	const copy = array.slice(0);
	const result = [];

	for (let i = 0; i < n; i++) {
		const randomIndex = Math.floor(Math.random() * copy.length);
		const element = copy.splice(randomIndex, 1)[0];
		result.push(element);
	}

	return result as T;
}