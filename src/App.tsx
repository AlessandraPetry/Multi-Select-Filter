import { useEffect, useState } from "react";
import { FilterBox } from "./components/FilterBox";

function App() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((json) => setItems(json.data))
      .catch((err) => console.error(err));
  }, []);

  console.log("items", items);

  return <FilterBox />;
}

export default App;
