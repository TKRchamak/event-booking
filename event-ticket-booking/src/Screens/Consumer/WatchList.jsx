import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Colors from '../../utils/Colors';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import NormalEventCard from '../../Components/NormalEventCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import rootUrl from '../../Services/rootUrl';

const WatchList = ({ navigation }) => {
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.userData);
    const [refreshing, setRefreshing] = useState(false);
    const [eventList, setEventList] = useState([]);


    const getWatchEventList = async () => {
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

    const handleRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {

            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => {

    }, [])


    return (
        <View style={styles.headerContainer}>
            <HeaderBar backButton={true} navigation={navigation} name={"Watch List"}></HeaderBar>

            <FlatList
                data={eventList}
                keyExtractor={item => item?._id}
                style={styles.productsContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => console.log("working")}>
                        <NormalEventCard item={item} />
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


export default WatchList;