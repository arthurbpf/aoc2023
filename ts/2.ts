async function main() {
	let input = "";

	for await (const chunk of Bun.stdin.stream()) {
		const chunkText = Buffer.from(chunk).toString();
		input += chunkText;
	}

	let sum = 0;

	for (const line of input.split("\n")) {
		const [game, outcomes] = line.split(":")
		let isPossible = true;

		if (!outcomes)
			continue;

		outcomes.split(";").forEach(outcome => {
			const colors = outcome.split(",")

			colors.forEach(color => {
				const [amountText, colorName] = color.trim().split(" ")
				const amount = Number(amountText);

				switch (colorName) {
					case "red":
						if (amount > 12)
							isPossible = false;
						break;
					case "green":
						if (amount > 13)
							isPossible = false;
						break;
					case "blue":
						if (amount > 14)
							isPossible = false;
						break;
				}
			})
		})

		if (isPossible) {
			sum += Number(game.split(" ")[1]);
		}
	}

	console.log("The result is: ", sum);
}

main();
