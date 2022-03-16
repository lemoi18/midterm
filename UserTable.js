import React from 'react';
import {FlatList, List, Text} from 'react-native';

const UserTable = props => (
  <List>
    <FlatList
      data={this.props.users}
      renderItem={({item}) => <Text>{item.key}</Text>}
    />
  </List>
);

export default UserTable;
