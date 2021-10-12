import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { CategoryType } from "../../client/types";
type Props = {
  categories: CategoryType[];
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Cart: React.FC<Props> = ({ categories, onCheckboxChange }) => {
  return (
    <div>
      <FormGroup>
        {categories.map((c) => (
          <FormControlLabel
            control={
              <Checkbox onChange={onCheckboxChange} value={c.category} />
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
