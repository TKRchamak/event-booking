import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '../utils/Colors';

const BigEventCard = ({ item, index, func }) => {
    // console.log(item);
    return (
        <Pressable onPress={func} style={{
            height: 300,
            width: 220,
            alignItems: "flex-end",
            padding: 10,
            // borderWidth: 2,
            // borderColor: "red",
        }}>
            <Image source={{ uri: item?.image }} style={{ width: 180, height: 250, borderRadius: 14 }} />
            <View style={{ position: "absolute", top: 85, left: 0, }}>
                <Text style={styles.number}>{index + 1}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    number: {
        fontWeight: "600",
        fontSize: 180, // Set the font size to 200
        color: '#242A32', // Set the text color to white
        textShadowColor: Colors.light, // Set the stroke color to red
        textShadowOffset: { width: 0, height: 0 }, // No offset for the shadow
        textShadowRadius: 10, // Adjust the shadow radius as needed
    },
});

export default BigEventCard;