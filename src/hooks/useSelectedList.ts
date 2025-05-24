import { useState, useEffect } from 'react';

export const useSelectedList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    const stored = localStorage.getItem('selectedItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const toggleSelectedItem = (item: string) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((i) => i !== item)
        : [...prevItems, item]
    );
  };

  return { selectedItems, toggleSelectedItem };
};
