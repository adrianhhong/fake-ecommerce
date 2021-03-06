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
    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={onSortChange}>
          <MenuItem value={"default"}>Default</MenuItem>
          <MenuItem value={"priceAsc"}>Price: Low to high</MenuItem>
          <MenuItem value={"priceDes"}>Price: High to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
