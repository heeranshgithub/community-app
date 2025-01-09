import { Platform, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import store from './src/store/store'
import MainNavigation from './src/navigation/MainNavigation'
// import { useEffect } from 'react'
// import axios from 'axios'

const currBaseSimURL =
  Platform.OS === 'ios'
    ? 'http://localhost:5001/api/v1/' // iOS simulator uses localhost
    : 'http://10.0.2.2:5001/api/v1/' // Android emulator uses 10.0.2.2

export default function App() {
  // useEffect(() => {
  //   const testCall = async () => {
  //     const res = await axios.get(currBaseSimURL + 'test')
  //     console.log('res.data from App.js: ', res.data)
  //   }

  //   testCall()
  // }, [])

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
