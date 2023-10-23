import React, {useState, useRef} from 'react';
import {getBubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithmBS';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms';
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithmsQS';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 75;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'pink';

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const arrayBarsRef = useRef([]);

  function resetArray() {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 730));
    }
    setArray(newArray);
  }

  function heapSort() {}

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');

      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  async function quickSort() {
    const animations = getQuickSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');

    const animate = i => {
      if (i >= animations.length) {
        return;
      }

      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        requestAnimationFrame(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          animate(i + 1);
        });
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;

        requestAnimationFrame(() => {
          barOneStyle.height = `${newHeight}px`;
          animate(i + 1);
        });
      }
    };

    animate(0);
  }

  async function bubbleSort() {
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = arrayBarsRef.current;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx]
          ? arrayBars[barTwoIdx].style
          : null;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await sleep(i * ANIMATION_SPEED_MS);
        barOneStyle.backgroundColor = color;
        if (barTwoStyle) {
          barTwoStyle.backgroundColor = color;
        }
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        await sleep(i * ANIMATION_SPEED_MS);
        barOneStyle.height = `${newHeight}px`;
      }
    }
  }

  function sleep(ms) {
    return new Promise(resolve => requestAnimationFrame(resolve, ms));
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="array-container">
      {array.map((value, idx) => {
        return (
          <div
            className="array-bar"
            key={idx}
            ref={el => (arrayBarsRef.current[idx] = el)}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        );
      })}
      <button onClick={resetArray}>Generate New Array</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={mergeSort}>Merge Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <button onClick={heapSort}>Heap Sort</button>
    </div>
  );
}
