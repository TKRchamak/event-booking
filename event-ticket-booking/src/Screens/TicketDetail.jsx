import React from 'react';
import HeaderBar from '../Components/HeaderBar/HeaderBar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';
import QRCode from 'react-native-qrcode-svg';

const TicketDetail = ({ navigation, route }) => {
    // const item = route.params || 'No data received';
    const item = {
        price: 400,
        user: "64f0d67dfca07593473d7105",
        event: {
            _id: "64f5d322dac3fdef92b4493f",
            name: "Jurassic world ",
            title: "jurassicWorld",
            organizer: "64f2ef50ecbec3a424fe0d4f",
            city: "Chittagong",
            type: "Movie",
            location: {
                timestamp: 1693831966821,
                mocked: false,
                coords: {
                    altitude: -43.19999694824219,
                    heading: 0,
                    altitudeAccuracy: 100,
                    latitude: 23.7935717,
                    speed: 0,
                    longitude: 90.4201978,
                    accuracy: 100
                }
            },
            image: "https://res.cloudinary.com/dlqrqkxn4/image/upload/v1693831888/emsrfzm5e0tcryvsnhux.jpg",
            poster: "https://res.cloudinary.com/dlqrqkxn4/image/upload/v1693831882/mbjnebklombop04ppdcr.jpg",
            general_info: "Shjssbdjdje. Eieie ieie",
            description: "Bxnxnddnjddjdjd",
            seat_quantity: "50",
            time_slot: [
                {
                    id: "436f3bba-e157-4757-a08d-e4c2c629e0d0",
                    from: "7:00 PM",
                    to: "9:00 PM"
                }
            ],
            reviews: [],
            ticket_cat: [],
            ticket_price: 400,
            duration: 120,
            __v: 0
        },
        ticket_date: "2023-09-09T14:22:33.644Z",
        time_slot: {
            from: "7:00 PM",
            id: "436f3bba-e157-4757-a08d-e4c2c629e0d0",
            to: "9:00 PM"
        },
        quantity: 3,
        status: "active",
        discount: 0,
        description: "",
        _id: "64fab92900b6d0872105cdb0",
        createdAt: "2023-09-08T06:03:21.354Z",
        updatedAt: "2023-09-08T06:03:21.354Z",
        __v: 0
    }
    return (
        <View style={styles.headerContainer}>
            <HeaderBar navigation={navigation} name={""}></HeaderBar>

            <ScrollView style={styles.productsContainer}>
                <View style={{
                    width: "100%",
                    // height: 420,
                    justifyContent: "center",
                    alignItems: "center",
                    // borderWidth: 2,
                    // borderColor: "blue",
                    // borderRadius: 10,
                    overflow: "hidden"
                }}>
                    <View style={{
                        height: 240,
                        width: "100%",
                        overflow: "hidden",
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30
                    }}>
                        <Image style={{ height: "100%", width: "100%" }} source={{ uri: item?.event?.image }}></Image>
                        <View style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                            backgroundColor: "#00000080",
                            padding: 15,
                            flexDirection: "row"
                        }}>
                            <View style={{
                                height: "100%",
                                width: "60%",
                            }}>
                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 24,
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 2,
                                    fontWeight: "600",
                                    marginBottom: 8,
                                }}>{item?.event?.name}</Text>


                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                }}>location</Text>

                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    marginBottom: 8,
                                }}>Event Address</Text>

                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 18,
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 0,
                                    fontWeight: "600"
                                }}>{item?.event?.city}</Text>

                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 24,
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 0,
                                    fontWeight: "600"
                                }}>TK {item?.price * item?.quantity}</Text>
                            </View>


                            <View style={{
                                height: "100%",
                                width: "40%",
                                justifyContent: 'flex-end'
                            }}>
                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                    marginBottom: 0,
                                }}>Date</Text>
                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 18,
                                    fontFamily: "Poppins-Bold",
                                    marginBottom: 0,
                                    fontWeight: "600"
                                }}>{new Date(item?.ticket_date).toDateString()}</Text>


                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 14,
                                    fontFamily: "Poppins-Regular",
                                }}>Time</Text>
                                <Text style={{
                                    color: Colors.light,
                                    fontSize: 18,
                                    fontFamily: "Poppins-Bold",
                                    fontWeight: "600",
                                    marginBottom: 8,
                                }}>{item?.time_slot?.from}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        height: 220,
                        width: "100%",
                        overflow: "hidden",
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderColor: Colors.gray,
                        borderStyle: "dashed",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <QRCode
                            value={`${item?._id}`} // Your data to be encoded in the QR code
                            size={180}   // Size of the QR code
                            backgroundColor="white" // Background color of the QR code
                            color="black"           // Color of the QR code modules (dots)
                        />
                        {/* <Image style={{ height: "100%", width: "100%" }} source={{ uri: item?.event?.image }}></Image> */}
                        <View style={[styles.borderCorner, { position: "absolute", top: -47, left: -47 }]} />
                        <View style={[styles.borderCorner, { position: "absolute", top: -47, right: -47 }]} />
                    </View>

                    <View style={[styles.halfCircle, { position: "absolute", top: 195, left: -45 }]} />
                    <View style={[styles.halfCircle, { position: "absolute", top: 195, right: -45 }]} />

                </View>

                <View style={{
                    width: "100%",
                    // height: 100,
                    // justifyContent: "center",
                    // alignItems: "center",
                    // borderWidth: 2,
                    // borderColor: "yellow",
                    // borderRadius: 10,
                    padding: 20
                }}>
                    <Text style={{
                        color: Colors.dark,
                        fontSize: 22,
                        fontFamily: "Poppins-Bold",
                        marginBottom: 10,
                    }}>Covid-19 Guidlines :</Text>
                    <Text style={{
                        color: Colors.dark,
                        fontSize: 16,
                        fontFamily: "Poppins-Regular",
                        marginBottom: 0,
                    }}>1.  Dont remove your mask, if noticed you will be thrown out of the event.</Text>
                    <Text style={{
                        color: Colors.dark,
                        fontSize: 16,
                        fontFamily: "Poppins-Regular",
                        marginBottom: 0,
                    }}>2.   Please check your temperature before entering the event.</Text>
                    <Text style={{
                        color: Colors.dark,
                        fontSize: 16,
                        fontFamily: "Poppins-Regular",
                        marginBottom: 0,
                    }}>3.   Maintain social distance</Text>
                </View>
            </ScrollView>
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
        overflow: "hidden"
    },

    halfCircle: {
        width: 90,
        height: 90, // Half of the card's height
        borderRadius: 45, // Half of the card's height to create a perfect half circle
        backgroundColor: Colors.light, // Adjust the color as needed
        // borderColor: "green",
        // borderWidth: 2
    },
    borderCorner: {
        width: 92, // Adjust the border's width and height as needed
        height: 92,
        borderWidth: 2,
        borderColor: Colors.gray,
        borderRadius: 46,
        backgroundColor: 'transparent',
        borderStyle: "dashed",
        // transform: [{ rotate: '233deg' }], // Rotate by 45 degrees to create the corner effect
    },
});


export default TicketDetail;