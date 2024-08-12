package main

import (
	"fmt"
	"os"
	"strconv"

	"main/utils"
)

func main() {
	fmt.Println("Even Fibonacci Numbers")

	arguments := utils.ReadInputArgs()

	value, err := strconv.Atoi(arguments["value"])

	if err != nil {
		fmt.Println("Error converting value to int")
		os.Exit(1)
	}

	current := 2
	previous := 1
	next := 0
	result := 0

	fmt.Println("Number:", previous)
	fmt.Println("Number:", current)

	for current < value {

		if current%2 == 0 {
			result += current
		}

		// calculate next number in the fibonacci sequence
		next = current + previous
		previous = current
		current = next

		fmt.Println("Number:", current)
	}

	fmt.Println("Result:", result)
}
