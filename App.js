import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';

import React, {Component} from 'react';
import useState from 'react';
import {firebase} from './firebase_config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import UserTable from './UserTable';

const App = () => {
  const initialFormState = {id: null, name: '', username: ''};

  // Setting state
  const [users, setUsers] = React.useState([]);
  const usersCollectionRef = collection(firebase, 'Users');

  const [currentUser, setCurrentUser] = React.useState(initialFormState);
  const [editing, setEditing] = React.useState(false);

  // CRUD operations
  const addUser = user => {
    user.id = users.length + 1;
    addDoc(usersCollectionRef, user);
  };

  const deleteUser = async id => {
    const userDoc = doc(firebase, 'Users', id);
    await deleteDoc(userDoc);
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);

    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  const editRow = user => {
    setEditing(true);

    setCurrentUser({id: user.id, name: user.name, username: user.username});
  };

  React.useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    };

    getUsers();
  }, [usersCollectionRef]);

  return (
    <ScrollView style={styles.container}>
      {users.map((item, i) => {
        return <Text key={i} title={item.name} />;
      })}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
