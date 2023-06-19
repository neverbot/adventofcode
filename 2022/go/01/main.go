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

	var filename string
	var found bool = false

	// check cli arguments to see if we have a filename
	for i := 1; i < len(os.Args); i++ {
		if os.Args[i] == "--input" && i+1 < len(os.Args) {
			found = true
			filename = os.Args[i+1]
		}
	}

	if !found {
		fmt.Println("Please specify input file with --input <filename>")
		os.Exit(1)
	}

	// open the file with initial data
	file, err := os.Open(filename)

	if err != nil {
		fmt.Println("Error opening file: " + filename)
		os.Exit(1)
	}

	defer file.Close()

	// create a scanner to read the file line by line
	scanner := bufio.NewScanner(file)

	var currentElf int = 1
	var calories int = 0
	var maxCalories int = 0

	// read every line of the file
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
