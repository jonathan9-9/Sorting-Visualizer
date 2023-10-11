export function getQuickSortAnimations(
    values,
    left = 0,
    right = values.length - 1,
) {
    const animations = [];

    if (left < right) {
        const pivotIndex = partition(values, left, right);

        animations.push([pivotIndex, pivotIndex]);

        const leftAnimations = getQuickSortAnimations(values, left, pivotIndex - 1);
        const rightAnimations = getQuickSortAnimations(
            values,
            pivotIndex + 1,
            right,
        );

        animations.push(...leftAnimations);
        animations.push(...rightAnimations);
    }

    return animations;
}

function partition(values, left, right) {
    const pivot = values[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (values[j] < pivot) {
            i++;

            [values[i], values[j]] = [values[j], values[i]];
        }
    }

    [values[i + 1], values[right]] = [values[right], values[i + 1]];

    return i + 1; // Return the index of the pivot element
}

// Sample input data (array to sort)
const inputArray = [6, 3, 8, 2, 7, 4, 5, 1];

// Call the getQuickSortAnimations function
const animations = getQuickSortAnimations(inputArray);

// Log the animations to see the result
console.log(animations);
