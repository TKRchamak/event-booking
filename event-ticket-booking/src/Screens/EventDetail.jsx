import React, { useCallback, useEffect, useState } from "react";
import {
    Text,
    TextInput,
    Image,
    View,
    StyleSheet,
    ScrollView,
    Pressable,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StatusBar
    // Modal,
} from "react-native";
import Modal from 'react-native-modal';
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Button, Dialog, Portal } from "react-native-paper";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Chip } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import CustomBtn from "../Components/CustomBtn/CustomBtn";
import FontUtils from "../utils/FontUtils";
import { multipleImage, singleImage } from "../Services/PickImage";
import rootUrl from "../Services/rootUrl";
import { setOrganizerEventList } from "../Redux/eventSlice";

const EventDetail = ({ navigation, route }) => {
    const item = route.params || 'No data received';
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);
    const [isModalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState([false, ""]);
    const [activeTab, setActiveTab] = useState("about_movie");

    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
                isVisible={isModalVisible}
                animationIn="slideInUp" // Use slideInUp for bottom to top animation
                animationOut="slideOutDown" // Use slideOutDown for closing animation
                backdropOpacity={0.5}
                onBackdropPress={toggleModal}
                animationInTiming={1000}
                animationOutTiming={1000}
                style={styles.modal}
                avoidKeyboard={false}
                onBackButtonPress={() => toggleModal()}
            >
                <View style={styles.modalContent}>


                    <View style={{ width: "100%" }}>
                        <CustomBtn
                            height={60}
                            marginBottom={10}
                            textColor={Colors.light}
                            text={"Close Modal"}
                            func={() => {

                            }}
                        />
                    </View>
                </View>
            </Modal>

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

                <View style={[
                    styles.myTabBtnStyle,
                    activeTab === "seats" && { borderColor: Colors.themeColorHigh },
                ]}>
                    <Text onPress={() => setActiveTab("seats")} style={{ color: Colors.dark, fontSize: 22, fontWeight: "600", paddingLeft: 5 }}>
                        {"Seats"}
                    </Text>
                </View>
            </View>
            {/* 
            <View style={[styles.myTabBtnArea]}>
                <View
                    style={[
                        styles.myTabBtnStyle,
                        activeTab !== "about_organize" && { borderColor: "#ffffff" },
                    ]}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                        onPress={() => setActiveTab("about_organize")}
                    >
                        About Organize
                    </Text>
                </View>

                {item?.status !== "pending" && (
                    <View
                        style={[
                            styles.myTabBtnStyle,
                            activeTab === "about_organize" && { borderColor: "#ffffff" },
                        ]}
                    >
                        <Text
                            onPress={() => setActiveTab("event_list")}
                            style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}
                        >
                            Event List
                        </Text>
                    </View>
                )}
            </View> */}

            {/* mid area */}
            <ScrollView style={[styles.productsContainer]}>

            </ScrollView>


            {/* bottom button */}
            {
                user?.role === "user" &&
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
                        // func={() => adminApprovalDecision("active")}
                        />
                    </View>
                </View>
            }
        </View>
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
        padding: 30,
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
        borderColor: "gray",
        borderWidth: 1,
        color: Colors.gray,
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