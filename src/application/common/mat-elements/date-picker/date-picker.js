import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function DatePicker(props) {
  const { id, label, format, selectedDate, onDateChange, ...other } = props;

  return (
    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
      <KeyboardDatePicker
          margin="normal"
          id={ id }
          label={ label }
          format={ format }
          value={ selectedDate }
          onChange={ onDateChange }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          { ...other }
      />
    </MuiPickersUtilsProvider>
  );
}