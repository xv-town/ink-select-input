import React, { FC } from 'react';
import { Text } from 'ink';
import setting from './setting';

export interface Props {
  children?: React.ReactNode;
  active?: boolean;
}

const Item: FC<Props> = props => {
  const { children, active } = props;
  return (
    <Text color={active ? setting.highLightColor : undefined}>{children}</Text>
  );
};

export default Item;
