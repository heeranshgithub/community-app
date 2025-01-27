import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../store/store';
import { getUserToken, setUser } from '../store/slices/userSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../../global.css'; // for nativewind
import { secureStorage } from '../utils';

// Auth wrapper component
const AuthWrapper = () => {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const initializeAuth = async () => {
      //method setting user token and user id into user slice when the app opens
      try {
        const [userToken, userId] = await Promise.all([
          secureStorage.getUserToken(),
          secureStorage.getUserId(),
        ]);
        if (userToken && userId)
          dispatch(setUser({ id: userId, token: userToken }));
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };
    if (!userToken) initializeAuth();
    if (!userToken && !inAuthGroup) {
      // Redirect to register if no token and not already in auth group
      router.replace('/register');
    } else if (userToken && inAuthGroup) {
      // Redirect to family-tree if has token but still in auth group
      router.replace('/family-tree');
    }
  }, [userToken, segments]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  );
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthWrapper />
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
