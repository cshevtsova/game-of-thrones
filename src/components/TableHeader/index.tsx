import React, {
  VFC,
} from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';

const TableHeader: VFC = () => {
  const headerCells = [
    { id: 'character', numeric: false, label: 'Character' },
    { id: 'alive', numeric: false, label: 'Alive' },
    { id: 'gender', numeric: false, label: 'Gender' },
    { id: 'culture', numeric: false, label: 'Culture' },
    { id: 'allegiances', numeric: false, label: 'Allegiances' },
    { id: 'books', numeric: true, label: '# of Books' },
  ];

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell: any) => (
          <TableCell key={headerCell.id} align="center">
            <Typography variant="h6">
              {headerCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;