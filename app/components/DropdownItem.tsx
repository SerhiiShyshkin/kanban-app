type DropdownItemProps = {
  title: string;
  className?: string;
  action?: () => void;
};

const DropdownItem = ({ title, className, action }: DropdownItemProps) => {
  return (
    <div className={`${className} cursor-pointer`} onClick={action}>
      {title}
    </div>
  );
};
export default DropdownItem;
