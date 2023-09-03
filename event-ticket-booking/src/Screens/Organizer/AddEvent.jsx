import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../utils/Colors";
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
import CustomBtn from "../../Components/CustomBtn/CustomBtn";
import FontUtils from "../../utils/FontUtils";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { Button, Dialog, Portal } from "react-native-paper";

import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { multipleImage, singleImage } from "../../Services/PickImage";
import rootUrl from "../../Services/rootUrl";
import { setUserData } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Chip } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { EvilIcons } from '@expo/vector-icons';
import { setOrganizerEventList } from "../../Redux/eventSlice";

const AddEvent = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);
    const eventLocation = useSelector((state) => state.organizer.currentCreationEventLocation);
    const [inputRegUser, setInputRegUser] = useState({});
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [photo, setPhoto] = useState(null);
    const [poster, setPoster] = useState(null);
    const [regLoading, setRegLoading] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [eventTypeList, setEventTypeList] = useState([]);

    const [visible, setVisible] = useState([false, ""]);
    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);

    const pickImage = async () => {
        setPhoto("loading");
        let imgUrl = await singleImage();
        // let imgUrl = await multipleImage();
        if (imgUrl === "image not selected") {
            setPhoto(null);
            return;
        }
        setPhoto(imgUrl);
    };

    const pickPoster = async () => {
        setPoster("loading");
        let imgUrl = await singleImage([6, 4]);
        // let imgUrl = await multipleImage();
        if (imgUrl === "image not selected") {
            setPoster(null);
            return;
        }
        setPoster(imgUrl);
    };

    const handleInputChange = (text, label) => {
        const newData = { ...inputRegUser };
        newData[label] = text;
        setInputRegUser(newData);
    };

    const getCityList = async () => {
        try {
            const { data } = await axios.get(`${rootUrl}/api/v1/city/`);
            if (data.status === 'success') {
                setCityList(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getEventTypeList = async () => {
        try {
            const { data } = await axios.get(`${rootUrl}/api/v1/event_type/`);
            if (data.status === 'success') {
                setEventTypeList(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCityList();
        getEventTypeList();
    }, [])


    const [timeSlots, setTimeSlots] = useState([]);
    const handleAddTimeSlot = (start, end) => {
        const id = uuid.v4();
        const newTimeSlot = {
            id: `${id}`, // You should use a more reliable way to generate IDs
            from: start,
            to: end,
        };
        setTimeSlots([...timeSlots, newTimeSlot]);
    };
    const removeTimeSlot = (props) => {
        let newData = timeSlots.filter(item => item.id !== props.id);
        setTimeSlots(newData);
    }


    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const handleFromTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setFromTime(selectedTime);
            setShowFromPicker(false);
        }
    };
    const handleToTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setToTime(selectedTime);
            setShowToPicker(false);
        }
    };

    const getThisOrganizerEvents = async () => {
        const headers = {
            'X-Auth-Token': token
        };
        try {
            const { data } = await axios.get(
                `${rootUrl}/api/v1/event/organizer-eventList`,
                {
                    headers
                }
            );
            if (data.status === "success") {
                dispatch(setOrganizerEventList(data.data));
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error);
            // showDialog("Something Wrong");
        }
    }

    const createAnEvent = async (d) => {
        const headers = {
            'X-Auth-Token': token
        };
        const requestData = {
            ...inputRegUser,
            location: eventLocation,
            timeSlot: timeSlots,
            city: selectedCity,
            type: selectedType,
            organizer: user._id,
            image: photo,
            poster: poster,
        };

        console.log(requestData);

        try {
            const { data } = await axios.post(
                `${rootUrl}/api/v1/event/create`, requestData,
                {
                    headers
                }
            );
            if (data.status === "success") {
                showDialog("This Event Created Successfully");
                getThisOrganizerEvents();
                navigation.navigate("Home");
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error);
            showDialog("Something Wrong");
        }
    }

    return (
        <ScrollView style={styles.headerContainer}>
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
                    {showFromPicker && (
                        <DateTimePicker
                            value={fromTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleFromTimeChange}
                        />
                    )}
                    {showToPicker && (
                        <DateTimePicker
                            value={toTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleToTimeChange}
                        />
                    )}


                    <TouchableOpacity style={{ width: "100%", marginBottom: 20 }} onPress={() => setShowFromPicker(true)}>
                        <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Event Start From: </Text>
                        <View style={{ height: 50, width: "100%", borderRadius: 16, borderColor: Colors.gray, borderWidth: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>{fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: "100%", marginBottom: 20 }} onPress={() => setShowToPicker(true)}>
                        <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>Event End At:</Text>
                        <View style={{ height: 50, width: "100%", borderRadius: 16, borderColor: Colors.gray, borderWidth: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 600 }}>{toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: "100%" }}>
                        <CustomBtn
                            height={60}
                            marginBottom={10}
                            textColor={Colors.light}
                            text={"Close Modal"}
                            func={() => {
                                handleAddTimeSlot(fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                                toggleModal()
                            }}
                        />
                    </View>
                </View>
            </Modal>

            <View style={{ width: "100%", height: 200 }}>
                {/* ===================== poster area start ===================== */}
                {poster === null ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Avatar.Icon
                            size={90}
                            icon="camera"
                            color={Colors.themeColorHigh}
                            style={{ backgroundColor: Colors.light }}
                        />
                        <Text>Event Poster</Text>
                    </View>
                ) : poster === "loading" ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" animating={true} color={Colors.themeColorHigh} />
                    </View>
                ) : (
                    <Image
                        source={{ uri: poster }}
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
                <TouchableOpacity
                    onPress={() => pickPoster()}
                    style={{
                        width: 35,
                        height: 40,
                        right: 20,
                        bottom: 20,
                        position: "absolute",
                        borderWidth: 1,
                        borderColor: Colors.light,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                    }}
                >
                    <AntDesign name="edit" size={24} color={Colors.light} />
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
                    {photo === null ? (
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
                    ) : photo === "loading" ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ActivityIndicator animating={true} color={Colors.themeColorHigh} />
                        </View>
                    ) : (
                        <Image
                            source={{ uri: photo }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    )}
                    <TouchableOpacity
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
                    </TouchableOpacity>
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
                    {/* <Text style={{ fontSize: 24, fontWeight: 600 }}>{item?.organization_name}</Text> */}
                </View>
            </View>

            {/* must need this space for logo image bottom portion */}
            <View
                style={{
                    // flex: 1,
                    width: "100%",
                    // height: 120,
                    height: 60,
                    justifyContent: "flex-end",
                    // borderWidth: 2,
                    // borderColor: "red"
                }}
            >
                <View
                    style={{
                        // flex: 1,
                        width: "100%",
                        height: 50,
                        // borderWidth: 2,
                        // borderColor: "red"
                    }}
                />
            </View>

            {/* <SelectTimeSlot /> */}

            {/* mid area */}
            <View style={[styles.productsContainer]}>
                <View style={styles.loginContainer}>
                    <Text
                        style={{
                            color: Colors.themeColorHigh,
                            fontSize: FontUtils.cfs.header3,
                            alignSelf: "flex-start",
                            paddingHorizontal: 20,
                            paddingBottom: 10,
                        }}
                    >
                        Create Event
                    </Text>
                    {/* <Text
                        style={{
                            color: Colors.gray,
                            fontSize: FontUtils.cfs.normal,
                            alignSelf: "flex-start",
                            paddingHorizontal: 20,
                            paddingTop: 5,
                            paddingBottom: 20,
                        }}
                    >
                        Register now and start exploring all that our app has to offer.
                        We’re excited to welcome you to our community!
                    </Text> */}

                    <View style={styles.inputView}>

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "name")}
                            placeholder="Event Name"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "title")}
                            placeholder="Event Title"
                            placeholderTextColor={Colors.gray}
                        />

                        {/* city */}
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}>
                            <View
                                style={[
                                    styles.inputFieldStyle,
                                    { paddingHorizontal: 12, paddingVertical: 2 },
                                ]}
                            >
                                <Picker
                                    placeholderTextColor={Colors.gray}
                                    style={[styles.picker, { fontSize: 18 }]}
                                    selectedValue={selectedCity}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedCity(itemValue);
                                    }}
                                >
                                    <Picker.Item label={"Event City"} value={""} />
                                    {
                                        cityList.map(city => <Picker.Item key={city._id} label={city.name} value={city.name} />)
                                    }
                                </Picker>
                            </View>
                        </View>

                        {/* type */}
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}>
                            <View
                                style={[
                                    styles.inputFieldStyle,
                                    { paddingHorizontal: 12, paddingVertical: 2 },
                                ]}
                            >
                                <Picker
                                    placeholderTextColor={Colors.gray}
                                    style={[styles.picker, { fontSize: 18 }]}
                                    selectedValue={selectedType}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedType(itemValue);
                                    }}
                                >
                                    <Picker.Item label={"Event Type"} value={""} />
                                    {
                                        eventTypeList.map(event => <Picker.Item key={event._id} label={event.name} value={event.name} />)
                                    }
                                </Picker>
                            </View>
                        </View>

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "duration")}
                            placeholder="Event Time Duration in(minute)"
                            keyboardType="numeric"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "seat_quantity")}
                            placeholder="Total Ticket Quantity"
                            keyboardType="numeric"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            editable
                            multiline
                            numberOfLines={6}
                            // maxLength={40}
                            style={[styles.inputFieldStyle, { paddingVertical: 0 }]}
                            onChangeText={(text) =>
                                handleInputChange(text, "description")
                            }
                            placeholder="Event Description"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            editable
                            multiline
                            numberOfLines={6}
                            // maxLength={40}
                            style={[styles.inputFieldStyle, { paddingVertical: 0 }]}
                            onChangeText={(text) =>
                                handleInputChange(text, "general_info")
                            }
                            placeholder="Event Extra Information"
                            placeholderTextColor={Colors.gray}
                        />

                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            width: "100%",
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: Colors.gray,
                            marginBottom: 10
                        }}>
                            {timeSlots.map((item) => (
                                <Chip key={item.id} style={styles.chip} onPress={() => removeTimeSlot(item)}>
                                    {`${item.from} - ${item.to}`} <AntDesign name="closecircleo" size={16} color="black" />
                                </Chip>
                            ))}

                            <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Add Time Slot</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("pick-location")}
                            style={{
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: "space-between",
                                height: 50,
                                padding: 10,
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: Colors.gray,
                                marginTop: 10,
                                marginBottom: 20,
                            }}>
                            <Text style={{ fontSize: 20, color: Colors.gray }}>Location</Text>
                            <EvilIcons name="location" size={24} color={Colors.gray} />
                        </TouchableOpacity>

                        <CustomBtn
                            height={60}
                            marginBottom={10}
                            textColor={Colors.light}
                            text={
                                regLoading ? (
                                    <ActivityIndicator
                                        size={"large"}
                                        animating={true}
                                        color={Colors.themeColorHigh}
                                    />
                                ) : (
                                    "Create Event"
                                )
                            }
                            // disabled={true}
                            func={() => createAnEvent()}
                        />
                        {/* height, text, color, iconName, func, textColor */}
                    </View>
                </View>
            </View>
        </ScrollView>
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
        marginBottom: 20,
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
        borderColor: Colors.themeColorHigh,
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

export default AddEvent;
