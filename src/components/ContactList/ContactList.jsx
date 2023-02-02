import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Box } from '@mui/system';
import { getContacts } from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/operations';

const columns = [
  { id: 'name', label: 'Name', align: 'center'},
  { id: 'number', label: 'Phone Number', align: 'center'},
  { id: 'delete', label: 'Delete Contact', align: 'center'},
];

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(state => state.filter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper sx={{ width: 'fit-content', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440}}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: '32.45vw', fontSize: '1.25em' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={contact.id}>
                      {columns.map((column) => {
                        const value = contact[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontSize: '1.1em' }}>
                            {value}
                            {column.id === 'delete' && 
                            <Button onClick={() => dispatch(deleteContact(contact.id))} variant='outlined' color='error'>
                              Delete
                            </Button>}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}