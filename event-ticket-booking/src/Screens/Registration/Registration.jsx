import React, { useCallback, useState } from 'react';
import Colors from '../../utils/Colors';
import { Text, TextInput, Image, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Checkbox from 'expo-checkbox';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import FontUtils from '../../utils/FontUtils';
import { Picker } from '@react-native-picker/picker';

import { Avatar } from 'react-native-paper';
import { Button, Dialog, Portal } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { multipleImage, singleImage } from '../../Services/PickImage';
import rootUrl from '../../Services/rootUrl';
import { setUserData } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Registration = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [inputRegUser, setInputRegUser] = useState({});
    const [selectedValue, setSelectedValue] = useState("");
    const [photo, setPhoto] = useState(null);
    const [regLoading, setRegLoading] = useState(false);



    const [visible, setVisible] = useState([false, ""]);
    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);


    // const getProfilePic = async () => {
    //     const cameraPhoto = await AsyncStorage.getItem("userIdPicUri");
    //     const photoData = {
    //         uri: cameraPhoto,
    //         type: 'image/jpeg',
    //         name: `photo.jpg`,
    //     }
    //     setPhoto(photoData)
    // }

    // useFocusEffect(
    //     useCallback(() => {
    //         getProfilePic()
    //     }, [])
    // );


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

    const registrationUser = async () => {
        setRegLoading(true);
        try {
            if (selectedValue === "" || photo === null || !inputRegUser?.name || !inputRegUser?.email || !inputRegUser?.password || !inputRegUser?.confirm_Password) {
                showDialog("All Fields Required");
                return;
            }
            if (selectedValue === "organizer") {
                if (!inputRegUser?.organization_name || !inputRegUser?.description) {
                    showDialog("All Fields Required");
                    return;
                }
                const { data } = await axios.post(`${rootUrl}/api/v1/organizer/register`, {
                    ...inputRegUser, organization_logo: photo
                });
                if (data.token) {
                    dispatch(setUserData(data));
                } else {
                    throw data;
                }
            } else {
                const { data } = await axios.post(`${rootUrl}/api/v1/user/register-user`, {
                    ...inputRegUser, profile_pic_url: photo
                });

                if (data.token) {
                    dispatch(setUserData(data));
                } else {
                    throw data;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRegLoading(false);
        }

    }

    return (
        <View style={styles.container}>
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

            <HeaderBar navigation={navigation} name={"Continue With Your Email"} func={() => { navigation.goBack() }} />

            <ScrollView style={{ flex: 1, backgroundColor: Colors.light }}>
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

                        <View style={{
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

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 60 }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, color: Colors.gray, textAlign: "center" }}>
                                By logging. your agree to our <Text style={{ color: Colors.dark, marginLeft: 30 }}>Terms & Conditions</Text> and
                            </Text>
                            <Text style={{ color: Colors.dark, marginLeft: 30 }}>Privacy Policy.</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                            <Text style={{ marginLeft: 10, fontSize: 18, color: Colors.gray }}>
                                Already have an account?
                                <Text style={{ color: Colors.themeColorHigh, marginLeft: 30 }} onPress={() => navigation.replace("login")}>Sign in</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView >

        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        width: '100%',
        height: '100%',
    },
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
    }
});

export default Registration;