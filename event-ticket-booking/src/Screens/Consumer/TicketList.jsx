import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import Colors from '../../utils/Colors';
import axios from 'axios';
import rootUrl from '../../Services/rootUrl';

const TicketList = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);

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