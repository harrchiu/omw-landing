import React from 'react';

export const Col: React.FC<
  {
    center?: boolean;
    ref?: any;
  } & React.HTMLProps<HTMLDivElement>
> = ({ children, ref, style, center, ...rest }) => {
  let extraStyle: any = {};
  if (center) {
    extraStyle = { justifyContent: 'center', alignItems: 'center' };
  }
  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', ...extraStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};
