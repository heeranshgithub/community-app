import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../theme/Colors'

const FamilyTree = () => {
  const userData = {
    name: 'Mohandas',
    gender: 'male',
    spouse: { gender: 'female', spouseName: 'Kasturba' },
    parents: { father: 'Karamchand', mother: 'Putlibhai' },
    children: [
      { gender: 'male', childName: 'Harilal' },
      { gender: 'male', childName: 'Manilal' },
      { gender: 'male', childName: 'Ramdas' },
      { gender: 'male', childName: 'Devdas' },
      { gender: 'female', childName: 'Devika' },
      { gender: 'female', childName: 'Ramika' },
    ],
  }

  // Helper to chunk children into rows of 3
  const chunkArray = (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const childrenChunks = chunkArray(userData?.children || [], 3)

  return (
    <View style={styles.container}>
      {/* Parents */}
      <Text style={styles.heading}>Father and Mother</Text>
      <View style={styles.row}>
        <View
          style={[styles.node, { backgroundColor: Colors.genderBlueNodeColor }]}
        >
          <Text style={styles.text}>{userData?.parents?.father}</Text>
        </View>
        <View
          style={[styles.node, { backgroundColor: Colors.genderPinkNodeColor }]}
        >
          <Text style={styles.text}>{userData?.parents?.mother}</Text>
        </View>
      </View>

      {/* User and Spouse */}
      <Text style={styles.heading}>You and Spouse</Text>
      <View style={styles.row}>
        <View
          style={[
            styles.node,
            {
              backgroundColor:
                userData?.gender === 'male'
                  ? Colors.genderBlueNodeColor
                  : Colors.genderPinkNodeColor,
            },
          ]}
        >
          <Text style={styles.text}>{userData?.name}</Text>
        </View>
        <View
          style={[
            styles.node,
            {
              backgroundColor:
                userData?.gender === 'male'
                  ? Colors.genderPinkNodeColor
                  : Colors.genderBlueNodeColor,
            },
          ]}
        >
          <Text style={styles.text}>{userData?.spouse?.spouseName}</Text>
        </View>
      </View>

      {/* Children */}
      <Text style={styles.heading}>Children</Text>

      {(childrenChunks || []).map((chunk, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {(chunk || []).map((child, index) => (
            <View
              key={index}
              style={[
                styles.node,
                {
                  backgroundColor:
                    child.gender === 'male'
                      ? Colors.genderBlueNodeColor
                      : Colors.genderPinkNodeColor,
                },
              ]}
            >
              <Text style={styles.text}>{child?.childName}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // just a duller white, better to the eyes
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
    color: '#333', // just a duller black, better to the eyes
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    marginBottom: 24,
  },
  node: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    elevation: 2, // adds a subtle shadow effect on Android
    // iOS shadow
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset: X = 0, Y = 2
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Blurriness of the shadow
  },
  text: {
    fontSize: 14,
  },
})

export default FamilyTree
