import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
type Props = {
  sortBy: string;
  onSortChange: (event: SelectChangeEvent) => void;
};

const Sort: React.FC<Props> = ({ sortBy, onSortChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort By"
          onChange={onSortChange}
        >
          <MenuItem value={"default"}>Default</MenuItem>
          <MenuItem value={"priceAsc"}>Price: Low to high</MenuItem>
          <MenuItem value={"priceDes"}>Price: High to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
