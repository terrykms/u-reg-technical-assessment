const ResultItemProperty = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  if (!value) return;
  return (
    <p>
      <span className="font-semibold text-gray-500">{label}:</span> {value}
    </p>
  );
};

export default ResultItemProperty;
