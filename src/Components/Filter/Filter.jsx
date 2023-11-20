import { MenuItem, Select } from "@mui/material";

const Filter = ({ appState, setAppState }) => {
  const { filterCountry, filterCategory } = appState;

  return (
    <>
      <Select
        labelId="country-label"
        id="country"
        value={filterCountry}
        label="Country"
        onChange={(e) =>
          setAppState({ ...appState, filterCountry: e.target.value })
        }
        sx={{ width: 250, marginRight: "16px" }}
      >
        <MenuItem value={"gb"}>United Kingdom</MenuItem>
        <MenuItem value={"ua"}>Ukraine</MenuItem>
        <MenuItem value={"de"}>Germany</MenuItem>
        <MenuItem value={"pl"}>Poland</MenuItem>
      </Select>
      <Select
        labelId="category-label"
        id="category"
        value={filterCategory}
        label="Category"
        onChange={(e) =>
          setAppState({ ...appState, filterCategory: e.target.value })
        }
        sx={{ width: 250 }}
        placeholder="Select"
      >
        {/* <MenuItem disabled value="">
          <em>Select</em>
        </MenuItem> */}
        <MenuItem value={"business"}>Business</MenuItem>
        <MenuItem value={"general"}>General</MenuItem>
        <MenuItem value={"health"}>Health</MenuItem>
        <MenuItem value={"technology"}>Technology</MenuItem>
      </Select>
    </>
  );
};

export default Filter;
