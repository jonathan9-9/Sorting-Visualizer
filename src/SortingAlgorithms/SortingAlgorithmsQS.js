export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, low, high, animations) {
  if (low < high) {
    const {left, right} = partition(mainArray, low, high, animations);
    quickSortHelper(mainArray, low, left - 1, animations);
    quickSortHelper(mainArray, right + 1, high, animations);
  }
}

function partition(mainArray, low, high, animations) {
  const pivot = mainArray[low];
  let left = low;
  let right = low;

  for (let i = low + 1; i <= high; i++) {
    animations.push([i, left, right]);
    if (mainArray[i] < pivot) {
      right++;
      animations.push([right, mainArray[right], i, mainArray[i]]);
      animations.push([i, left, right]);
      swap(mainArray, i, right);
      if (right !== left) {
        left++;
        animations.push([left, mainArray[left], right, mainArray[right]]);
        animations.push([right, mainArray[right], left, mainArray[left]]);
        swap(mainArray, left, right);
      }
    }
  }

  animations.push([low, mainArray[low], right, mainArray[right]]);
  animations.push([low, mainArray[low], left, mainArray[left]]);
  swap(mainArray, low, left);

  return {left, right};
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
