import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({
  onClickAdd,
  onChangeInput,
  value,
  completed,
  setCompleted,
}) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={completed}
        onChange={e => setCompleted(!completed)}
      />
      <TextField
        placeholder="Введите текст задачи..."
        variant="standard"
        value={value}
        onChange={e => onChangeInput(e.target.value)}
        fullWidth
      />
      <Button onClick={onClickAdd}>
        <AddIcon />
      </Button>
    </div>
  );
};
