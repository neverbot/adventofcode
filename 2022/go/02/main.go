package main

import (
	"fmt"
	// "log"
	"strconv"
)

func main() {
	fmt.Println("Reading elf calories...")

	filename := readInputArgs()

	lines := getFileContents(filename)

	currentElf := 0
	calories := 0
	topThree := []int{0, 0, 0}

	// read every line of the file
	for i, line := range lines {

		// fmt.Println("Line: ", line)

		value, err := strconv.Atoi(line)

		if err == nil {
			calories += value
		}

		// if line length is 0 (or last), we have a new elf
		if len(line) == 0 || i == len(lines)-1 {
			fmt.Println("New Elf, calories: ", calories)

			if calories > topThree[2] {
				topThree[0] = topThree[1]
				topThree[1] = topThree[2]
				topThree[2] = calories
			} else if calories > topThree[1] {
				topThree[0] = topThree[1]
				topThree[1] = calories
			} else if calories > topThree[0] {
				topThree[0] = calories
			}

			currentElf++
			calories = 0
		}
	}

	fmt.Println("Number of elves:", currentElf)
	fmt.Println("Elves with most calories:", topThree)
	fmt.Println("Total calories in top three:", topThree[0]+topThree[1]+topThree[2])
}
