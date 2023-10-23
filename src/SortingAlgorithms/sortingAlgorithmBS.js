export function getBubbleSortAnimations(array) {
  const animations = [];
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(mainArray, animations) {
  let n = mainArray.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      if (mainArray[i] > mainArray[i + 1]) {
        animations.push([i, mainArray[i], i + 1, mainArray[i + 1]]); // Capture heights of bars being compared and swapped
        swap(mainArray, i, i + 1);
        sorted = false;
      }
    }
    n--;
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
