import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import { useDispatch } from 'react-redux';
import { setCurrentLocation } from '../../Redux/organizerSlice';

const PickLocationFromMap = ({ navigation }) => {
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        console.log(coordinate);
        setSelectedLocation(coordinate);
    };

    return (
        <View style={{ flex: 1, width: "100%", height: 300 }} >
            {/* <View style={{ position: "absolute", top: 30, left: 30, borderColor: Colors.light, backgroundColor: "#00000050", borderRadius: 16 }}>
                <AntDesign name="left" size={24} color={Colors.light} />
            </View> */}
            {
                location ?
                    (
                        <MapView
                            style={{ flex: 1, width: "100%", height: 300 }}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            showsUserLocation={true}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                                title="Your Location"
                            />
                        </MapView>
                    )
                    : <MapView style={styles.map} showsUserLocation={true} onPress={handleMapPress}>
                        {selectedLocation && (
                            <Marker
                                coordinate={selectedLocation}
                                title="Selected Location"
                                description="This is the location you picked."
                            />
                        )}
                    </MapView>}

            <CustomBtn
                height={60}
                marginBottom={0}
                radius={0}
                textColor={Colors.light}
                text={"Pick Location"}
                // disabled={true}
                func={() => {
                    dispatch(setCurrentLocation(location));
                    navigation.goBack();
                }}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default PickLocationFromMap;