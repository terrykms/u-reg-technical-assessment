import { Building, User } from "lucide-react";
import ResultItemProperty from "./result-item-property";
import { SearchData } from "../../types/search-result";

type Params = {
  data: SearchData;
};

const ResultItem = ({ data }: Params) => {
  const {
    id,
    schema,
    name,
    country,
    birthDate,
    birthPlace,
    nationality,
    address,
    jurisdiction,
    position,
  } = data;
  const formattedBirthDate: string | undefined =
    birthDate &&
    new Date(birthDate).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const nationalityStr: string | undefined = nationality?.join(", ");
  return (
    <div className="flex gap-5 my-3 p-2 border rounded items-center">
      {schema === "Person" ? <User /> : <Building />}
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex-1 lg:flex text-sm gap-3">
          <ResultItemProperty label="ID" value={id} />
          <ResultItemProperty label="Schema" value={schema} />
        </div>
        <div className="flex-1 gap-5">
          <ResultItemProperty label="Country" value={country?.toUpperCase()} />
          <ResultItemProperty label="Nationality" value={nationalityStr} />
          <ResultItemProperty label="Jurisdiction" value={jurisdiction} />
          <ResultItemProperty label="Address" value={address} />
          <ResultItemProperty label="Position" value={position} />
          <ResultItemProperty label="Place of Birth" value={birthPlace} />
          <ResultItemProperty
            label="Date of Birth"
            value={formattedBirthDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
