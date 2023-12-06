async function main() {
	let input = "";

	for await (const chunk of Bun.stdin.stream()) {
		const chunkText = Buffer.from(chunk).toString();
		input += chunkText;
	}

	let sum = 0;

	for await (const line of input.split('\n')) {
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

	console.log("The result is: ", sum);
}

main();
