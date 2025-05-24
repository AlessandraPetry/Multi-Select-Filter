export const useFilteredList = (items: string[], search: string) => {
  return search
    ? items.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    : items;
};
