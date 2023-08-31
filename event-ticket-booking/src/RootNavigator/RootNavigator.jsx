import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Login from '../Screens/Login/Login';
import LandingPage from '../Screens/LandingPage/LandingPage';
import Registration from '../Screens/Registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import CustomBtn from '../Components/CustomBtn/CustomBtn';
import Colors from '../utils/Colors';
import SelectCity from '../Screens/SelectCity/SelectCity';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);
    console.log(user, token);
    const dispatch = useDispatch();

    const screenOptionStyle = {
        headerShown: false
    }


    useEffect(() => {
        const asyncStorageData = async () => {
            let jsonValue = await AsyncStorage.getItem('userData');
            if (jsonValue != null) {
                const data = JSON.parse(jsonValue);
                if (data.token) {
                    dispatch(setUserData(data));
                }
            } else null;
        }
        return () => { asyncStorageData() }
    }, [])

    return (
        <>
            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="select-city" component={SelectCity} />
            </Stack.Navigator>
            {/* {
                token === "" ?
                    <Stack.Navigator screenOptions={screenOptionStyle}>
                        <Stack.Screen name="landing" component={LandingPage} />
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="registration" component={Registration} />
                    </Stack.Navigator>
                    :
                    (user?.selected_city === "")
                        ?
                        <Stack.Navigator screenOptions={screenOptionStyle}>
                            <Stack.Screen name="select-city" component={SelectCity} />
                        </Stack.Navigator>
                        :
                        <>
                            {
                                user?.role === "admin"
                                    ?
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text>this is admin</Text>
                                        <CustomBtn
                                            height={60}
                                            width={"100%"}
                                            textColor={Colors.light}
                                            text={"Log Out"}
                                            marginBottom={80}
                                            func={async () => {
                                                await AsyncStorage.removeItem("userData");
                                                dispatch(setUserData({ data: {}, token: "" }));
                                            }}
                                        />
                                    </View>
                                    :
                                    user?.role === "organizer"
                                        ?
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text>this is organizer</Text>
                                            <CustomBtn
                                                height={60}
                                                width={"100%"}
                                                textColor={Colors.light}
                                                text={"Log Out"}
                                                marginBottom={80}
                                                func={async () => {
                                                    await AsyncStorage.removeItem("userData");
                                                    dispatch(setUserData({ data: {}, token: "" }));
                                                }}
                                            />
                                        </View>
                                        :
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text>this is consumer</Text>
                                            <CustomBtn
                                                height={60}
                                                width={"100%"}
                                                textColor={Colors.light}
                                                text={"Log Out"}
                                                marginBottom={80}
                                                func={async () => {
                                                    await AsyncStorage.removeItem("userData");
                                                    dispatch(setUserData({ data: {}, token: "" }));
                                                }}
                                            />
                                        </View>
                            }
                        </>
            } */}

        </>
    );
};

export default RootNavigator;