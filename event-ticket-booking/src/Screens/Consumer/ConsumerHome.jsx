import React, { useEffect, useState } from 'react';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { View, FlatList, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Image, Text, ImageBackground, Pressable, TextInput } from 'react-native';
import axios from 'axios';
import Colors from '../../utils/Colors';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, EvilIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import rootUrl from '../../Services/rootUrl';
import { setUserData } from '../../Redux/userSlice';
import { LinearGradient } from 'expo-linear-gradient';
import BigEventCard from '../../Components/BigEventCard';
import FontUtils from '../../utils/FontUtils';

const ConsumerHome = ({ navigation }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setSearchQuery(query);

        // if (cityList.length > 1) {
        //     let filterData = cityList.filter(item => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
        //     setSearchCityList(filterData);
        // }
    };

    const [refreshing, setRefreshing] = useState(false);
    const [eventList, setEventList] = useState([]);

    const getAllEventList = async () => {
        const headers = {
            'X-Auth-Token': token
        };

        try {
            const { data } = await axios.get(
                `${rootUrl}/api/v1/event/`,
                {
                    headers
                }
            );
            if (data.status === "success") {
                setEventList(data.data)
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error);
            showDialog("Something Wrong");
        }
    }

    const loginFunc = async () => {
        const { data } = await axios.post(
            `${rootUrl}/api/v1/user/login`,
            {
                email: "user@user.com",
                password: "user"
            }
        );
        if (data.token) {
            dispatch(setUserData(data));
        } else {
            throw data;
        }
    }


    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing to true to show the loader
        fetchData(); // Fetch new data
    };

    const fetchData = () => {
        // Simulate fetching data from an API or other source
        setTimeout(() => {
            getAllEventList();// Add new data to the existing data
            setRefreshing(false); // Set refreshing to false to stop the loader
        }, 2000); // Simulate a delay of 2 seconds
    };


    useEffect(() => {
        if (token) {
            getAllEventList();
        }
        else loginFunc();
    }, [])


    const eventFlatList = (dataList) => {
        return (
            <FlatList
                horizontal={true}
                data={dataList}
                keyExtractor={item => item?._id}
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
                        // onPress={() => navigation.navigate("event-detail", item)}
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
                                (!item?.image)
                                    ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                    </View>
                                    : <Image source={{ uri: item?.image }} style={{ width: "100%", height: "100%" }} />
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
                                <Text style={{ color: "#000000", fontSize: 22, fontWeight: 600 }}>{item?.name}</Text>
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
                                    <MaterialIcons name="category" size={20} color={Colors.gray} />
                                    <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                                        {item?.type}
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

                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 2
                                }}>
                                    {/* <MaterialIcons name="location" size={20} color={Colors.gray} /> */}
                                    <EvilIcons name="location" size={20} color={Colors.gray} />
                                    <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                                        {item?.city}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            />
        )
    }


    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerBar}>
                <Text style={{ color: Colors.dark, fontSize: 40, fontFamily: "BlackOpsOne-Regular" }}>{"EVENT"}</Text>
                <View style={{ minWidth: 120, height: "60%", marginTop: 10, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, alignItems: "center", borderRadius: 20, backgroundColor: Colors.themeColorHigh, color: Colors.light }}>
                    <FontAwesome5 name="map-marked-alt" size={24} color={Colors.light} />
                    {
                        user?.selected_city &&
                        <Text style={{ color: Colors.light }}>{(`${user?.selected_city}`).toUpperCase()}</Text>
                    }
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ paddingHorizontal: 10 }}>
                <View style={{ padding: 10, height: 60, flexDirection: "row" }}>
                    <View style={styles.letIconBox}>
                        {/* <TouchableOpacity onPress={() => setSearchText("")}> */}
                        <AntDesign name="search1" size={24} color={Colors.gray} />
                        {/* </TouchableOpacity> */}
                    </View>
                    <View
                        style={styles.input}
                        value={""}

                    // onChangeText={text => setSearchText(text)}
                    />

                </View>
            </TouchableOpacity>

            <ScrollView
                showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                {/* <Text style={{ fontWeight: 800, fontSize: 20, marginLeft: 10 }}>{(`Top 10 in ${user?.selected_city}`).toUpperCase()}</Text> */}
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={eventList}
                    keyExtractor={item => item._id}
                    style={{ width: "100%" }}
                    renderItem={({ item, index }) =>
                        <BigEventCard item={item} index={index} func={() => { navigation.navigate("event-detail", item) }} />
                    }
                />

                {/* <Text style={{ fontWeight: 800, fontSize: 16, marginLeft: 10 }}>{("Top Rated").toUpperCase()}</Text>
                <FlatList
                    data={eventList}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={item => item._id}
                    style={{ width: "100%", marginBottom: 10, paddingLeft: 10 }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{ padding: 4 }} onPress={() => { navigation.navigate("event-detail", item) }}>
                            <Image source={{ uri: item?.image }} style={{ width: 120, height: 180, borderRadius: 14 }} />
                        </TouchableOpacity>
                    }
                /> */}

                <Text style={{ fontWeight: 800, fontSize: 16, marginLeft: 10 }}>{("Top Rated").toUpperCase()}</Text>
                <FlatList
                    data={eventList}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={item => item._id}
                    style={{ width: "100%", marginBottom: 10, paddingLeft: 10 }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{ padding: 4 }} onPress={() => { navigation.navigate("event-detail", item) }}>
                            <Image source={{ uri: item?.image }} style={{ width: 120, height: 180, borderRadius: 14 }} />
                        </TouchableOpacity>
                    }
                />

                <Text style={{ fontWeight: 800, fontSize: 16, marginLeft: 10, marginTop: 10 }}>{("Popular Events").toUpperCase()}</Text>
                <FlatList
                    data={eventList}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={item => item._id}
                    style={{ width: "100%", marginBottom: 10, paddingLeft: 10 }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{ padding: 4 }} onPress={() => { navigation.navigate("event-detail", item) }}>
                            <Image source={{ uri: item?.image }} style={{ width: 120, height: 180, borderRadius: 14 }} />
                        </TouchableOpacity>
                    }
                />

            </ScrollView>
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    letIconBox: {
        flex: 1,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderRightWidth: 0,
        borderColor: '#949494',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        flex: 9,
        height: 40,
        padding: 5,
        borderWidth: 1.5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        // borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: '#949494',
        backgroundColor: '#fff',
    },

    headerBar: {
        flexDirection: "row",
        minHeight: 50,
        width: "100%",
        backgroundColor: Colors.light,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    bodyContainer: {
        backgroundColor: '#E5E5E5',
        height: '100%',
    },

    productImage: {
        height: 60,
        width: 60,
        marginHorizontal: 20,
    },
    productsContainer: {
        flex: 1,
        flexGrow: 10,
        // alignItems: "center",
        padding: 10,
        backgroundColor: '#E5E5E5',
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 7,
        marginBottom: 10,
    },
    productContent: {
        flex: 1,
        flexGrow: 3,
        padding: 10,
        borderLeftColor: '#E5E5E5',
        borderLeftWidth: 2,
    },

    yellowBtn: {
        padding: 10,
        width: "100%",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#F6EC33',
        backgroundColor: '#F6EC33',
    },

    myTabBtnStyle: {
        color: Colors.dark,
        fontSize: 30,
        width: 120,
        fontWeight: 600,
        borderBottomWidth: 6,
        borderColor: Colors.themeColorHigh,
        marginHorizontal: 10
    },
    myTabBtnArea: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
});


export default ConsumerHome;