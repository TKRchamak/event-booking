import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Colors from '../../utils/Colors';

const WatchList = () => {
    return (
        <View style={styles.headerContainer}>
            <HeaderBar backButton={true} navigation={navigation} name={"Watch List"}></HeaderBar>

            <View style={styles.productsContainer}>

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


export default WatchList;