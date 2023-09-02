import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';

const CustomInput = ({ searchText, setSearchText }) => {
    return (
        <View style={{ padding: 10, height: 60, flexDirection: "row" }}>
            <View style={styles.letIconBox}>
                {/* <TouchableOpacity onPress={() => setSearchText("")}> */}
                <AntDesign name="search1" size={24} color={Colors.gray} />
                {/* </TouchableOpacity> */}
            </View>
            <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            <View style={styles.IconBox}>
                {
                    searchText &&
                    <TouchableOpacity onPress={() => setSearchText("")}>
                        <AntDesign name="closecircleo" size={24} color={Colors.gray} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    input: {
        flex: 9,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        // borderTopLeftRadius: 20,
        // borderBottomLeftRadius: 20,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: '#949494',
        backgroundColor: '#fff',
    },
    IconBox: {
        flex: 1,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderLeftWidth: 0,
        borderColor: '#949494',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    },
    letIconBox: {
        flex: 1,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderRightWidth: 0,
        borderColor: '#949494',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    }
})