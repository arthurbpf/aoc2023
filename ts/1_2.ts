const numbersDict: any = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
}

const lookAheadRegex = new RegExp(`(?=${Object.keys(numbersDict).join("|")})`, "g");
const findNumberRegex = new RegExp(`${Object.keys(numbersDict).join("|")}`);

async function main() {
	let input = "";

	for await (const chunk of Bun.stdin.stream()) {
		const chunkText = Buffer.from(chunk).toString();
		input += chunkText;
	}

	let sum = 0;
	for (let line of input.split('\n')) {
		const matches = line.matchAll(lookAheadRegex);

		let i = 0;
		for (let result of matches) {
			if (result.index == undefined)
				continue;
			const idx = result.index + i;
			i++;

			const writtenNumber = line.substring(idx).match(findNumberRegex)?.[0];
			if (!writtenNumber)
				continue;

			line = line.slice(0, idx) + numbersDict[writtenNumber] + line.slice(idx)
		}

		console.log(line);
		

		let firstNum = null;
		let lastNum = null;

		for (let i = 0; i < line.length; i++) {
			const char = line.charAt(i);
			const number = Number(char);

			if (isNaN(number))
				continue;

			if (firstNum == null)
				firstNum = number;

			lastNum = number;
		}

		const number = Number(`${firstNum}${lastNum}`);

		if (isNaN(number))
			continue;

		sum += number;
	}

	console.log("The result is:", sum);
}

main();
