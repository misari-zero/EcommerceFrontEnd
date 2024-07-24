import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const FormDialog = ({ open, onClose, row, fetchRows }) => {
  const [formData, setFormData] = useState({ name: '', age: '' });

  useEffect(() => {
    if (row) {
      setFormData({ name: row.name, age: row.age });
    } else {
      setFormData({ name: '', age: '' });
    }
  }, [row]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (row) {
      await axios.put(`/api/data/${row.id}`, formData);
    } else {
      await axios.post('/api/data', formData);
    }
    fetchRows();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{row ? 'Edit' : 'Add New'} Data</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="number"
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;