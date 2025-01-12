import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../theme/Colors';
import { useGetTreeQuery } from '../store/api/treeApiSlice';
import { useSelector } from 'react-redux';
import { getCurrentTreeId } from '../store/slices/treeSlice';
import { sampleUserData as userData } from '../utils';

const FamilyTree = () => {
  const treeId = useSelector(getCurrentTreeId);

  const {
    data: userDataW,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTreeQuery(treeId);

  // Helper to chunk children and siblings into rows of 3
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const siblingsChunks = chunkArray(userData?.siblings || [], 3);
  const childrenChunks = chunkArray(userData?.children || [], 3);

  return (
    <View style={styles.container}>
      {/* <View>
        <TouchableOpacity style={[styles.addMemberBtn, styles.btn]}>
          <Text style={styles.btnText}>Add Family Member</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.myProfileBtn, styles.btn]}>
          <Text style={styles.btnText}>My Profile</Text>
        </TouchableOpacity>
      </View> */}

      {userData?.name ? (
        <View>
          {/* Parents */}
          <View style={styles.category}>
            <Text style={styles.heading}>Father and Mother</Text>
            <View style={styles.row}>
              {userData?.father && (
                <View
                  style={[
                    styles.node,
                    { backgroundColor: Colors.genderBlueNode },
                  ]}
                >
                  <Text style={styles.text}>{userData?.father}</Text>
                </View>
              )}

              {userData?.mother && (
                <View
                  style={[
                    styles.node,
                    { backgroundColor: Colors.genderPinkNode },
                  ]}
                >
                  <Text style={styles.text}>{userData?.mother}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Siblings */}
          <View style={styles.category}>
            <Text style={styles.heading}>Siblings</Text>
            {userData.siblings &&
              (siblingsChunks || []).map((chunk, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {(chunk || []).map((child, index) => (
                    <View
                      key={index}
                      style={[
                        styles.node,
                        {
                          backgroundColor:
                            child.gender === 'Male'
                              ? Colors.genderBlueNode
                              : Colors.genderPinkNode,
                        },
                      ]}
                    >
                      <Text style={styles.text}>{child?.childName}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>

          {/* User and Spouse */}
          <View style={styles.category}>
            <Text style={styles.heading}>You and Spouse</Text>
            <View style={styles.row}>
              {/* No conditional here, because if there's userData, there's going to be a name */}
              <View
                style={[
                  styles.node,
                  {
                    backgroundColor:
                      userData?.gender === 'Male'
                        ? Colors.genderBlueNode
                        : Colors.genderPinkNode,
                  },
                ]}
              >
                <Text style={styles.text}>{userData?.name}</Text>
              </View>
              {userData?.spouse && (
                <View
                  style={[
                    styles.node,
                    {
                      backgroundColor:
                        userData?.gender === 'Male'
                          ? Colors.genderPinkNode
                          : Colors.genderBlueNode,
                    },
                  ]}
                >
                  <Text style={styles.text}>{userData?.spouse}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Children */}
          <View style={styles.category}>
            <Text style={styles.heading}>Children</Text>
            {userData?.children &&
              (childrenChunks || []).map((chunk, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {(chunk || []).map((child, index) => (
                    <View
                      key={index}
                      style={[
                        styles.node,
                        {
                          backgroundColor:
                            child.gender === 'Male'
                              ? Colors.genderBlueNode
                              : Colors.genderPinkNode,
                        },
                      ]}
                    >
                      <Text style={styles.text}>{child?.childName}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        </View>
      ) : (
        <Text>No Data Found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // just a duller white, better to the eyes
  },

  addMemberBtn: {
    position: 'absolute',
    left: 30,
    top: 100,
  },
  myProfileBtn: {
    position: 'absolute',
    right: 30,
    top: 100,
  },
  btn: {
    height: 50,
    backgroundColor: Colors.submitButtonBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    marginBottom: 36,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333', // just a duller black, better to the eyes
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'center',
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
    fontSize: 16,
  },
});

export default FamilyTree;
