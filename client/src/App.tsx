import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";

import RadioGroup from "./components/radio-group";
import "./App.css";

type Filter = "all" | "individuals" | "entities";

const App = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");
  const search = (formData: FormData) => {
    const query = formData?.get("query") as string;
    const filter = formData?.get("filter") as Filter;

    if (!query || query.trim().length === 0) {
      alert("Search field cannot be empty!");
    }
    return;
  };

  const radioButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(e.currentTarget.value as Filter);
  };

  return (
    <div>
      <h1>Sanction Screening Application</h1>
      <p>Using OpenSanctions API</p>
      <form action={search} className="form-search">
        <label htmlFor="query">
          <Search width={15} height={15} />
          <input type="text" name="query" />
        </label>
        <button type="submit">Search</button>
        <RadioGroup
          groupLabel="Filter by:"
          selectedValue={selectedFilter}
          onChange={radioButtonHandler}
        />
      </form>
    </div>
  );
};

export default App;
