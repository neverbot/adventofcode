#include <stdio.h>

int main() {

  float fahrenheit, celsius;
  int lower, upper, step;

  lower = -20;
  upper = 150;
  step = 10;

  celsius = lower;

  printf("Celsius\tFahrenheit\n");

  while (celsius <= upper) {

    // convert celsius to fahrenheit
    fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    printf("%6.0f\t%6.1f\n", celsius, fahrenheit);
    celsius = celsius + step;
  }
}