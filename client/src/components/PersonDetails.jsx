import React from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native'

const data = [
  { key: 'Name', value: 'John Doe' },
  { key: 'Number', value: '1234567890' },
  { key: 'Address', value: '123 Main St' },
  { key: 'Family Head', value: 'John Zoe' },
  { key: 'Age', value: '30' },
  { key: 'Gender', value: 'Male' },
  { key: 'Education', value: 'M.Tech.' },
  { key: 'Company', value: 'ABC Inc.' },
  {
    key: 'About',
    value:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor nesciunt tempore asperiores est officiis eos repellat odio corrupti blanditiis amet! Quibusdam quas dolore ipsum assumenda eos quo autem aliquam minima!',
  },
]

const PersonDetails = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{item.key}</Text>
      <Text style={styles.itemText}>{item.value}</Text>
    </View>
  )

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Details</Text>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  text: {
    backgroundColor: 'white',
    color: '#1F2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#96a2b5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default PersonDetails
