import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { CategoryType } from "../../client/types";

type Props = {
  categories: CategoryType[];
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Cart: React.FC<Props> = ({ categories, onCheckboxChange }) => {
  return (
    <div>
      <FormGroup>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ ml: 3, mt: 2 }}
        >
          Categories
        </Typography>
        {categories.map((c) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={onCheckboxChange}
                value={c.category}
                sx={{ width: 100 }}
              />
            }
            label={c.category}
            key={c.category}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default Cart;
