package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	fmt.Println("Reading elf calories...")

	file, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	var currentElf int = 1
	var calories int = 0
	// var line string
	var maxCalories = 0

	for scanner.Scan() {

		line := scanner.Text()
		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}

		// if line length is 0, we have a new elf
		if len(line) == 0 {
			// fmt.Println("New Elf, calories: ", calories)
			if calories > maxCalories {
				maxCalories = calories
			}

			currentElf++
			calories = 0
			continue
		}

		// fmt.Println("Line: ", line)
		value, err := strconv.Atoi(line)
		if err != nil {
			log.Fatal(err)
		}

		calories += value
	}

	fmt.Println("Number of elves:", currentElf)
	fmt.Println("Elf with most calories:", maxCalories)

}
