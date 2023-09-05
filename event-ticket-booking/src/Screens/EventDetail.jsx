import React, { useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Modal from 'react-native-modal';
import { Avatar } from "react-native-paper";
import { Button, Dialog, Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, EvilIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import CustomBtn from "../Components/CustomBtn/CustomBtn";
import EmptyListScreen from "../Components/EmptyListScreen";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../utils/globalStyles";
import { presentPaymentSheet, useStripe } from "@stripe/stripe-react-native";
import rootUrl from "../Services/rootUrl";

const EventDetail = ({ navigation, route }) => {

    const { initPaymentSheet, presentPaymentSheet, confirmPayment, createPaymentMethod } = useStripe();

    const createPaymentIntent = async () => {
        let amount = Math.floor(ticketQuantity * item.ticket_price * 100);
        const { data } = await axios.post(
            `${rootUrl}/api/v1/payment/intents`,
            {
                // amount: "33055" // it can not accept 330.55 || so that mean the 33055 === 330.55
                amount: amount
            }
        );
        return data;
    }


    const onCreateTicket = async () => {
        let amount = Math.floor(ticketQuantity * item.ticket_price * 100);
        const { data } = await axios.post(
            `${rootUrl}/api/v1/payment/intents`,
            {
                // amount: "33055" // it can not accept 330.55 || so that mean the 33055 === 330.55
                amount: amount
            }
        );
        return data;
    }

    const onCheckout = async () => {
        const intentResponse = await createPaymentIntent();
        if (intentResponse.error) {
            Alert.alert("Something went wrong");
            return;
        }

        const initResponse = await initPaymentSheet({
            merchantDisplayName: "Event_Booking_Merchant.dev",
            paymentIntentClientSecret: intentResponse.paymentIntent
        })
        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert("Something went wrong");
            return;
        }
        console.log("initResponse", initResponse);

        const paymentResponse = await presentPaymentSheet();
        if (paymentResponse.error) {
            Alert.alert(
                `Error code : ${paymentResponse.error.code}`,
                paymentResponse.error.message
            )
            return;
        }

        // onCreateOrder(); // this is my function to append order in my database;
    }




    // const item = route.params || 'No data received';
    const item = {
        __v: 0,
        _id: "64f5d322dac3fdef92b4493f",
        city: "Chittagong",
        description: "Bxnxnddnjddjdjd",
        duration: 120,
        general_info: "Shjssbdjdje. Eieie ieie",
        image: "https://res.cloudinary.com/dlqrqkxn4/image/upload/v1693831888/emsrfzm5e0tcryvsnhux.jpg",
        location: {
            coords: {
                accuracy: 100,
                altitude: -43.19999694824219,
                altitudeAccuracy: 100,
                heading: 0,
                latitude: 23.7935717,
                longitude: 90.4201978,
                speed: 0
            },
            mocked: false,
            timestamp: 1693831966821
        },
        name: "Jurassic world ",
        organizer: "64f2ef50ecbec3a424fe0d4f",
        poster: "https://res.cloudinary.com/dlqrqkxn4/image/upload/v1693831882/mbjnebklombop04ppdcr.jpg",
        reviews: [],
        seat_quantity: "50",
        ticket_cat: [],
        ticket_price: 400,
        time_slot: [
            {
                from: "7:00 PM",
                id: "436f3bba-e157-4757-a08d-e4c2c629e0d0",
                to: "9:00 PM"
            }
        ],
        title: "jurassicWorld",
        type: "Movie"
    }

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);
    const [isModalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState([false, ""]);
    const [activeTab, setActiveTab] = useState("about_movie");
    const [selectedTime, setSelectedTime] = useState(item?.time_slot[0]);
    const [ticketQuantity, setTicketQuantity] = useState(0);


    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const [selectDate, setSelectDate] = useState(new Date());
    const nextSevenDays = new Date();
    nextSevenDays.setDate(nextSevenDays.getDate() + 7);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const handleToTimeChange = (event, selectedDate) => {
        if (selectedDate) {
            setSelectDate(selectedDate);
            setShowDatePicker(false);
        }
    };

    return (
        <View style={styles.headerContainer}>
            <Portal>
                <Dialog
                    visible={visible[0]}
                    onDismiss={hideDialog}
                    style={{ color: Colors.error }}
                >
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{visible[1]}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Modal
                isVisible={true}
                animationIn="slideInUp" // Use slideInUp for bottom to top animation
                animationOut="slideOutDown" // Use slideOutDown for closing animation
                backdropOpacity={0.5}
                onBackdropPress={toggleModal}
                animationInTiming={1000}
                animationOutTiming={1000}
                style={styles.modal}
                avoidKeyboard={true}
                onBackButtonPress={() => toggleModal()}
            >
                <View style={styles.modalContent}>
                    <View style={{ position: "absolute", top: 16, right: 16 }}>
                        <AntDesign onPress={toggleModal} name="closecircleo" size={28} color={Colors.dark} />
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 5
                    }}>
                        <MaterialIcons name="event" size={24} color="black" />
                        <Text style={{ fontSize: 18, marginLeft: 8 }}>Select Your Date and Session</Text>
                    </View>

                    <View style={{ marginTop: 20, flexDirection: "row", width: "100%", justifyContent: 'space-between', alignItems: "center" }}>

                        {/* dropdown area start */}
                        <View style={{
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderRadius: 10,
                            overflow: 'hidden',
                            width: "54%",
                            height: 56,
                        }}>
                            <View style={{
                                flexDirection: 'row', // Align the clock icon and picker horizontally
                                alignItems: 'center', // Center the clock icon vertically
                                // paddingLeft: 10, // Add some padding to the left of the picker
                            }}>
                                {/* <AntDesign
                                name="clockcircleo"
                                size={24} color="black"
                                style={{
                                    width: 24, // Set the width of the clock icon
                                    height: 24, // Set the height of the clock icon
                                    marginRight: 5, // Add some margin to separate the icon from the picker
                                }}
                            /> */}
                                <Picker
                                    selectedValue={selectedTime}
                                    onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
                                    style={{
                                        flex: 1, // Take up the remaining space horizontally
                                        height: 50,
                                        color: 'black',
                                        backgroundColor: 'white',
                                        borderColor: Colors.gray,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                    }}
                                >
                                    {
                                        (item?.time_slot).map(slot => <Picker.Item key={slot.id} label={`${slot.from}-${slot.to}`} value={slot} />)
                                    }
                                </Picker>
                            </View>
                        </View>
                        {/* dropdown area start */}


                        {showDatePicker && (
                            <DateTimePicker
                                value={selectDate}
                                maximumDate={nextSevenDays} // Restrict selection to today or earlier
                                minimumDate={selectDate} // Restrict selection to the last 30 days
                                mode="date"
                                display="default"
                                onChange={handleToTimeChange}
                            />
                        )}
                        <TouchableOpacity style={{ width: "45%" }} onPress={() => setShowDatePicker(true)}>
                            <View
                                style={{
                                    height: 56,
                                    width: "100%",
                                    borderRadius: 10,
                                    borderColor: Colors.gray,
                                    borderWidth: 1,
                                    flexDirection: "row",
                                    // justifyContent: "center",
                                    alignItems: "center",
                                    padding: 10
                                }}
                            >
                                <MaterialIcons
                                    name="date-range"
                                    size={24} color="black"
                                    style={{
                                        width: 24, // Set the width of the clock icon
                                        height: 24, // Set the height of the clock icon
                                        marginRight: 5, // Add some margin to separate the icon from the picker
                                    }}
                                />
                                <Text style={{ fontSize: 16 }}>{selectDate.toDateString()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            width: "90%",
                            justifyContent: "space-between",
                            paddingTop: 30,
                            paddingBottom: 10,
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: 16,
                                fontWeight: "600",
                                color: Colors.dark
                            }}
                        >
                            Per Ticket : ${item.ticket_price}
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>


                            <TouchableOpacity
                                onPress={() => {
                                    if (ticketQuantity > 0) {
                                        setTicketQuantity(prev => prev - 1)
                                    }
                                }}
                            >
                                <AntDesign
                                    name="minuscircle"
                                    size={30}
                                    color={Colors.gray}
                                    style={{
                                        width: 30, // Set the width of the clock icon
                                        height: 30, // Set the height of the clock icon
                                        // marginRight: 5, // Add some margin to separate the icon from the picker
                                        // backgroundColor: Colors.gray
                                    }}
                                />
                            </TouchableOpacity>


                            <Text
                                style={{
                                    color: Colors.themeColorLow,
                                    backgroundColor: '#F2F2F2',
                                    marginHorizontal: 10,
                                    padding: 8,
                                    borderRadius: 25,
                                    fontSize: 20
                                }}
                            >
                                {ticketQuantity}
                            </Text>


                            <TouchableOpacity
                                onPress={() => {
                                    setTicketQuantity(ticketQuantity + 1)
                                }}
                            >
                                <AntDesign
                                    name="pluscircle"
                                    size={30}
                                    color={Colors.gray}
                                    style={{
                                        width: 30, // Set the width of the clock icon
                                        height: 30, // Set the height of the clock icon
                                        // marginRight: 5, // Add some margin to separate the icon from the picker
                                        // backgroundColor: Colors.gray
                                    }}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={globalStyles.dottedLine}></View>

                    <View style={{
                        width: "100%",
                        marginTop: "auto",
                        marginBottom: 0
                    }}>
                        <CustomBtn
                            height={60}
                            // marginBottom={10}
                            textColor={Colors.light
                            }
                            disabled={ticketQuantity > 0 ? false : true}
                            text={(ticketQuantity > 0) ? `GET IN - ${(ticketQuantity * item.ticket_price).toFixed(2)}` : "SELECT A SESSION"}
                            func={() => { onCheckout() }}
                        />
                    </View>

                </View>
            </Modal >

            <View style={{ width: "100%", height: 200 }}>
                {/* ===================== poster area start ===================== */}
                {!item?.poster ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Avatar.Icon
                            size={90}
                            icon="camera"
                            color={Colors.themeColorHigh}
                            style={{ backgroundColor: Colors.light }}
                        />
                        <Text>Event Poster</Text>
                    </View>
                ) : (
                    <Image
                        source={{ uri: item?.poster }}
                        style={{
                            height: "100%",
                            width: "100%",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                    />
                )}

                <LinearGradient
                    useAngle
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={["transparent", Colors.dark]}
                    style={{
                        // flex: 1,
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        justifyContent: "flex-end",
                        paddingHorizontal: 10,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        position: "absolute",
                    }}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        width: 35,
                        height: 40,
                        left: 20,
                        top: 20,
                        position: 'absolute',
                        borderWidth: 1,
                        borderColor: Colors.light,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5
                    }}>
                    <AntDesign name="left" size={24} color={Colors.light} />
                </TouchableOpacity>
                {/* ===================== poster area end ===================== */}

                {/* Logo area */}
                <View
                    style={{
                        width: 100,
                        height: 120,
                        left: 40,
                        top: 130,
                        position: "absolute",
                        borderRadius: 15,
                        overflow: "hidden",
                        backgroundColor: Colors.light,
                        borderWidth: 1,
                        borderColor: Colors.gray,
                    }}
                >
                    {!item?.image ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Avatar.Icon
                                size={40}
                                icon="camera"
                                color={Colors.themeColorHigh}
                                style={{ backgroundColor: Colors.light }}
                            />
                            <Text>Event Logo</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: item?.image }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                    {/* <TouchableOpacity
                        onPress={() => pickImage()}
                        style={{
                            width: 30,
                            height: 30,
                            right: 5,
                            top: 5,
                            position: "absolute",
                            borderWidth: 1,
                            borderColor: Colors.light,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            backgroundColor: "#00000030",
                        }}
                    >
                        <AntDesign name="edit" size={20} color={Colors.dark} />
                    </TouchableOpacity> */}
                </View>

                {/* Title area */}
                <View
                    style={{
                        height: 40,
                        left: 160,
                        top: 210,
                        position: "absolute",
                        // borderWidth: 2,
                        // borderColor: "red",
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 600 }}>{(`${item?.name}`).toUpperCase()}</Text>
                </View>
            </View>

            {/* must need this space for logo image bottom portion */}
            <View
                style={{
                    width: "100%",
                    height: 110,
                    // height: 60,
                    justifyContent: "flex-end",
                    // borderWidth: 2,
                    // borderColor: "red"
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                        // borderWidth: 2,
                        // borderColor: "red"
                    }}
                >
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                        paddingHorizontal: 10,
                    }}>
                        <MaterialIcons name="category" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            {item?.type}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                        paddingHorizontal: 10,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                    }}>
                        <MaterialIcons name="event" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            2023
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                        paddingHorizontal: 10,
                    }}>
                        {/* <MaterialIcons name="location" size={20} color={Colors.gray} /> */}
                        <EvilIcons name="location" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            {item?.city}
                        </Text>
                    </View>
                </View>
            </View>

            {/* tab navigation */}
            <View style={{
                width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
                // borderWidth: 2,
                // borderColor: "red"
            }}>
                <View style={[
                    styles.myTabBtnStyle,
                    activeTab === "about_movie" && { borderColor: Colors.themeColorHigh },
                ]}>
                    <Text onPress={() => setActiveTab("about_movie")} style={{ color: Colors.dark, fontSize: 22, fontWeight: "600", paddingLeft: 5 }}>
                        {"About Movies"}
                    </Text>
                </View>

                <View style={[
                    styles.myTabBtnStyle,
                    activeTab === "reviews" && { borderColor: Colors.themeColorHigh },
                ]}>
                    <Text onPress={() => setActiveTab("reviews")} style={{ color: Colors.dark, fontSize: 22, fontWeight: "600", paddingLeft: 5 }}>
                        {"Reviews"}
                    </Text>
                </View>
            </View>

            {/* mid area */}
            <ScrollView
                showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
                style={[styles.productsContainer]}
            >
                {
                    activeTab === "about_movie" &&
                    <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text style={{ textAlign: "center", fontSize: 16 }}> {item?.description} </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                            <Entypo name="info" size={18} color={Colors.neutral} />
                            <Entypo name="info" size={18} color={Colors.success} />
                            <Entypo name="info" size={18} color={Colors.error} />
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 16 }}> {item?.general_info} </Text>
                    </View>
                }
                {
                    activeTab === "reviews" &&
                    ((item?.reviews.length > 0) ?
                        (item?.reviews).map(review => {
                            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                                <Text style={{ textAlign: "center", fontSize: 16 }}> {item?.description} </Text>
                            </View>
                        })
                        :
                        <EmptyListScreen />)

                }
            </ScrollView>


            {/* bottom button */}
            {/* {
                user?.role === "user" && */}
            <View style={{
                marginTop: "auto",
                marginBottom: 0,
                width: "100%",
                flexDirection: "row",
            }}>
                <View style={{ width: "100%" }}>
                    <CustomBtn
                        height={60}
                        width={"100%"}
                        radius={0}
                        textColor={Colors.light}
                        color1={Colors.themeColorHigh}
                        color2={Colors.themeColorLow}
                        text={"Buy Ticket"}
                        marginBottom={0}
                        func={toggleModal}
                    />
                </View>
            </View>
            {/* } */}
        </View >
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: "transparent"
    },
    modalContent: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 30,
        alignItems: 'center',
        height: "50%"
    },

    chip: {
        margin: 4,
    },
    container: {
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginVertical: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },




    loginContainer: {
        backgroundColor: Colors.light,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    picker: {
        borderColor: Colors.gray,
        borderWidth: 1,
        color: Colors.dark,
    },

    inputView: {
        width: "90%",
    },
    input: {
        width: "100%",
        height: 40,
        marginBottom: 20,
        padding: 10,
        borderBottomWidth: 3,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderRadius: 3,
    },
    inputFieldStyle: {
        // width: "100%",
        flex: 2,
        // height: 40,
        color: Colors.dark,
        borderColor: Colors.gray,
        backgroundColor: Colors.light,

        borderWidth: 1,
        borderRadius: 16,

        marginBottom: 20,
        paddingHorizontal: 30,
        paddingVertical: 15,

        fontSize: 18,
        // lineHeight: 30,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: Colors.light,
    },
    bodyContainer: {
        backgroundColor: "#E5E5E5",
        height: "100%",
    },

    productImage: {
        height: 60,
        width: 60,
        marginHorizontal: 20,
    },
    productsContainer: {
        flex: 1,
        flexGrow: 10,
        padding: 10,
        backgroundColor: Colors.light,
        // borderWidth: 2,
        // borderColor: "red"
    },
    productCard: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 7,
        marginBottom: 10,
    },
    productContent: {
        flex: 1,
        flexGrow: 3,
        padding: 10,
        borderLeftColor: "#E5E5E5",
        borderLeftWidth: 2,
    },

    yellowBtn: {
        padding: 10,
        width: "100%",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#F6EC33",
        backgroundColor: "#F6EC33",
    },

    myTabBtnStyle: {
        color: Colors.dark,
        fontSize: 30,
        // width: 120,
        fontWeight: 600,
        borderBottomWidth: 6,
        borderColor: Colors.light,
        marginHorizontal: 10,
    },
    myTabBtnArea: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light,
    },
});


export default EventDetail;