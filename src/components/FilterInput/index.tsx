import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { throttle } from 'lodash';
import { Box, IconButton, InputBase } from '@material-ui/core';
import useClasses from './filterInput.styles';
import CloseIcon from '@material-ui/icons/Close';
import { FilterInputProps } from './filterInput.types';

const FilterInput: FC<FilterInputProps> = ({
  getFilteredRows,
}: FilterInputProps) => {
  const classes = useClasses();
  const [filterInput, setFilterInput] = useState('');

  const invokeThrottled = throttle(() => {
    getFilteredRows(filterInput)
  }, 300);

  useEffect(invokeThrottled, [invokeThrottled, filterInput]);

  const handleFilter = useCallback((value: string) => {
    setFilterInput(value);
  }, [setFilterInput]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    handleFilter(event.target.value);
  }

  const handleClearClick = useCallback(() => {
    setFilterInput('');
  }, [setFilterInput]);



  return (
    <Box className={classes.searchContainer}>
      <InputBase
        className={classes.searchInput}
        placeholder="Enter Culture"
        autoComplete="off"
        spellCheck
        onChange={handleChange}
        value={filterInput}
      />
      <IconButton
        onClick={handleClearClick}
        className={classes.clearIcon}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );

};

export default memo(FilterInput);