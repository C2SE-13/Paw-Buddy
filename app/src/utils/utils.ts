export function getRandomElements(arr: any[], n: number): any[] {
  const result = [];
  const chosenIndices: any[] = [];
  while (result.length < n) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (!chosenIndices.includes(randomIndex)) {
      result.push(arr[randomIndex]);
      chosenIndices.push(randomIndex);
    }
  }
  return result;
}
