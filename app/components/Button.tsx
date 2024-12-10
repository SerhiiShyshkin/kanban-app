import React from 'react';

type ButtonProps = {
  type?: 'submit' | 'reset' | 'button';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  type = 'submit',
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
