export function getQuickSortAnimations(values, left=null, right=values.length - 1) {
    if (left >= right || !values.length) {
        return [];
    }
    const pivotIndex = partition(values, left, right);
    const animations = [];
    animations.push([pivotIndex, right]);

    const animationsLeft = getQuickSortAnimations(values, left, pivotIndex - 1);
    const animationsRight = getQuickSortAnimations(values, pivotIndex + 1, right);

    return [...animations, ...animationsLeft, ...animationsRight];
}

function partition(values, left, right) {
    const pivot = values[right];
    let star = left;

    for (let i = left; i < right; i++) {
        if (values[i] < pivot) {
            [values[star], values[i]] = [values[right], values[star]];
            star++;
        }
    }

    [values[star], values[right]] = [values[right], values[star]];
    return star;
}
