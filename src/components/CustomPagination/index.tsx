import React, {
  ElementType,
  useCallback,
} from 'react';

import { useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import Tooltip from '@material-ui/core/Tooltip';

const CustomPagination: ElementType<TablePaginationActionsProps> = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = useCallback((event) => {
    onChangePage(event, 0);
  }, [onChangePage]);

  const handleBackButtonClick = useCallback((event) => {
    onChangePage(event, page - 1);
  }, [onChangePage, page]);

  const handleNextButtonClick = useCallback((event) => {
    onChangePage(event, page + 1);
  }, [onChangePage, page]);

  const handleLastPageButtonClick = useCallback((event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }, [onChangePage, count, rowsPerPage]);



  return (
    <Box width="425px">
      <Tooltip title="First Page">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page">
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CustomPagination;