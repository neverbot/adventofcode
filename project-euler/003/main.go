package main

import (
	"fmt"
	"os"
	"strconv"

	"main/utils"
)

func getFactors(value int) []int {
	factors := []int{}

	for i := 2; i <= value/2; i++ {
		if value%i == 0 {
			factors = append(factors, i)
		}
	}

	return factors
}

func main() {
	fmt.Println("Largest Prime Factor")

	arguments := utils.ReadInputArgs()

	value, err := strconv.Atoi(arguments["value"])

	if err != nil {
		fmt.Println("Error converting value to int")
		os.Exit(1)
	}

	factors := getFactors(value)
	fmt.Println("Factors:", factors)
}
