export function getRandomElements(arr: any[], n: number): any[] {
  let result = [];
  // Chọn ngẫu nhiên và đưa vào mảng kết quả
  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    result.push(arr[randomIndex]);
  }
  return result;
}
