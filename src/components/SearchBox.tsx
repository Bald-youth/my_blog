// src/components/SearchBox.tsx
import React from 'react';
import SearchBox from 'react-search-box';

interface SearchProps {
  data: { key: string; value: string }[];
  onSelect: (record: { key: string; value: string } | any) => void;
}

const CustomSearchBox: React.FC<SearchProps> = ({ data, onSelect }) => {
  return (
    <SearchBox
      data={data}
      onSelect={(record) => onSelect(record)}
      placeholder="Search..."
      autoFocus
      onChange={() => {}} // 这里可以使用一个空的 onChange
    />
  );
};

export default CustomSearchBox;
