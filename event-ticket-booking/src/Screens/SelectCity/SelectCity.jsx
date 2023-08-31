import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import { Searchbar } from 'react-native-paper';

const SelectCity = (props) => {
    const { navigation } = props;
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <HeaderBar
                backButton={true}
                navigation={navigation}
                name={"Select Your City"}
                func={() => {
                    navigation.goBack();
                }}
            />
            <View style={{ flex: 1, flexGrow: 1, borderWidth: 2, borderColor: "blue", paddingHorizontal: 20, paddingVertical: 10 }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <View style={{ flex: 1, flexGrow: 10, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "red" }}>
                {/* <FlatList
                    horizontal={true}
                    data={photo}
                    renderItem={({ item }) => <Image source={{ uri: item?.uri }} style={{ width: 200, height: 200 }} />}
                    keyExtractor={item => item.uri}
                /> */}
            </View>
            <View style={{ flex: 1, flexGrow: 1, borderWidth: 2, borderColor: "yellow" }}>
                <CustomBtn
                    height={60}
                    textColor={Colors.light}
                    text={"Log Out"}
                    radius={0}
                    func={async () => {
                        await AsyncStorage.removeItem("userData");
                        dispatch(setUserData({ data: {}, token: "" }));
                    }}
                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        width: "100%",
        height: "100%",
    },
});

export default SelectCity;