import { ReactNode } from 'react';

type ListProps<T> = {
  data: T[];
  renderItem: (item: T) => ReactNode;
};

const List = <T,>({ data, renderItem }: ListProps<T>) => {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </>
  );
};

export default List;
