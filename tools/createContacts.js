import axios from 'axios';

const baseURL = 'http://localhost:3000';

const contactTypes = ['work', 'home', 'personal'];

const firstNames = [
  'John',
  'Emma',
  'Mike',
  'Oliv',
  'Will',
  'Ava',
  'James',
  'Soph',
  'Rob',
  'Isa',
  'Dave',
  'Mia',
  'Joe',
  'Char',
  'Dan',
  'Amy',
  'Tom',
  'Harp',
  'Chas',
  'Eve',
];
const lastNames = [
  'Smith',
  'John',
  'Will',
  'Brow',
  'Jone',
  'Garc',
  'Mill',
  'Davi',
  'Rodr',
  'Mart',
  'Hern',
  'Lope',
  'Gonz',
  'Wils',
  'Ande',
  'Thom',
  'Tayl',
  'Moor',
  'Jack',
  'Mart',
];

const generateContact = (index) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return {
    name: `${firstName} ${lastName}`,
    phoneNumber: `+1${Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, '0')}`,
    email: `${firstName.toLowerCase()}@ex.com`,
    isFavourite: Math.random() < 0.3, // 30% chance of being a favorite
    contactType: contactTypes[Math.floor(Math.random() * contactTypes.length)],
  };
};

const createContacts = async () => {
  for (let i = 1; i <= 2; i++) {
    const contact = generateContact(i);
    try {
      const response = await axios.post(`${baseURL}/contacts`, contact);
      console.log(`Created contact ${i}:`, response.data);
    } catch (error) {
      console.error(
        `Error creating contact ${i}:`,
        error.response ? error.response.data : error.message,
      );
    }
  }
};

createContacts();
