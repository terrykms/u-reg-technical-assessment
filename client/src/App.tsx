import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";

import RadioGroup from "./components/radio-group";
import ResultItem from "./components/results/result-item";

import { SearchData } from "./types/search-result";
import Pagination from "./components/pagination";

type Filter = "all" | "individuals" | "entities";

const itemsPerPage = 10;
const fetchLimit = 100;

const App = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(-1);
  const [searchedResults, setSearchedResults] = useState<SearchData[]>([]);
  const [displayedResults, setDisplayedResults] = useState<SearchData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentQueryText, setCurrentQueryText] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<Filter>("all");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchAction = async (formData: FormData) => {
    const query = formData?.get("query") as string;
    const filter = formData?.get("filter") as Filter;

    if (!query || query.trim().length === 0) {
      alert("Search field cannot be empty!");
      return;
    }

    setErrorMessage("");
    setCurrentQueryText(query);
    setCurrentFilter(filter);
    setCurrentPage(1);
    setIsFetching(true);

    const apiUrl = import.meta.env.VITE_DEVELOPMENT_SERVER_URL;
    try {
      const response = await fetch(
        `${apiUrl}/search?q=${query}&filter=${filter}&limit=${fetchLimit}`
      );
      const { data, error } = await response.json();
      if (error) {
        throw new Error(error);
      }
      const { totalRecords, results } = data;
      setTotalRecordsCount(totalRecords);
      setSearchedResults(results);
      setDisplayedResults(results.slice(0, itemsPerPage));
    } catch (e: unknown) {
      setTotalRecordsCount(-1);
      setSearchedResults([]);
      setDisplayedResults([]);
      setErrorMessage(
        e instanceof Error ? e.message : "Failed to retrieve data."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const radioButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(e.currentTarget.value as Filter);
  };

  useEffect(() => {
    if (!hasMore || isFetching || totalRecordsCount === -1) return;

    const offset = (currentPage - 1) * itemsPerPage;
    if (offset <= searchedResults.length - 1) {
      const newDisplayedResults = searchedResults.slice(
        offset,
        offset + itemsPerPage
      );
      if (newDisplayedResults.length < itemsPerPage) {
        setHasMore(false);
      }
      setDisplayedResults(searchedResults.slice(offset, offset + itemsPerPage));
      return;
    }

    const fetchPaginatedData = async () => {
      setIsFetching(true);
      const apiUrl = import.meta.env.VITE_DEVELOPMENT_SERVER_URL;
      try {
        const response = await fetch(
          `${apiUrl}/search?q=${currentQueryText}&filter=${currentFilter}&limit=${fetchLimit}&offset=${offset}`
        );
        const { data, error } = await response.json();
        if (error) {
          throw new Error(error);
        }
        const { results } = data;
        const newResults = [...searchedResults, ...results];
        setSearchedResults(newResults);

        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = currentPage * itemsPerPage;
        setDisplayedResults(newResults.slice(startIdx, endIdx));
      } catch (e: unknown) {
        setTotalRecordsCount(-1);
        setSearchedResults([]);
        setDisplayedResults([]);
        setErrorMessage(
          e instanceof Error ? e.message : "Failed to retrieve data."
        );
      } finally {
        setIsFetching(false);
      }
    };
    fetchPaginatedData();
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-5 px-3 py-20">
      <div className="w-full md:w-1/2 items-start">
        <h1 className="text-3xl font-bold">Sanction Screening Application</h1>
        <p className="text-lg">Using OpenSanctions API</p>
      </div>
      <form
        action={searchAction}
        className="flex flex-col w-full md:w-1/2 gap-5"
      >
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
        {totalRecordsCount !== -1 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Search Results</h2>
              <span className="text-gray-500">
                {totalRecordsCount} records found
              </span>
            </div>
            <div className="flex gap-4">
              <p className="text-gray-400">
                Search keyword:{" "}
                <span className="font-bold">{currentQueryText}</span>
              </p>
              <p className="text-gray-400">
                Filter used: <span className="font-bold">{currentFilter}</span>
              </p>
            </div>
          </>
        )}
        {isFetching && <p className="text-center text-gray-600">Loading...</p>}
        {errorMessage !== "" && (
          <p className="text-center text-red-700 font-semibold">
            {errorMessage}
          </p>
        )}
        {!isFetching && errorMessage === "" && (
          <div className="flex-1">
            {displayedResults.map((data) => {
              return <ResultItem data={data as SearchData} />;
            })}
          </div>
        )}

        {totalRecordsCount !== -1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalRecordsCount / 10)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
