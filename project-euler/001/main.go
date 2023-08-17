package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	fmt.Println("Multiples of 3 or 5")

	arguments := readInputArgs()

	value, err := strconv.Atoi(arguments["value"])

	if err != nil {
		fmt.Println("Error converting value to int")
		os.Exit(1)
	}

	var results []int

	fmt.Println("Value:", value)

	for i := 1; i < value; i++ {
		if i%3 == 0 || i%5 == 0 {
			// add the multiple to the list
			results = append(results, i)
		}
	}

	fmt.Println("Results:", results)

	result := 0

	for _, v := range results {
		result += v
	}

	fmt.Println("Total:", result)

}
