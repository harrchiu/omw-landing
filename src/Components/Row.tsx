import React from 'react';
import { Col } from './Col';

export const Row: React.FC<
  {
    center?: boolean;
    ref?: any;
  } & React.HTMLProps<HTMLDivElement>
> = ({ children, ref, style, ...rest }) => {
  return (
    <Col ref={ref} style={{ flexDirection: 'row', ...style }} {...rest}>
      {children}
    </Col>
  );
};
