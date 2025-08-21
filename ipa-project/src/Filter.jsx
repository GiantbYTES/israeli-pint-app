import { MultiSelect } from "@mantine/core";

export default function Filter(props) {
  // Extract only the beer names from the beers prop
  const beerNames = (props.beers || []).map((beer) => beer.name);

  return (
    <MultiSelect
      label="Your Favorite BEERS"
      placeholder="Pick the correct one"
      data={beerNames}
      searchable
      clearable
    />
  );
}
