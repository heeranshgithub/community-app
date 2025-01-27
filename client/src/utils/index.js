import { secureStorage } from './secureStorage';
const sampleUserData = {
  name: 'Mohandas',
  gender: 'Male',
  spouse: 'Kasturba',
  father: 'Karamchand',
  mother: 'Putlibai',
  siblings: [
    { gender: 'Female', siblingName: 'Raliatben' },
    { gender: 'Male', siblingName: 'Laxmidas' },
    { gender: 'Female', siblingName: 'Muliben' },
    { gender: 'Male', siblingName: 'Karsandas' },
    { gender: 'Female', siblingName: 'Pankunvarben' },
  ],
  children: [
    { gender: 'Male', childName: 'Harilal' },
    { gender: 'Male', childName: 'Manilal' },
    { gender: 'Male', childName: 'Ramdas' },
    { gender: 'Male', childName: 'Devdas' },
    { gender: 'Female', childName: 'Devika' },
    { gender: 'Female', childName: 'Ramika' },
  ],
};

// formats date into DD-MM-YY format
const formatDate = (dateISOString) => {
  const date = new Date(dateISOString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}-${month}-${year}`;
};

export { sampleUserData, secureStorage, formatDate };

// Children of Mahatma Gandhi (with his wife Kasturba Gandhi):
// Harilal Gandhi (1888–1948)
// Manilal Gandhi (1892–1956)
// Ramdas Gandhi (1897–1969)
// Devdas Gandhi (1900–1957)
