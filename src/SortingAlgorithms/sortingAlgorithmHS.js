export function getHeapSortAnimations(array) {
  const animations = [];
  heapSort(array, animations);
  return animations;
}

function heapify(mainArray, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && mainArray[left] > mainArray[largest]) {
    largest = left;
  }

  if (right < n && mainArray[right] > mainArray[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]); // Capture indices of elements being compared
    swap(mainArray, i, largest);
    heapify(mainArray, n, largest, animations);
  }
}

function heapSort(mainArray, animations) {
  const n = mainArray.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(mainArray, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]); // Capture indices of elements being swapped
    swap(mainArray, 0, i);
    heapify(mainArray, i, 0, animations);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
