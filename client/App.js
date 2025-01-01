import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Form from './src/components/Form'
import { useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const data = {
    name: 'Mohandas',
    number: '1234567890',
    password: 'secret',
  }

  const url = 'http://localhost:5001/api/v1/user/register'
  useEffect(() => {
    const registerUser = async () => {
      try {
        const res = await axios.post(url, data)
        console.log('res:', res.data) // Logging only the data property for clarity
      } catch (error) {
        console.log('Error:', error.message)
        if (error.response) {
          console.log('Error Response Data:', error.response.data)
        }
      }
    }


    registerUser()
    console.log('hello')
  }, [url, data])
  return (
    <View style={styles.container}>
      <StatusBar style="white" />
      <Form />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
