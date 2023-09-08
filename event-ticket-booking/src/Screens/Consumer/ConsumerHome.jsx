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
        setTimeout(() => {
            getAllEventList();// Add new data to the existing data
            setRefreshing(false); // Set refreshing to false to stop the loader
        }, 2000); // Simulate a delay of 2 seconds
    };

    useEffect(() => {
        if (token) {
            getAllEventList();
        }
        // else loginFunc();
    }, [])

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

            <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ paddingHorizontal: 20, paddingVertical: 10, height: 60, flexDirection: "row" }}>
                <View style={styles.letIconBox}>
                    <AntDesign name="search1" size={24} color={Colors.gray} />
                </View>
                <View style={styles.input} />
            </TouchableOpacity>

            <ScrollView
                showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
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
    }
});


export default ConsumerHome;