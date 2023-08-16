package main

import (
	"fmt"
)

func main() {
	fmt.Println("Reading rock paper scissors input...")

	filename := readInputArgs()

	lines := getFileContents(filename)

	totalValue := 0

	// read every line of the file
	for _, line := range lines {

		// fmt.Println("Line:", line)

		if len(line) == 0 {
			continue
		}

		they := line[0:1]
		me := line[2:3]

		switch me {
		case "X":
			me = "ROCK"
		case "Y":
			me = "PAPER"
		case "Z":
			me = "SCISSORS"
		}
		switch they {
		case "A":
			they = "ROCK"
		case "B":
			they = "PAPER"
		case "C":
			they = "SCISSORS"
		}

		value := 0

		switch me {
		case "ROCK":
			value += 1
		case "PAPER":
			value += 2
		case "SCISSORS":
			value += 3
		}

		if me == they {
			value += 3
		} else {
			if (me == "ROCK" && they == "SCISSORS") ||
				(me == "PAPER" && they == "ROCK") ||
				(me == "SCISSORS" && they == "PAPER") {
				value += 6
			}
		}

		// fmt.Println("they:", they)
		// fmt.Println("me:", me)

		totalValue += value
	}

	fmt.Println("Total Value:", totalValue)
}
