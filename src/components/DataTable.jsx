import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import axios from 'axios';
import FormDialog from './FormDialog';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const response = await axios.get('/api/data');
    setRows(response.data);
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleOpen(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add New
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <FormDialog open={open} onClose={handleClose} row={selectedRow} fetchRows={fetchRows} />
    </>
  );
};

export default DataTable;