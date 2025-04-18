import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";

import RadioGroup from "./components/radio-group";
import ResultItem from "./components/results/result-item";

type Filter = "all" | "individuals" | "entities";

const dummyData = [
  {
    name: "Ali Reza Farhadi",
    type: "Person",
    wikiId: "Q987654",
    dateOfBirth: "1975-04-12",
    placeOfBirth: "Tehran, Iran",
    location: "Dubai, United Arab Emirates",
  },
  {
    name: "Eastern Front Trading Ltd.",
    type: "entity",
    wikiId: "Q543210",
    dateOfBirth: null, // not applicable for entity
    placeOfBirth: null,
    location: "Hong Kong",
  },
  {
    name: "Maria Ivanovna Petrova",
    type: "Person",
    wikiId: "Q123456",
    dateOfBirth: "1983-08-22",
    placeOfBirth: "Moscow, Russia",
    location: "Istanbul, Turkey",
  },
  {
    name: "North Star Maritime Corp",
    type: "Person",
    wikiId: "Q999999",
    dateOfBirth: null,
    placeOfBirth: null,
    location: "Panama City, Panama",
  },
  {
    name: "Cheng Wei",
    type: "Person",
    wikiId: "Q192837",
    dateOfBirth: "1990-01-15",
    placeOfBirth: "Chengdu, China",
    location: "Singapore",
  },
];

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
    <div className="min-h-screen flex flex-col items-center gap-5 px-3">
      <div className="w-full md:w-1/2 items-start">
        <h1 className="text-3xl font-bold">Sanction Screening Application</h1>
        <p className="text-lg">Using OpenSanctions API</p>
      </div>
      <form action={search} className="flex flex-col w-full md:w-1/2 gap-5">
        <label htmlFor="query" className="flex items-center gap-2">
          <Search width={20} height={20} />
          <input
            className="p-2 w-full border rounded border-gray-400"
            type="text"
            name="query"
            placeholder="Search..."
          />
        </label>
        <div className="flex justify-between">
          <RadioGroup
            groupLabel="Filter by:"
            selectedValue={selectedFilter}
            onChange={radioButtonHandler}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer align-middle"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex-1 w-full md:w-1/2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <span className="text-gray-500">_ records found</span>
        </div>
        <div className="flex-1">
          {dummyData.map((data) => {
            return <ResultItem data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
