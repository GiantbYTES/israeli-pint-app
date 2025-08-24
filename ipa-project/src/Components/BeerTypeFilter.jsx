import { MultiSelect } from "@mantine/core";

export default function BeerTypeFilter({ beerTypes, value, onChange }) {
  return (
    <MultiSelect
      placeholder="Pick the type"
      data={beerTypes}
      searchable
      clearable
      value={value}
      onChange={onChange}
    />
  );
}
