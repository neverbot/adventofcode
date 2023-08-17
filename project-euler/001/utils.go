package main

import (
	// "bufio"
	// "fmt"
	// "log"
	"os"
)

// func getFileContents(filename string) []string {
// 	// open the file with initial data
// 	file, err := os.Open(filename)

// 	if err != nil {
// 		fmt.Println("Error opening file: " + filename)
// 		os.Exit(1)
// 	}

// 	defer file.Close()

// 	// create a scanner to read the file line by line
// 	scanner := bufio.NewScanner(file)

// 	var lines []string

// 	// read every line of the file
// 	for scanner.Scan() {
// 		lines = append(lines, scanner.Text())
// 	}

// 	if err := scanner.Err(); err != nil {
// 		log.Fatal(err)
// 	}

// 	return lines
// }

func readInputArgs() map[string]string {

	// create a mapping to store input arguments
	arguments := make(map[string]string)

	// check cli arguments
	for i := 1; i < len(os.Args); i++ {

		// if arguments starts with '--'
		if len(os.Args[i]) >= 2 && os.Args[i][0:2] == "--" {

			// get the argument name
			argName := os.Args[i][2:]

			// if next argument is not an argument name
			if i <= len(os.Args)-1 && (len(os.Args[i+1]) < 2 || os.Args[i+1][0:2] != "--") {
				// assign the value to the argument name
				arguments[argName] = os.Args[i+1]
				i++
			} else {
				// assign empty value
				arguments[argName] = ""
			}
		}
	}

	// fmt.Println("Input arguments:", arguments)

	return arguments
}
