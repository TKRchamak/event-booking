import React, { useCallback, useState } from 'react';
import Colors from '../../utils/Colors';
import { Text, TextInput, Image, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Checkbox from 'expo-checkbox';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import FontUtils from '../../utils/FontUtils';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { Button, Dialog, Portal } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { multipleImage, singleImage } from '../../Services/PickImage';
import rootUrl from '../../Services/rootUrl';
import { setUserData } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';



const AddEvent = ({ navigation }) => {
    const dispatch = useDispatch();
    const [inputRegUser, setInputRegUser] = useState({});
    const [selectedValue, setSelectedValue] = useState("");
    const [photo, setPhoto] = useState(null);
    const [regLoading, setRegLoading] = useState(false);




    const [visible, setVisible] = useState([false, ""]);
    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);



    const pickImage = async () => {
        setPhoto("loading")
        let imgUrl = await singleImage();
        // let imgUrl = await multipleImage();
        if (imgUrl === "image not selected") {
            setPhoto(null);
            return;
        }
        setPhoto(imgUrl);
    };

    const handleInputChange = (text, label) => {
        const newData = { ...inputRegUser };
        newData[label] = text;
        setInputRegUser(newData);
    };


    return (
        <View style={styles.headerContainer}>
            <Portal>
                <Dialog visible={visible[0]} onDismiss={hideDialog} style={{ color: Colors.error }}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{visible[1]}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View style={{
                // flex: 1,
                width: '100%',
                height: 200,
                // borderWidth: 2,
                // borderColor: "blue",
                // position: 'relative',
            }}>
                {

                    (photo === null)
                        ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                            <Text>Event Logo</Text>
                        </View>
                        : (photo === "loading") ? <ActivityIndicator animating={true} color={Colors.themeColorHigh} />
                            : <Image source={{ uri: photo }} style={{ height: "100%", width: "100%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                }

                {/* <View style={{
                    flex: 1,
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20
                }}>
                    <TouchableOpacity
                        onPress={() => pickImage()}
                        style={{
                            height: 200,
                            width: 150,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderRadius: 20,
                            fontSize: 18,
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                        }}>
                        {
                            (photo === null)
                                ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                    {
                                        selectedValue === "organizer" ?
                                            <Text>Organization Logo</Text>
                                            : <Text>User Logo</Text>
                                    }
                                </View>
                                : (photo === "loading") ? <ActivityIndicator animating={true} color={Colors.themeColorHigh} />
                                    : <Image source={{ uri: photo }} style={{ width: "100%", height: "100%" }} />
                        }
                    </TouchableOpacity>
                </View> */}

                <LinearGradient
                    useAngle
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={["transparent", Colors.dark]}
                    style={{
                        // flex: 1,
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        position: 'absolute',
                    }} />

                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        width: 35,
                        height: 40,
                        right: 20,
                        top: 20,
                        position: 'absolute',
                        borderWidth: 1,
                        borderColor: Colors.light,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5
                    }}>
                    <AntDesign name="edit" size={24} color={Colors.light} />
                </TouchableOpacity>

                <View style={{
                    // flex: 1,
                    width: 100,
                    height: 120,
                    left: 40,
                    top: 130,
                    position: 'absolute',
                    borderRadius: 15,
                    overflow: "hidden",
                    backgroundColor: Colors.light,
                    borderWidth: 1,
                    borderColor: "red"
                }}>
                    {/* {
                        (!item?.organization_logo)
                            ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                            </View>
                            : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                    } */}

                    {
                        (photo === null)
                            ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Avatar.Icon size={40} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                <Text>Event Logo</Text>
                            </View>
                            : (photo === "loading") ? <ActivityIndicator animating={true} color={Colors.themeColorHigh} />
                                : <Image source={{ uri: photo }} style={{ width: "100%", height: "100%" }} />
                    }
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{
                            width: 30,
                            height: 30,
                            right: 5,
                            top: 5,
                            position: 'absolute',
                            borderWidth: 1,
                            borderColor: Colors.light,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            backgroundColor: "#00000030"
                        }}>
                        <AntDesign name="edit" size={20} color={Colors.dark} />
                    </TouchableOpacity>
                </View>

                <View style={{
                    height: 40,
                    left: 160,
                    top: 210,
                    position: 'absolute',
                    // borderWidth: 2,
                    // borderColor: "red"
                }}>
                    {/* <Text style={{ fontSize: 24, fontWeight: 600 }}>{item?.organization_name}</Text> */}
                </View>
            </View>

            <View style={{
                // flex: 1,
                width: '100%',
                // height: 120,
                height: 60,
                justifyContent: 'flex-end',
                // borderWidth: 2,
                // borderColor: "red"
            }}>
                <View style={{
                    // flex: 1,
                    width: '100%',
                    height: 50,
                    // borderWidth: 2,
                    // borderColor: "red"
                }} />
            </View>

            <View style={[styles.myTabBtnArea]}>
                {/* <View
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
                </View> */}

                {/* {item?.status !== "pending" && (
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
                )} */}
            </View>

            {/* mid area */}
            <ScrollView style={[styles.productsContainer]}>
                {/* <ScrollView style={{ flex: 1, backgroundColor: Colors.light }}> */}
                <View style={styles.loginContainer}>
                    <Text style={{ color: Colors.themeColorHigh, fontSize: FontUtils.cfs.header3, alignSelf: "flex-start", paddingHorizontal: 20, paddingTop: 15, }}>Create Account</Text>
                    <Text style={{ color: Colors.gray, fontSize: FontUtils.cfs.normal, alignSelf: "flex-start", paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20 }}>
                        Register now and start exploring all that our app has to offer. We’re excited to welcome you to our community!
                    </Text>

                    <View style={styles.inputView}>

                        <View style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}>
                            <View style={[styles.inputFieldStyle, { paddingHorizontal: 12, paddingVertical: 2 }]}>
                                <Picker
                                    placeholderTextColor={Colors.gray}
                                    style={[styles.picker, { fontSize: 18 }]}
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setPhoto(null);
                                        setSelectedValue(itemValue);
                                        setInputRegUser({});
                                    }
                                    }>
                                    <Picker.Item label={"Register as a"} value={""} />
                                    <Picker.Item label={"User"} value={"user"} />
                                    <Picker.Item label={"Organizer"} value={"organizer"} />
                                </Picker>
                            </View>
                        </View>

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "username")}
                            placeholder="Username"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "name")}
                            placeholder="Full Name"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "email")}
                            placeholder="Email"
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "password")}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "confirm_Password")}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor={Colors.gray}
                        />


                        {
                            selectedValue === "organizer" &&
                            <>
                                <TextInput
                                    style={styles.inputFieldStyle}
                                    onChangeText={(text) => handleInputChange(text, "organization_name")}
                                    placeholder="Organizer Name"
                                    placeholderTextColor={Colors.gray}
                                />
                                <TextInput
                                    style={styles.inputFieldStyle}
                                    onChangeText={(text) => handleInputChange(text, "organization_title")}
                                    placeholder="Organization Title"
                                    placeholderTextColor={Colors.gray}
                                />
                                <TextInput
                                    editable
                                    multiline
                                    numberOfLines={6}
                                    // maxLength={40}
                                    style={[styles.inputFieldStyle, { paddingVertical: 0 }]}
                                    onChangeText={(text) => handleInputChange(text, "description")}
                                    placeholder="Description"
                                    placeholderTextColor={Colors.gray}
                                />
                            </>
                        }

                        <CustomBtn
                            height={60}
                            marginBottom={10}
                            textColor={Colors.light}
                            text={regLoading ? <ActivityIndicator animating={true} color={Colors.themeColorHigh} /> : "Create Account"}
                            // disabled={true}
                            func={() => registrationUser()}
                        />
                        {/* height, text, color, iconName, func, textColor */}
                    </View>
                </View>
                {/* </ScrollView > */}
            </ScrollView>

            {/* bottom button */}
            {/* {
                <View
                    style={{
                        marginTop: "auto",
                        marginBottom: 0,
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    <View style={{ width: "100%" }}>
                        <CustomBtn
                            height={60}
                            width={"100%"}
                            radius={0}
                            textColor={Colors.light}
                            color1={Colors.error}
                            color2={Colors.error}
                            text={"Reject"}
                            marginBottom={0}
                            func={() => adminApprovalDecision("reject")}
                        />
                    </View>

                </View>
            } */}
        </View >
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        backgroundColor: Colors.light,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    picker: {
        borderColor: 'gray',
        borderWidth: 1,
        color: Colors.gray
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
        marginBottom: 20
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