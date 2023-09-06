import React from 'react';
import HeaderBar from '../Components/HeaderBar/HeaderBar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';

const TicketDetail = ({ navigation, route }) => {
    const item = route.params || 'No data received';
    return (
        <View style={styles.headerContainer}>
            <HeaderBar navigation={navigation} name={""}></HeaderBar>

            <View style={styles.productsContainer}>
                <View style={{
                    width: "100%",
                    height: 420,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View style={{
                        width: 300,
                        height: 420,
                        borderWidth: 2,
                        borderColor: "red",
                        borderRadius: 10
                    }}>
                        <Image style={{ height: 100, width: 100, marginLeft: 20 }} source={require("../../assets/img/searchError.png")}></Image>
                    </View>
                </View>
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: Colors.light,
    },

    productsContainer: {
        flex: 1,
        flexGrow: 10,
        padding: 10,
        backgroundColor: Colors.light,
    }

});


export default TicketDetail;