import React from 'react';

const FavoriteList = () => {
    return (
        <View style={styles.headerContainer}>
            <HeaderBar backButton={true} navigation={navigation} name={"Search"}></HeaderBar>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        backgroundColor: '#E5E5E5',
        height: '100%',
    },

    productImage: {
        height: 60,
        width: 60,
        marginHorizontal: 20,
    },
    productsContainer: {
        flex: 1,
        flexGrow: 10,
        // alignItems: "center",
        padding: 10,
        backgroundColor: '#E5E5E5',
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
        marginBottom: 10,
    },
    productContent: {
        flex: 1,
        flexGrow: 3,
        padding: 10,
        borderLeftColor: '#E5E5E5',
        borderLeftWidth: 2,
    },

    yellowBtn: {
        padding: 10,
        width: "100%",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#F6EC33',
        backgroundColor: '#F6EC33',
    },

    myTabBtnStyle: {
        color: Colors.dark,
        fontSize: 30,
        width: 120,
        fontWeight: 600,
        borderBottomWidth: 6,
        borderColor: Colors.themeColorHigh,
        marginHorizontal: 10
    },
    myTabBtnArea: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
});

export default FavoriteList;