import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    fetch("/items.json")
      .then((res) => res.json())
      .then((json) => setItems(json.data))
      .catch((err) => console.error(err));
  }, []);

  console.log("items", items);

  return <>{items && items.map((item) => <p>{item}</p>)}</>;
}

export default App;
