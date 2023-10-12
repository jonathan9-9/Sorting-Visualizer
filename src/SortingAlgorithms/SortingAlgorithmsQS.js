export function getQuickSortAnimations(arr) {

    const animations = [];

    const stack = [];
    stack.push(0);
    stack.push(arr.length - 1);

    while (stack.length > 0) {
        const high = stack.pop();
        const low = stack.pop();

        const pivotIndex = partition(arr, low, high, animations);

        if (low < pivotIndex - 1) {
            stack.push(low);
            stack.push(pivotIndex - 1);
        }

        if (pivotIndex + 1 < high) {
            stack.push(pivotIndex + 1);
            stack.push(high);
        }
    }

    return animations;
}

function partition(arr, low, high, animations) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            animations.push([i, j]); // Track the indices being compared for animation
            swap(arr, i, j);
        }
    }

    animations.push([i + 1, high]); // Track the final pivot position
    swap(arr, i + 1, high);

    return i + 1;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
