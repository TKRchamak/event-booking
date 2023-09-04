import React from 'react';
import { Image, Text, View } from 'react-native';

const EmptyListScreen = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image style={{ height: 100, width: 100, marginLeft: 20 }} source={require("../../assets/img/searchError.png")}></Image>
            <Text style={{ textAlign: "center" }}>we are sorry, we can not</Text>
            <Text style={{ textAlign: "center" }}>find anything :(</Text>
        </View>
    );
};

export default EmptyListScreen;