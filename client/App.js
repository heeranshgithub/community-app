import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import PersonDetails from './src/components/PersonDetails'
import FamilyTree from './src/components/FamilyTree'
import Register from './src/screens/Register'
import Form from './src/components/Form'
import Login from './src/screens/Login'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="white" />
      <Form />
      {/* <PersonDetails /> */}
      {/* <FamilyTree /> */}
      {/* <Register /> */}
      {/* <Login /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
