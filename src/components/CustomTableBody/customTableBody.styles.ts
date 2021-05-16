import { makeStyles } from '@material-ui/core';

export default makeStyles({
  nameCell: {
    width: '30%',
    textAlign: 'left',
  },
  
  stringCell: {
    width: '15%',
    textAlign: 'center',
  },

  numberCell: {
    width: '10%',
    textAlign: 'center',
  },

  house: {
    cursor: 'pointer',
    paddingBottom: '5px',

    '&:hover': {
        color: '#09989C',
        fontWeight: 'bold',
    }
  },

});