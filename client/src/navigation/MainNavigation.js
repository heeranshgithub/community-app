import { NavigationContainer } from '@react-navigation/native';
import { getUserToken } from '../store/slices/userSlice';
import FamilyTree from '../screens/FamilyTree';
import Register from '../screens/Register';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const MainNavigation = () => {
  const userToken = useSelector(getUserToken);

  return (
    <NavigationContainer>
      <StatusBar style='white' />
      {userToken ? <FamilyTree /> : <Register />}
    </NavigationContainer>
  );
};

export default MainNavigation;
