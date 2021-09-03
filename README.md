# `@xv-town/ink-input-select`

## Usage

```tsx
import { render, Text } from 'ink';
import React, { useState } from 'react';
import SelectInput from '@xv-town/ink-select-input';

const Demo = () => {
  const [result, setResult] = useState(null);
  const handleSelect = item => {
    setResult(item);
  };

  const items = Array.from(Array(10).keys()).map(item => ({
    value: item,
    label: item,
  }));

  return result ? (
    <Text>{JSON.stringify(result)}</Text>
  ) : (
    <SelectInput options={items} onSelect={handleSelect} />
  );
};

render(<Demo />);
```

## Options

| attribute    | description                                      | type        | default |
| ------------ | ------------------------------------------------ | ----------- | ------- |
| options      | Items to display in a list.                      | ItemProps[] | []      |
| initialIndex | Index of initially-selected item in items array. |             |         |
| limit        | Number of items to display.                      |             |         |
| onSelect     | Function to call when user selects an item.      |             |         |
