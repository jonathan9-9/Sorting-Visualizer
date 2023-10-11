import React, { useState } from 'react';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithmsQS.js';
import './SortingVisualizer.css';
import { useRef,useEffect } from 'react';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 325;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'purple';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'black';

export default function SortingVisualizer() {

  const [array, setArray] = useState([]);

  const arrayBarsRef = useRef();

  useEffect(() => {
    resetArray();
    arrayBarsRef.current = document.getElementsByClassName('array-bar');
  }, []);

  function resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    setArray(array);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      console.log("array bars MERGE SORT", arrayBars);
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

  function quickSort() {
    const animations = getQuickSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = arrayBarsRef.current;
      if(!arrayBars || !arrayBars.length) {
        return;
      }

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

  function heapSort() {

  }

  function bubbleSort() {

  }
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={resetArray}>Generate New Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={quickSort}>Quick Sort</button>
        <button onClick={heapSort}>Heap Sort</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
    );

}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}



  // testSortingAlgorithms() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }
