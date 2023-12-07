async function main() {
	let input = "";

	for await (const chunk of Bun.stdin.stream()) {
		const chunkText = Buffer.from(chunk).toString();
		input += chunkText;
	}

	let sum = 0;

	for (const line of input.split("\n")) {
		const [game, outcomes] = line.split(":")

		if (!outcomes)
			continue;

		let isPossible = true;
		let minRed = 0
		let minGreen = 0
		let minBlue = 0

		outcomes.split(";").forEach(outcome => {
			const colors = outcome.split(",")

			colors.forEach(color => {
				const [amountText, colorName] = color.trim().split(" ")
				const amount = Number(amountText);

				switch (colorName) {
					case "red":
						if (minRed < amount)
							minRed = amount;
						break;
					case "green":
						if (minGreen < amount)
							minGreen = amount;
						break;
					case "blue":
						if (minBlue < amount)
							minBlue = amount;
						break;
				}
			})
		})

		if (isPossible) {
			sum += (minRed * minBlue * minGreen);
		}
	}

	console.log("The result is: ", sum);
}

main();
