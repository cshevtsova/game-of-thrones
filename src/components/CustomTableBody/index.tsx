import React, {
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { BodyProps } from './customTableBody.types';
import { getCharactersBy } from '../../api/apiAxios';
import { Character } from '../../interfaces/character';
import useStyles from './customTableBody.styles';

const CustomTableBody: VFC<BodyProps> = ({
  page,
  rowsPerPage,
  onHouseOpened,
  filterBy,
}: BodyProps) => {
  const classes = useStyles();
  const [rows, setRows] = useState<Character[]>([]);

  useEffect(() => {
    const params = {
      page: page + 1,
      pageSize: rowsPerPage,
      gender: filterBy.gender,
      culture: filterBy.culture,
    };

    getCharactersBy(params).then((data) => {
      if (data) {
        setRows(data);
      }
    });
  }, [page, rowsPerPage, filterBy]);

  const handleHouseClick = useCallback((event) => {
    const houseId = parseInt(event.target.value);
    onHouseOpened(houseId);
  }, [onHouseOpened]);

  return (
    <TableBody>
      {rows.map((row: any, index: number) => {
        return (
          <TableRow
            hover
            key={row.character}
          >
            <TableCell className={classes.nameCell}>{row.character}</TableCell>
            <TableCell className={classes.stringCell}>{row.alive}</TableCell>
            <TableCell className={classes.stringCell}>{row.gender}</TableCell>
            <TableCell className={classes.stringCell}>{row.culture}</TableCell>

            <TableCell className={classes.stringCell}>
              <ul>
                {row.allegiances.map((houseId: number) =>
                  <li
                    value={houseId}
                    className={classes.house}
                    onClick={handleHouseClick}
                  >
                    HouseID is {houseId}
                  </li>
                )}
              </ul>
            </TableCell>

            <TableCell className={classes.numberCell}>{row.books}</TableCell>
          </TableRow>
        );
      })}

    </TableBody>
  );
}

export default CustomTableBody;