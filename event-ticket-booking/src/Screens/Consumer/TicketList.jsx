import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Colors from '../../utils/Colors';
import axios from 'axios';
import rootUrl from '../../Services/rootUrl';

const TicketList = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);
    console.log(token);

    const [refreshing, setRefreshing] = useState(false);
    const [ticketList, setTicketList] = useState([]);

    const getTicketList = async () => {
        try {
            const headers = {
                'X-Auth-Token': token
            };
            const { data } = await axios.get(`${rootUrl}/api/v1/user/get-all-ticket`, {
                headers
            });

            console.log(data);
            setTicketList(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRefresh = () => {
        setRefreshing(true); // Set refreshing to true to show the loader

        setTimeout(() => {
            getTicketList();// Add new data to the existing data
            setRefreshing(false); // Set refreshing to false to stop the loader
        }, 2000); // Simulate a delay of 2 seconds
    };

    useEffect(() => {
        getTicketList();
    }, [])

    return (
        <View style={styles.headerContainer}>
            <HeaderBar backButton={true} navigation={navigation} name={"Ticket List"}></HeaderBar>

            <FlatList
                style={styles.productsContainer}
                showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar

                data={ticketList}
                keyExtractor={item => item?._id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }

                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ticket-detail", item)}
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 15
                        }}
                    >
                        <View style={{
                            height: 145,
                            width: "65%",
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: "#F5ECF9"
                        }}>
                            <Text style={{
                                color: Colors.gray,
                                fontSize: 18,
                                fontFamily: "Poppins-Regular",
                            }}>Event Name</Text>
                            <Text style={{
                                color: Colors.themeColorHigh,
                                fontSize: 20,
                                fontFamily: "Poppins-Bold",
                                marginBottom: 2,
                                fontWeight: "600"
                            }}>{item?.event?.name}</Text>


                            <Text style={{
                                color: Colors.gray,
                                fontSize: 18,
                                fontFamily: "Poppins-Regular",
                            }}>Date</Text>
                            <Text style={{
                                color: Colors.dark,
                                fontSize: 20,
                                fontFamily: "Poppins-Bold",
                            }}>{item?.time_slot?.from}</Text>
                        </View>


                        <View style={{
                            height: 130,
                            width: 0,
                            borderWidth: 1,
                            borderStyle: "dashed",
                            borderColor: "#F5ECF9"
                        }}></View>


                        <View style={{
                            height: 145,
                            width: "35%",
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: "#F5ECF9"
                        }}>
                            <Text style={{
                                color: Colors.gray,
                                fontSize: 18,
                                fontFamily: "Poppins-Regular",
                            }}>Total Seats</Text>
                            <Text style={{
                                color: Colors.dark,
                                fontSize: 20,
                                fontFamily: "Poppins-Bold",
                            }}>{item?.quantity < 10 ? `0${item?.quantity}` : `${item?.quantity}`}</Text>
                        </View>
                    </TouchableOpacity>
                    // <TouchableOpacity
                    //     onPress={() => navigation.navigate("event-detail", item)}
                    //     style={{
                    //         flex: 1,
                    //         flexDirection: "row",
                    //         width: '100%',
                    //         height: 150,
                    //         backgroundColor: "#f8fafc",
                    //         marginBottom: 8,
                    //         borderRadius: 20,
                    //         // borderWidth: 2,
                    //         // borderColor: "red",
                    //     }}>
                    //     <View style={{
                    //         // flex: 1,
                    //         width: "35%",
                    //         height: '100%',
                    //         borderTopLeftRadius: 20,
                    //         borderBottomLeftRadius: 20,
                    //         overflow: "hidden",
                    //         // borderWidth: 2,
                    //         // borderColor: "red"
                    //     }}>
                    //         {
                    //             (!item?.image)
                    //                 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    //                     <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                    //                 </View>
                    //                 : <Image source={{ uri: item?.image }} style={{ width: "100%", height: "100%" }} />
                    //         }
                    //     </View>
                    //     <View style={{
                    //         flex: 1,
                    //         height: '100%',
                    //         padding: 8,
                    //         borderTopRightRadius: 20,
                    //         borderBottomRightRadius: 20,
                    //         overflow: "hidden",
                    //         // borderWidth: 2,
                    //         // borderColor: "red"
                    //     }}>
                    //         <View style={{
                    //             flex: 1,
                    //             width: '100%',
                    //             height: '50%',
                    //             // borderWidth: 2,
                    //             // borderColor: "red"
                    //         }}>
                    //             <Text style={{ color: "#000000", fontSize: 22, fontWeight: 600 }}>{item?.name}</Text>
                    //         </View>

                    //         <View style={{
                    //             flex: 1,
                    //             width: '100%',
                    //             height: '50%',
                    //             justifyContent: "center",
                    //             // borderWidth: 2,
                    //             // borderColor: "red",
                    //         }}>
                    //             <View style={{
                    //                 flexDirection: "row",
                    //                 alignItems: "center",
                    //                 marginBottom: 2
                    //             }}>
                    //                 <MaterialIcons name="category" size={20} color={Colors.gray} />
                    //                 <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                    //                     {item?.type}
                    //                 </Text>
                    //             </View>

                    //             <View style={{
                    //                 flexDirection: "row",
                    //                 alignItems: "center",
                    //                 marginBottom: 2
                    //             }}>
                    //                 <MaterialIcons name="event" size={20} color={Colors.gray} />
                    //                 <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                    //                     2023
                    //                 </Text>
                    //             </View>

                    //             <View style={{
                    //                 flexDirection: "row",
                    //                 alignItems: "center",
                    //                 marginBottom: 2
                    //             }}>
                    //                 {/* <MaterialIcons name="location" size={20} color={Colors.gray} /> */}
                    //                 <EvilIcons name="location" size={20} color={Colors.gray} />
                    //                 <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                    //                     {item?.city}
                    //                 </Text>
                    //             </View>
                    //         </View>
                    //     </View>
                    // </TouchableOpacity>
                }
            />
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: Colors.light,
    },

    productsContainer: {
        flex: 1,
        flexGrow: 10,
        padding: 10,
        backgroundColor: Colors.light,
    }

});

export default TicketList;