package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func getFileContents(filename string) []string {
	// open the file with initial data
	file, err := os.Open(filename)

	if err != nil {
		fmt.Println("Error opening file: " + filename)
		os.Exit(1)
	}

	defer file.Close()

	// create a scanner to read the file line by line
	scanner := bufio.NewScanner(file)

	var lines []string

	// read every line of the file
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines
}

func readInputArgs() string {

	filename := ""
	found := false

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

	return filename
}
