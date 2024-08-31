#include <stdio.h>

int main() {

  float fahrenheit, celsius;
  int lower, upper, step;

  lower = 0;
  upper = 300;
  step = 20;

  fahrenheit = lower;

  printf("Fahrenheit\tCelsius\n");

  while (fahrenheit <= upper) {
    celsius = 5.0 * (fahrenheit - 32.0) / 9.0;
    printf("%6.0f\t\t%6.1f\n", fahrenheit, celsius);
    fahrenheit = fahrenheit + step;
  }
}