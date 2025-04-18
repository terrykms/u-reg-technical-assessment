import { Building, User } from "lucide-react";

const ResultItem = ({ data }: any) => {
  const { name, type, wikiId, dateOfBirth, placeOfBirth, location } = data;
  return (
    <div className="flex gap-5 my-3 p-2 border rounded items-center">
      {type === "Person" ? <User /> : <Building />}
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex-1">
          <span>{wikiId}</span> | <span>{type}</span>
        </div>
        <div>
          {type === "Person" ? (
            <div>
              <span>Place of Birth: {placeOfBirth}</span> |{" "}
              <span>Date of Birth: {dateOfBirth}</span>
            </div>
          ) : (
            <span>{location}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
