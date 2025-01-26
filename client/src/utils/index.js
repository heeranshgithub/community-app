import { secureStorage } from './secureStorage';
const sampleUserData = {
  name: 'Mohandas',
  gender: 'Male',
  spouse: 'Kasturba',
  father: 'Karamchand',
  mother: 'Putlibai',
  siblings: [
    { gender: 'Female', siblingName: 'Raliatbehn' },
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

export { sampleUserData, secureStorage };
