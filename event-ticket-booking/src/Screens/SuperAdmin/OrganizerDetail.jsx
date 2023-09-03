import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";
import { Avatar, Portal, Button, Dialog, } from "react-native-paper";
import CustomBtn from "../../Components/CustomBtn/CustomBtn";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import rootUrl from "../../Services/rootUrl";
import { setAllActiveOrganizerList, setAllRequestOrganizerList } from "../../Redux/organizerSlice";
import { setOrganizerEventList } from "../../Redux/eventSlice";

const OrganizerDetail = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("about_organize");
    const token = useSelector((state) => state.user.token);
    const myEventList = useSelector((state) => state.event.organizersEventList);
    const item = route.params || 'No data received';

    if (!item?._id) navigation.goBack();

    const [visible, setVisible] = useState([false, ""]);
    const showDialog = (text) => setVisible([true, text]);
    const hideDialog = () => setVisible([false, ""]);

    const eventFlatList = (dataList) => {
        return (
            <FlatList
                data={dataList}
                keyExtractor={item => item._id}
                style={{
                    flex: 1,
                    width: "100%",
                    padding: 10,
                    // alignItems: 'flex-start',
                    // borderWidth: 2,
                    // borderColor: "red"
                }}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("organizer-detail", item)}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            width: '100%',
                            height: 150,
                            backgroundColor: "#f8fafc",
                            marginBottom: 8,
                            borderRadius: 20,
                            // borderWidth: 2,
                            // borderColor: "red",
                        }}>
                        <View style={{
                            // flex: 1,
                            width: "35%",
                            height: '100%',
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            overflow: "hidden",
                            // borderWidth: 2,
                            // borderColor: "red"
                        }}>
                            {
                                (!item?.organization_logo)
                                    ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                    </View>
                                    : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                            }
                        </View>
                        <View style={{
                            flex: 1,
                            height: '100%',
                            padding: 8,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            overflow: "hidden",
                            // borderWidth: 2,
                            // borderColor: "red"
                        }}>
                            <View style={{
                                flex: 1,
                                width: '100%',
                                height: '50%',
                                // borderWidth: 2,
                                // borderColor: "red"
                            }}>
                                <Text style={{ color: "#000000", fontSize: 22, fontWeight: 600 }}>{item?.organization_name}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                width: '100%',
                                height: '50%',
                                justifyContent: "center",
                                // borderWidth: 2,
                                // borderColor: "red",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 2
                                }}>
                                    <MaterialIcons name="event" size={20} color={Colors.gray} />
                                    <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                                        {item?.event_list.length > 1 ? `${item?.event_list.length} events` : `${item?.event_list.length} event`}
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 2
                                }}>
                                    <MaterialIcons name="event" size={20} color={Colors.gray} />
                                    <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                                        2023
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        )
    }

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

    const adminApprovalDecision = async (decision) => {
        const headers = {
            'X-Auth-Token': token
        };
        const requestData = {
            "_id": item._id,
            "status": decision
        };

        try {
            const { data } = await axios.put(
                `${rootUrl}/api/v1/organizer/admin-approval`, requestData,
                {
                    headers
                }
            );
            if (data.status === "success") {
                showDialog("This Event Organizer is Activated");
                await getOrganizerList();
                navigation.goBack();
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error);
            showDialog("Something Wrong");
        }
    }

    const getThisOrganizerEvents = async () => {
        const headers = {
            'X-Auth-Token': token
        };
        const requestData = {
            "_id": item?._id
        }
        try {
            const { data } = await axios.post(
                `${rootUrl}/api/v1/event/admin/organizer-eventList`, requestData,
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
            showDialog("Something Wrong");
        }
    }

    useEffect(() => {
        if (item?.status === "active") {
            getThisOrganizerEvents()
        }
    }, [])

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
                    (!item?.organization_logo)
                        ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                        </View>
                        : <Image source={{ uri: item?.organization_logo }} style={{ height: "100%", width: "100%", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                }

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

                <View style={{
                    // flex: 1,
                    width: 100,
                    height: 120,
                    left: 40,
                    top: 130,
                    position: 'absolute',
                    borderRadius: 15,
                    overflow: "hidden"
                    // borderWidth: 2,
                    // borderColor: "red"
                }}>
                    {
                        (!item?.organization_logo)
                            ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                            </View>
                            : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                    }
                </View>

                <View style={{
                    height: 40,
                    left: 160,
                    top: 210,
                    position: 'absolute',
                    // borderWidth: 2,
                    // borderColor: "red"
                }}>
                    <Text style={{ fontSize: 24, fontWeight: 600 }}>{item?.organization_name}</Text>
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
            </View>

            {/* mid area */}
            <View style={[styles.productsContainer]}>
                {
                    activeTab === "about_organize" ?
                        <Text>{item.description}</Text>
                        // : myEventList?.length > 0 && eventFlatList(myEventList)
                        : <Text>Event List</Text>
                }
            </View>

            {/* bottom button */}
            {
                item?.status === "pending" &&
                <View
                    style={{
                        marginTop: "auto",
                        marginBottom: 0,
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    <View style={{ width: "50%" }}>
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
                    <View style={{ width: "50%" }}>
                        <CustomBtn
                            height={60}
                            width={"100%"}
                            radius={0}
                            textColor={Colors.light}
                            color1={Colors.success}
                            color2={Colors.success}
                            text={"Accept"}
                            marginBottom={0}
                            func={() => adminApprovalDecision("active")}
                        />
                    </View>
                </View>
            }
        </View>
    );
};
const styles = StyleSheet.create({
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

export default OrganizerDetail;
