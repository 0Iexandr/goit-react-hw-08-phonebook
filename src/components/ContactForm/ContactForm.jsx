import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';

export function ContactForm() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const number = event.target.elements.number.value;
    const isAtContacts = contacts.find(contact => contact.name === name);
    if (isAtContacts) {
      setDisplayAlert(true);
      return;
    }
    if (!name && !number) {
      alert('Enter your name and phone number');
      return;
    }
    const newContact = { name, number };
    dispatch(addContact(newContact));
    setDisplayAlert(false);
    event.target.reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Add New Contact
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Name'
              type='text'
              name='name'
              autoComplete='name'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='number'
              label='Number'
              type='tel'
              id='phone'
              autoComplete='phone'
            />
            {displayAlert && <Alert variant='outlined' severity='warning' sx={{ mt: 2, mb: 2 }} >
              This contact is already in your phonebook!
            </Alert>}
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
            >
              add contact
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}