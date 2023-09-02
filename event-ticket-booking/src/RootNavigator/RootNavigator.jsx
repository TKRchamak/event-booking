import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import Login from '../Screens/Login/Login';
import LandingPage from '../Screens/LandingPage/LandingPage';
import Registration from '../Screens/Registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setUserData } from '../Redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import CustomBtn from '../Components/CustomBtn/CustomBtn';
import Colors from '../utils/Colors';
import SelectCity from '../Screens/SelectCity/SelectCity';
import axios from 'axios';
import Dashboard from '../Screens/SuperAdmin/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import OrganizerList from '../Screens/SuperAdmin/OrganizerList';
import AdminProfile from '../Screens/SuperAdmin/AdminProfile';

const RootNavigator = () => {
    const dispatch = useDispatch();
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);
    // console.log(user, token);




    const screenOptionStyle = {
        headerShown: false
    }

    // axios.defaults.headers.common = {
    //     // 'Authorization': `Bearer ${token}`
    //     'X-Auth-Token': `${token}`
    // };


    useEffect(() => {
        const asyncStorageData = async () => {
            let token = await AsyncStorage.getItem('userToken');
            if (jsonValue != null) {
                const headers = {
                    // 'Authorization': `Bearer ${token}`,
                    'X-Auth-Token': token
                };
                const data = JSON.parse(token);
                if (data.token) {
                    dispatch(setUserData(data));
                    const { data } = await axios.get(`${rootUrl}/api/v1/user/detail`, {
                        headers
                    });
                    if (data?.status === "success") {
                        dispatch(setUserData(data));
                    } else {
                        throw data;
                    }
                }
            } else null;
        }
        return () => { asyncStorageData() }
    }, [])




    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarHideOnKeyboard: false,
                    // tabBarShowLabel: false,
                    tabBarStyle: {
                        paddingBottom: 5,
                        height: 60,
                        backgroundColor: 'white', // Background color of the bottom navigation bar
                    },
                    activeTintColor: Colors.themeColorLow, // Color for the selected tab
                    inactiveTintColor: Colors.gray, // Color for inactive tabs
                    headerShown: false
                }}
            >


                <Tab.Screen
                    name="Home"
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Organizer List"
                    component={OrganizerList}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="profile" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={LandingPage}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="user" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
            {/* <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="select-city" component={SelectCity} />
            </Stack.Navigator> */}
            {/* {
                token === "" ?
                    <Stack.Navigator screenOptions={screenOptionStyle}>
                        <Stack.Screen name="landing" component={LandingPage} />
                        <Stack.Screen name="login" component={Login} />
                        <Stack.Screen name="registration" component={Registration} />
                    </Stack.Navigator>
                    :
                    (user?.role !== "organizer" && (user?.selected_city === "" || !user?.selected_city))
                        ?
                        <Stack.Navigator screenOptions={screenOptionStyle}>
                            <Stack.Screen name="select-city" component={SelectCity} />
                        </Stack.Navigator>
                        :
                        <>
                            {
                                user?.role === "admin"
                                    ?
                                    <Tab.Navigator
                                        screenOptions={{
                                            tabBarHideOnKeyboard: false,
                                            // tabBarShowLabel: false,
                                            tabBarStyle: {
                                                paddingBottom: 5,
                                                height: 60,
                                                backgroundColor: 'white', // Background color of the bottom navigation bar
                                            },
                                            activeTintColor: Colors.themeColorLow, // Color for the selected tab
                                            inactiveTintColor: Colors.gray, // Color for inactive tabs
                                            headerShown: false
                                        }}
                                    >


                                        <Tab.Screen
                                            name="Home"
                                            component={Dashboard}
                                            options={{
                                                tabBarIcon: ({ color, size }) => (
                                                    <AntDesign name="home" color={color} size={size} />
                                                ),
                                            }}
                                        />

                                        <Tab.Screen
                                            name="Organizer List"
                                            component={OrganizerList}
                                            options={{
                                                tabBarIcon: ({ color, size }) => (
                                                    <AntDesign name="profile" color={color} size={size} />
                                                ),
                                            }}
                                        />

                                        <Tab.Screen
                                            name="Settings"
                                            component={AdminProfile}
                                            options={{
                                                tabBarIcon: ({ color, size }) => (
                                                    <AntDesign name="user" color={color} size={size} />
                                                ),
                                            }}
                                        />
                                    </Tab.Navigator>
                                    :
                                    user?.role === "organizer"
                                        ?
                                        <View style={{ flex: 1, width: "100%", justifyContent: "center", }}>
                                            <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>I am Organizer</Text>
                                            <CustomBtn
                                                height={60}
                                                width={500}
                                                textColor={Colors.light}
                                                text={"Log Out"}
                                                marginBottom={80}
                                                func={async () => {
                                                    await AsyncStorage.removeItem("userData");
                                                    await AsyncStorage.removeItem("userToken");
                                                    dispatch(clearUserData());
                                                }}
                                            />
                                        </View>
                                        :
                                        <View style={{ flex: 1, width: "100%", justifyContent: "center", }}>
                                            <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>I am User</Text>
                                            <CustomBtn
                                                height={60}
                                                width={500}
                                                textColor={Colors.light}
                                                text={"Log Out"}
                                                marginBottom={80}
                                                func={async () => {
                                                    await AsyncStorage.removeItem("userData");
                                                    await AsyncStorage.removeItem("userToken");
                                                    dispatch(clearUserData());
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