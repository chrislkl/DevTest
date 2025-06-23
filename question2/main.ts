export function findOutlier(integers: number[]): number {
  let evens = 0;
  let odds = 0;
  for (let i = 0; i < 3; i++) {
    if (integers[i] % 2 === 0) {
      evens++;
    } else {
      odds++; 
    }
  }

  const isEvenMajority = evens > odds;
  for (let i = 0; i < integers.length; i++) {
    if ((isEvenMajority && integers[i] % 2 !== 0) || (!isEvenMajority && integers[i] % 2 === 0)) {
      return integers[i];
    }
  }
  return 0; // should never be reached if the input is valid
}