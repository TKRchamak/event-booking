import React from 'react';
import HeaderBar from '../Components/HeaderBar/HeaderBar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../utils/Colors';
import QRCode from 'react-native-qrcode-svg';

const TicketDetail = ({ navigation, route }) => {
    const item = route.params || 'No data received';
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