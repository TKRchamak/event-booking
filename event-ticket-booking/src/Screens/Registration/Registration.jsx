import React, { useState } from 'react';
import Colors from '../../utils/Colors';
import { Text, TextInput, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Checkbox from 'expo-checkbox';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import FontUtils from '../../utils/FontUtils';

const Registration = (props) => {
    const { navigation } = props;
    // const dispatch = useDispatch();
    const [inputLoginUser, setInputLoginUser] = useState({});
    const [isChecked, setChecked] = useState(false);
    // useEffect(() => {
    //     const checkUser = async () => {
    //         const data = await AsyncStorage.getItem("rcl_user_data");
    //         const userData = JSON.parse(data);
    //         if (userData) {
    //             dispatch(setUserData(userData));
    //         }
    //     }
    //     checkUser();
    // }, [])

    const handleInputChange = (text, label) => {
        const newData = { ...inputLoginUser };
        newData[label] = text;
        setInputLoginUser(newData);
    };

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation} name={"Continue With Your Email"} func={() => { navigation.goBack() }} />
            <ScrollView style={{ flex: 1, backgroundColor: Colors.light }}>
                <View style={styles.loginContainer}>
                    <Text style={{ color: Colors.themeColorHigh, fontSize: FontUtils.cfs.header3, alignSelf: "flex-start", paddingHorizontal: 20, paddingTop: 15, }}>Create Account</Text>
                    <Text style={{ color: Colors.themeColorHigh, fontSize: FontUtils.cfs.normal, alignSelf: "flex-start", paddingHorizontal: 20, paddingTop: 5, paddingBottom: 20 }}>Register now and start exploring all that our app has to
                        offer. We’re excited to welcome you to our community!</Text>
                    <View style={styles.inputView}>
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
                            onChangeText={(text) => handleInputChange(text, "password")}
                            placeholder="Password"
                            secureTextEntry={true}
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
                            onChangeText={(text) => handleInputChange(text, "password")}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={Colors.gray}
                        />

                        <TextInput
                            style={styles.inputFieldStyle}
                            onChangeText={(text) => handleInputChange(text, "password")}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor={Colors.gray}
                        />

                        <CustomBtn
                            height={60}
                            marginBottom={10}
                            textColor={Colors.light}
                            text={"Create Account"}
                        // func={() => loginFunc()}
                        />
                        {/* height, text, color, iconName, func, textColor */}
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20, paddingBottom: 60 }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, color: Colors.gray, textAlign: "center" }}>
                                By logging. your agree to our <Text style={{ color: Colors.dark, marginLeft: 30 }}>Terms & Conditions</Text> and
                            </Text>
                            <Text style={{ color: Colors.dark, marginLeft: 30 }}>Privacy Policy.</Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ marginLeft: 10, fontSize: 18, color: Colors.gray }}>
                                Already have an account?
                                <Text style={{ color: Colors.themeColorHigh, marginLeft: 30 }}>Sign in</Text>
                            </Text>
                        </View>


                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECEBE8',
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

    myLogo: {
        marginTop: 160,
        marginBottom: 100,
        color: Colors.themeColorHigh,
        // fontWeight: FontUtils.cfw.bigger,
        fontSize: FontUtils.cfs.logoSize,
        fontFamily: "BlackOpsOne-Regular",
    },
    tinyLogo: {
        width: 131,
        height: 131,
        marginBottom: 30,
        marginTop: 80,
    },
    brandName: {
        color: Colors.dark,
        fontWeight: "900",
        fontSize: 60,
        marginVertical: 120,
        textAlign: "center",
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