import React, {
  useCallback,
  useState,
  VFC,
} from 'react';

import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableHeader from '../TableHeader';
import CustomTableBody from '../CustomTableBody';
import { Table, TableContainer } from '@material-ui/core';
import useStyles from './demo.styles';
import CustomPagination from '../CustomPagination';
import HouseDialog from '../HouseDialog';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FilterInput from '../FilterInput';


const Demo: VFC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsCount = 150; //TODO: find way to count all characters
  const [isHouseOpened, setHouseOpened] = useState(false);
  const [houseId, setHouseId] = useState<number>();


  const handleHouseOpened = (houseId: number) => {
    setHouseId(houseId);
    setHouseOpened(true);
  };

  const handleHouseClose = () => {
    setHouseOpened(false);
  }

  const handleChangePage = useCallback((event, newPage: number) => {
    setPage(newPage);
  }, [setPage]);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, [setRowsPerPage, setPage]);

  const [state, setState] = useState<{ gender: string; culture: string }>({
    gender: '',
    culture: '',
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleFilteredRows = useCallback((filterInput: string) => {
    const filter = filterInput.toLocaleLowerCase().trim();
    setState({...state, culture: filter});
  }, []);

  return (
    <Paper className={classes.paper}>

      <FormControl className={classes.formControl}>
        <InputLabel shrink>Gender</InputLabel>
        <NativeSelect
          value={state.gender}
          onChange={handleChange}
          inputProps={{
            name: 'gender',
          }}
        >
          <option value="">All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </NativeSelect>
      </FormControl>

      <FilterInput
        getFilteredRows={handleFilteredRows}
      />   

      <TableContainer>
        <Table className={classes.table}>
          <TableHeader />
          <CustomTableBody
            page={page}
            rowsPerPage={rowsPerPage}
            onHouseOpened={handleHouseOpened}
            filterBy={state}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            count={rowsCount}
            colSpan={4}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={CustomPagination}
          />
        </Table>
      </TableContainer>
      <HouseDialog
        houseId={houseId}
        open={isHouseOpened}
        onClose={handleHouseClose}
      />
    </Paper>


  );
}

export default Demo;