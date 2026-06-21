import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'wide' | 'narrow' | 'prose';
  as?: React.ElementType;
};

const maxWidths = {
  wide: 'max-w-[1400px]',
  narrow: 'max-w-5xl',
  prose: 'max-w-3xl',
};

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'wide',
  as: Tag = 'div',
}) => (
  <Tag className={`${maxWidths[size]} mx-auto px-5 md:px-8 lg:px-12 ${className}`}>
    {children}
  </Tag>
);

export default Container;
