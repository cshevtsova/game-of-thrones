import React, {
  memo,
  useEffect,
  useState,
  VFC,
} from 'react';

import { House, HouseProps } from './houseDialog.types';
import { getHouseByID } from '../../api/apiAxios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useStyles from './houseDialog.styles';

const HouseDialog: VFC<HouseProps> = ({
  houseId,
  open = false,
  onClose,
}: HouseProps) => {
  const classes = useStyles()
  const [house, setHouse] = useState<House>();

  useEffect(() => {
    if (houseId) {
      getHouseByID(houseId).then((data) => {
        setHouse(data);
      });
    }
  }, [houseId]);

  const handleClose = () => {
    onClose();
  }

  return house ? (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={classes.root}>
        <Typography variant="h6">House # {houseId}</Typography>

        {handleClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ) : null}

      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          <p><b>Name of the House:</b> {house.name}</p>
          <p><b>Region:</b> {house.region}</p>
          <p><b>Coat of Arms:</b> {house.coatOfArms}</p>
          <p><b>Words:</b> {house.words}</p>
          <p><b>Titles:</b> {house.titles}</p>
          <p><b>Seats:</b> {house.seats}</p>
          <p><b>Has died out:</b> {house.hasDiedOut.toString()}</p>
          <p><b>Has overlord:</b> {house.hasOverlord.toString()}</p>
          <p><b>Number of Cadet Branches:</b> {house.cadetBranches}</p>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  ) : <></>;
}

export default memo(HouseDialog);