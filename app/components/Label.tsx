type LabelProps = {
  className?: string;
  htmlFor: string;
  name: string;
};

const Label = ({ className, htmlFor, name }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {name}
    </label>
  );
};

export { Label };
