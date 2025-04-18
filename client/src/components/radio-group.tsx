import { ChangeEvent } from "react";

type Filter = "all" | "individuals" | "entities";

type Params = {
  groupLabel: string;
  options?: { value: Filter; label: string }[];
  selectedValue: Filter | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const defaultOptions: Params["options"] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "individuals",
    label: "Individuals",
  },
  {
    value: "entities",
    label: "Entities",
  },
];

const RadioGroup = ({
  groupLabel,
  options = defaultOptions,
  selectedValue,
  onChange,
}: Params) => {
  return (
    <div>
      {groupLabel}
      {options.map(({ value, label }) => {
        return (
          <label key={value}>
            <input
              type="radio"
              name="filter"
              value={value}
              checked={selectedValue === value}
              onChange={onChange}
            />
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
