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
		instructions := line[2:3]
		me := ""

		switch they {
		case "A":
			they = "ROCK"
		case "B":
			they = "PAPER"
		case "C":
			they = "SCISSORS"
		}

		switch instructions {
		case "X":
			// lose
			if they == "ROCK" {
				me = "SCISSORS"
			} else if they == "PAPER" {
				me = "ROCK"
			} else if they == "SCISSORS" {
				me = "PAPER"
			}
		case "Y":
			// draw
			me = they
		case "Z":
			// win
			if they == "ROCK" {
				me = "PAPER"
			} else if they == "PAPER" {
				me = "SCISSORS"
			} else if they == "SCISSORS" {
				me = "ROCK"
			}
		}

		// same way of calculating de value as in the previous exercise

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
