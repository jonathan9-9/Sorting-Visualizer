import React, {useState, useRef} from 'react';
import {getBubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithmBS';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms';
import {getQuickSortAnimations} from '../SortingAlgorithms/SortingAlgorithmsQS';
import {getHeapSortAnimations} from '../SortingAlgorithms/sortingAlgorithmHS';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 75;
const PRIMARY_COLOR = 'red';
const SECONDARY_COLOR = 'red';

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

    const arrayBars = arrayBarsRef.current;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx]
          ? arrayBars[barTwoIdx].style
          : null;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.backgroundColor = color;
            if (barTwoStyle) {
              barTwoStyle.backgroundColor = color;
            }
            resolve();
          });
        });
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.height = `${newHeight}px`;
            resolve();
          });
        });
      }

      console.log('Step ' + i, animations);
    }
  }
  async function heapSort() {
    const animations = getHeapSortAnimations(array);

    const arrayBars = arrayBarsRef.current;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx]
          ? arrayBars[barTwoIdx].style
          : null;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.backgroundColor = color;
            if (barTwoStyle) {
              barTwoStyle.backgroundColor = color;
            }
            resolve();
          });
        });
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.height = `${newHeight}px`;
            resolve();
          });
        });
      }

      console.log('Step ' + i, animations);
    }
  }

  async function bubbleSort() {
    const animations = getBubbleSortAnimations(array);

    const arrayBars = arrayBarsRef.current;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx]
          ? arrayBars[barTwoIdx].style
          : null;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.backgroundColor = color;
            if (barTwoStyle) {
              barTwoStyle.backgroundColor = color;
            }
            resolve();
          });
        });
      } else {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;

        await new Promise(resolve => {
          requestAnimationFrame(() => {
            barOneStyle.height = `${newHeight}px`;
            resolve();
          });
        });
      }

      console.log('bubble sort animations' + i, animations);
    }
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleQuickSortClick() {
    quickSort();
    quickSort();
    quickSort();
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
      <button onClick={handleQuickSortClick}>Quick Sort</button>
      <button onClick={heapSort}>Heap Sort</button>
    </div>
  );
}
