import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = ({ onSearchChange }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          paddingLeft: "20px",
          paddingRight: "20px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      >
        <SearchIcon sx={{ alignSelf: "flex-end", marginBottom: "5px" }} />
        <TextField
          sx={{ width: "130px", margin: "5px" }}
          onChange={onSearchChange}
          label="Search"
          variant="standard"
        />
      </Box>
    </div>
  );
};

export default Search;
