import { MultiSelect } from "@mantine/core";

export default function BeerNameFilter(props) {
  // Extract only the beer names and types from the beers prop
  const beerNames = (props.beers || []).map((beer) => beer.name);
  // Get unique beer types
  const beerTypes = Array.from(
    new Set((props.beers || []).map((beer) => beer.type))
  );

  return (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-end" }}>
      <div style={{ flex: 1 }}>
        <MultiSelect
          placeholder="Your Favorite BEERS"
          data={beerNames}
          searchable
          clearable
          value={props.value}
          onChange={props.onChange}
          mb="md"
        />
      </div>
    </div>
  );
}
