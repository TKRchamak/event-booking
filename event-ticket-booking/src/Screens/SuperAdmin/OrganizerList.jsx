import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../utils/Colors';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

const OrganizerCard = ({ item }) => {
    console.log(item);

    return (
        <View style={{ width: "100%", flexDirection: "row", backgroundColor: "#e2e8f0", borderRadius: 16, marginBottom: 20 }}>
            <View style={{
                height: 200,
                width: 150,
                borderColor: Colors.gray,
                borderWidth: 1,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                fontSize: 18,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}>
                {
                    (item?.organization_logo)
                        ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                        </View>
                        : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                }
            </View>

            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: "#000000" }}>{item?.organization_name}</Text>
                <View style={{ alignSelf: "baseline" }}>
                    {/* <Text> <MaterialIcons name="event" size={24} color="black" /> {item?.event_list.length > 1 ? `${item?.event_list.length} events` : `${item?.event_list.length} event`}</Text> */}
                    <Text> <MaterialIcons name="system-update-alt" size={24} color="black" />2023</Text>
                </View>
            </View>
        </View>
    )
}

const OrganizerList = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const screenHeight = Dimensions.get('window').height;
    const [activeTab, setActiveTab] = useState('active');

    const activeOrganizerList = useSelector((state) => state.organizer.allActiveOrganizerList);
    const requestOrganizerList = useSelector((state) => state.organizer.allRequestOrganizerList);

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setSearchQuery(query);

        // if (cityList.length > 1) {
        //     let filterData = cityList.filter(item => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
        //     setSearchCityList(filterData);
        // }
    };


    return (
        <View style={styles.container}>
            <View style={styles.firstIn}>
                <HeaderBar
                    backButton={true}
                    navigation={navigation}
                    name={"Organizer List"}
                // func={() => {
                //     navigation.goBack();
                // }}
                />
            </View>

            <View style={styles.firstIn}>
                <CustomInput searchText={searchQuery} setSearchText={onChangeSearch}></CustomInput>
            </View>

            <View style={styles.myTabBtnArea}>
                <View style={[styles.myTabBtnStyle, activeTab !== "active" && { borderColor: '#ffffff' }]}>
                    <Text onPress={() => setActiveTab("active")} style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}>ACTIVE</Text>
                </View>
                <View style={[styles.myTabBtnStyle, activeTab === "active" && { borderColor: '#ffffff' }]}>
                    <Text onPress={() => setActiveTab("request")} style={{ textAlign: "center", fontSize: 20, fontWeight: 600 }}>REQUESTED</Text>
                </View>
            </View>


            <View style={[styles.secondIn, { height: screenHeight - 270 }]}>
                {
                    activeTab === "active" ?
                        <FlatList
                            data={activeOrganizerList}
                            renderItem={({ item }) =>
                                <View style={{ width: "100%", flexDirection: "row", backgroundColor: "#e2e8f0", borderRadius: 16, marginBottom: 20 }}>
                                    <View style={{
                                        height: 200,
                                        width: 150,
                                        borderColor: Colors.gray,
                                        borderWidth: 1,
                                        borderTopLeftRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        fontSize: 18,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}>
                                        {
                                            (!item?.organization_logo)
                                                ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                    <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                                </View>
                                                : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                                        }
                                    </View>

                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{ color: "#000000", fontSize: 18, fontWeight: 600 }}>{item?.organization_name}</Text>
                                        {/* <View style={{ alignSelf: "baseline" }}>
                                            <Text> <MaterialIcons name="event" size={24} color="black" /> {item?.event_list.length > 1 ? `${item?.event_list.length} events` : `${item?.event_list.length} event`}</Text>
                                            <Text style={{ justifyContent: "flex-start", alignItems: "center" }}> <MaterialIcons name="system-update-alt" size={24} color="black" />2023</Text>
                                        </View> */}
                                    </View>
                                </View>
                            }
                            keyExtractor={item => item._id}
                            numColumns={2}
                            style={{ width: "100%" }}
                        />
                        :
                        <FlatList
                            data={requestOrganizerList}
                            renderItem={({ item }) =>
                                <View style={{ width: "100%", flexDirection: "row", backgroundColor: "#f8fafc", borderRadius: 16, marginBottom: 20 }}>
                                    <View style={{
                                        height: 150,
                                        width: 120,
                                        borderColor: Colors.gray,
                                        borderWidth: 1,
                                        borderTopLeftRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        fontSize: 18,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}>
                                        {
                                            (!item?.organization_logo)
                                                ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                                    <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                                                </View>
                                                : <Image source={{ uri: item?.organization_logo }} style={{ width: "100%", height: "100%" }} />
                                        }
                                    </View>

                                    <View style={{ margin: 20 }}>
                                        <Text style={{ color: "#000000", fontSize: 18, fontWeight: 600 }}>{item?.organization_name}</Text>
                                        {/* <View style={{ alignItems: "flex-end" }}>
                                            <Text> <MaterialIcons name="event" size={24} color="black" /> {item?.event_list.length > 1 ? `${item?.event_list.length} events` : `${item?.event_list.length} event`}</Text>
                                            <Text style={{ justifyContent: "flex-start", alignItems: "center" }}> <MaterialIcons name="system-update-alt" size={24} color="black" />2023</Text>
                                        </View> */}
                                    </View>
                                </View>
                            }
                            keyExtractor={item => item._id}
                            numColumns={2}
                            style={{ width: "100%" }}
                        />
                }

            </View>
        </View >
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
    },

    myTabBtnArea: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    myTabBtnStyle: {
        color: Colors.dark,
        fontSize: 30,
        width: 120,
        fontWeight: 600,
        borderBottomWidth: 6,
        borderColor: Colors.themeColorHigh,
        marginHorizontal: 10
    }
});

export default OrganizerList;