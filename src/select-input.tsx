import { Box, useInput } from 'ink';
import React, { useState } from 'react';
import Indicator from './indicator';
import Item from './item';

const arrayRotate = require('arr-rotate');

export interface ItemProps {
  value: string | number;
  label: string | number;
}

export interface SelectInputProps {
  initialIndex?: number;
  limit?: number;
  options?: ItemProps[];
  onSelect?: (item) => void;
}

const calFocusIndex = (len: number, nextIndex: number): number => {
  let result = nextIndex % len;
  if (result < 0) {
    result += len;
  }

  return result;
};

const SelectInput = ({
  options = [],
  initialIndex = 0,
  limit = 8,
  onSelect = () => {},
}: SelectInputProps): JSX.Element => {
  const [focusIndex, setFocusIndex] = useState(initialIndex);
  const [rotateFocusIndex, setRotateFocusIndex] = useState(0);
  const [rotateOptions, updateRotateOptions] = useState(
    arrayRotate(options, -initialIndex).splice(0, limit)
  );
  const hasLimit = typeof limit === 'number' && options.length > limit;

  useInput((_input, key) => {
    let indexIncrement = 0;
    if (key.upArrow) {
      indexIncrement = -1;
    }
    if (key.downArrow) {
      indexIncrement = 1;
    }

    if (indexIncrement === -1 && hasLimit) {
      const nextFocusIndex = calFocusIndex(options.length, focusIndex - 1);
      const atFirstIndex = rotateFocusIndex === 0;
      const nextRotateFocusIndex = atFirstIndex
        ? rotateFocusIndex
        : rotateFocusIndex - 1;

      setFocusIndex(nextFocusIndex);
      setRotateFocusIndex(nextRotateFocusIndex);

      if (atFirstIndex) {
        const newRotateOptions = arrayRotate(options, -nextFocusIndex).splice(
          0,
          limit
        );

        updateRotateOptions(newRotateOptions);
      }
    }

    if (indexIncrement === 1 && hasLimit) {
      const nextFocusIndex = calFocusIndex(options.length, focusIndex + 1);
      const atLastIndex = rotateFocusIndex === limit - 1;
      const nextRotateFocusIndex = atLastIndex
        ? rotateFocusIndex
        : rotateFocusIndex + 1;

      setFocusIndex(nextFocusIndex);
      setRotateFocusIndex(nextRotateFocusIndex);

      if (atLastIndex) {
        const newRotateOptions = arrayRotate(
          options,
          limit - nextFocusIndex - 1
        ).splice(0, limit);

        updateRotateOptions(newRotateOptions);
      }
    }

    if (key.return) {
      if (typeof onSelect === 'function') {
        onSelect(options[focusIndex]);
      }
    }
  });

  return (
    <Box flexDirection="column">
      {rotateOptions.map((item: ItemProps, index) => {
        const isFocus = index === rotateFocusIndex;

        return (
          <Box key={item.value}>
            <Indicator isSelected={isFocus} />
            <Item active={isFocus}>{item.label}</Item>
          </Box>
        );
      })}
    </Box>
  );
};

export default SelectInput;
