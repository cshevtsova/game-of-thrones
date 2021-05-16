import { makeStyles } from '@material-ui/core';

export default makeStyles({
  searchContainer: {
    minHeight: 30,
    width: 450,
    margin: 5,
    border: '1px solid grey',
    borderRadius: 4,
    display: 'flex',
  },
  
  searchInput: {
    height: 20,
    fontSize: 14,
    lineHeight: 20,
    width: '100%',
    marginLeft: 10,
    marginTop: 5,
  },

  clearIcon: {
    padding: 10,
    height: 30,
    borderRadius: 4,
  },

});