import { useState } from 'react';
import {Button, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity, FlatList} from 'react-native';

export const Calender = ({label, data, onSelect}) => {
    const [synlig, setSynlig] = useState(false);
    const [selected, setSelected] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");

    const date =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]



    const toggleDropdown = () => {
        setSynlig(!synlig)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );
    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item)
        setSynlig(false);
    };


    const renderDropdown = () => {

        if(synlig){
            return(
                <Modal visible={synlig} transparent animationType="none">
                    <TouchableOpacity
                        style={styles.overlay}
                        onPress={() => setSynlig(false)}
                    >
                        <View style={[styles.dropdown]}>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            );
        }


    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={toggleDropdown}

        >
            {renderDropdown()}
            <Text style={styles.buttonText}>
                {(selected && selected.label) || label}
            </Text>
        </TouchableOpacity>
    );


}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    dropdown: {
        position: 'absolute',
        bottom: 100,
        top: 100,
        backgroundColor: '#fff',
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        overflow: "hidden",


    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },



});
