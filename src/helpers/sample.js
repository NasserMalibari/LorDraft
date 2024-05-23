

export function getRandomElements(arr, count) {
    let result = [];
    let _arr = [...arr]; // Create a copy of the array
  
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * _arr.length);
      result.push(_arr[randomIndex]);
      _arr.splice(randomIndex, 1); // Remove the selected element to avoid duplicates
    }
  
    return result;
}