import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import './UniversalTable.css';

const UniversalTable = ({ columns, data }) => {
  return (
    <div className="universal-table-container">
      <Table aria-label="Data table" className="universal-table">
        <TableHeader>
          {columns.map(column => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={data}>
          {item => (
            <TableRow key={item.id || item.parameter}>
              {columnKey => (
                <TableCell>{item[columnKey]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

UniversalTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default UniversalTable;
