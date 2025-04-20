import { ChangeEvent } from "react";

type Filter = "all" | "individuals" | "entities";

type RadioGroupProps = {
  groupLabel: string;
  options?: { value: Filter; label: string }[];
  selectedValue: Filter | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const defaultOptions: RadioGroupProps["options"] = [
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
}: RadioGroupProps) => {
  return (
    <div className="flex gap-2 items-center">
      {groupLabel}
      {options.map(({ value, label }) => {
        return (
          <label key={value}>
            <input
              className="mr-1"
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
