#include <stdio.h>

/*
  Escape Sequence
          Name                   Description
  \a      Alarm or Beep          It is used to generate a bell sound in the C program.
  \b      Backspace              It is used to move the cursor one place backward.
  \f      Form Feed              It is used to move the cursor to the start of the next logical page.
  \n      New Line               It moves the cursor to the start of the next line.
  \r      Carriage Return        It moves the cursor to the start of the current line.
  \t      Horizontal Tab         It inserts some whitespace to the left of the cursor and moves the cursor accordingly.
  \v      Vertical Tab           It is used to insert vertical space.
  \\      Backlash               Use to insert backslash character.
  \’      Single Quote           It is used to display a single quotation mark.
  \”      Double Quote           It is used to display double quotation marks.
  \?      Question Mark          It is used to display a question mark.
  \ooo    Octal Number           It is used to represent an octal number.
  \xhh    Hexadecimal Number     It represents the hexadecimal number.
  \0      NULL                   It represents the NULL character.
  \e      Escape sequence        It represents the ASCII escape character.
  \s      Space Character        It represents the ASCII space character.
  \d      Delete Character       It represents the ASCII DEL character.
*/

int main() {
  printf("hello, this is a test:\a\n\v\thello again\n");
}