import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { setAllActiveOrganizerList, setAllRequestOrganizerList } from '../../Redux/organizerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAllEventList } from '../../Redux/eventSlice';
import axios from 'axios';
import rootUrl from '../../Services/rootUrl';
import { setUserData } from '../../Redux/userSlice';
import { Avatar } from 'react-native-paper';
import FontUtils from '../../utils/FontUtils';

const Dashboard = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const screenHeight = Dimensions.get('window').height;
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);
    const activeOrganizerList = useSelector((state) => state.organizer.allActiveOrganizerList);
    const requestOrganizerList = useSelector((state) => state.organizer.allRequestOrganizerList);
    const eventList = useSelector((state) => state.event.allEventList);

    // const loginFunc = async () => {
    //     const { data } = await axios.post(
    //         `${rootUrl}/api/v1/user/login`,
    //         {
    //             email: "admin@admin.com",
    //             password: "admin"
    //         }
    //     );
    //     if (data.token) {
    //         dispatch(setUserData(data));
    //     } else {
    //         throw data;
    //     }
    // }

    const getOrganizerList = async () => {
        const headers = {
            'X-Auth-Token': token
        };
        const { data } = await axios.get(`${rootUrl}/api/v1/organizer/all`,
            {
                headers
            }
        );
        if (data?.status === "success") {
            const activeList = [];
            const requestList = [];
            (data?.data)?.map(item => {
                if (item.status === "pending") {
                    requestList.push(item);
                }
                if (item.status === "active") {
                    activeList.push(item);
                }
            });
            dispatch(setAllActiveOrganizerList(activeList));
            dispatch(setAllRequestOrganizerList(requestList));
        } else {
            throw data;
        }
    }

    const getEventList = async () => {
        const headers = {
            // 'Authorization': `Bearer ${token}`,
            'X-Auth-Token': token
        };
        const { data } = await axios.get(`${rootUrl}/api/v1/event/`,
            {
                headers
            }
        );
        if (data?.status === "success") {
            dispatch(setAllEventList(data.data));
        } else {
            throw data;
        }
    }


    useEffect(() => {
        if (token) {
            getOrganizerList();
            getEventList();
        }
        // else loginFunc();
    }, [token])



    return (
        <View style={styles.container}>
            <View style={styles.firstIn}>
                <HeaderBar
                    backButton={true}
                    navigation={navigation}
                    name={""}
                // func={() => {
                //     navigation.goBack();
                // }}
                />
            </View>

            <View style={[styles.secondIn, { height: screenHeight - 150, }]}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
                    <View
                        style={{
                            height: 200,
                            width: 150,
                            borderColor: Colors.gray,
                            borderWidth: 1,
                            borderRadius: 20,
                            fontSize: 18,
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            marginBottom: 20
                        }}
                    >
                        {
                            (user?.profile_pic_url === "" || !user?.profile_pic_url)
                                ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                    <Text>Admin Image</Text>
                                </View>
                                : (photo === "loading") ? <ActivityIndicator animating={true} color={Colors.themeColorHigh} />
                                    : <Image source={{ uri: profile_pic_url }} style={{ width: "100%", height: "100%" }} />
                        }
                    </View>

                    <View style={{}}>
                        <Text style={{ color: Colors.dark, fontSize: 30, fontWeight: FontUtils.cfw.mid }}>{user?.username}</Text>
                        <Text>Every Thing is Good</Text>
                    </View>
                </View>

                <View style={[styles.quantityViewCard, { backgroundColor: Colors.neutral }]}>
                    <Text style={{ color: Colors.light, fontSize: 18, fontWeight: FontUtils.cfw.mid }}>  Active Organizer :  </Text>
                    <Text style={{ color: Colors.light, fontSize: 30, fontWeight: FontUtils.cfw.mid }}>{activeOrganizerList.length}</Text>
                </View >

                <View style={[styles.quantityViewCard, { backgroundColor: Colors.success }]}>
                    <Text style={{ color: Colors.light, fontSize: 18, fontWeight: FontUtils.cfw.mid }}> Requested Organizer :  </Text>
                    <Text style={{ color: Colors.light, fontSize: 30, fontWeight: FontUtils.cfw.mid }}> {requestOrganizerList.length}</Text>
                </View>

                <View style={[styles.quantityViewCard, { backgroundColor: Colors.error }]}>
                    <Text style={{ color: Colors.light, fontSize: 18, fontWeight: FontUtils.cfw.mid }}> Total Running Events :  </Text>
                    <Text style={{ color: Colors.light, fontSize: 30, fontWeight: FontUtils.cfw.mid }}> {eventList.length}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    firstIn: {
        height: 60,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    secondIn: {
        width: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
        padding: 20
    },
    quantityViewCard: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: 'row',
        height: 80,
        borderRadius: 18,
        marginVertical: 5
    }
});

export default Dashboard;
