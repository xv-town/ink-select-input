import * as figures from 'figures';
import { Box, Text } from 'ink';
import type { FC } from 'react';
import * as React from 'react';
import setting from './setting';

export interface Props {
  isSelected?: boolean;
}

const Indicator: FC<Props> = ({ isSelected = false }) => (
  <Box marginRight={1}>
    {isSelected ? (
      <Text color={setting.highLightColor}>{figures.pointer}</Text>
    ) : (
      <Text> </Text>
    )}
  </Box>
);

export default Indicator;
