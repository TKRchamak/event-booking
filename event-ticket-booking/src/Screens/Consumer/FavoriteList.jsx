import React from 'react';

const FavoriteList = () => {
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

export default FavoriteList;