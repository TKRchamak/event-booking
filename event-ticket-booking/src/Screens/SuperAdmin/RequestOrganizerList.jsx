import React, { useState } from 'react';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { useSelector } from 'react-redux';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Colors from '../../utils/Colors';
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const RequestOrganizerList = ({ navigation }) => {
    const requestOrganizerList = useSelector((state) => state.organizer.allRequestOrganizerList);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => {
        setSearchQuery(query);

        // if (cityList.length > 1) {
        //     let filterData = cityList.filter(item => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
        //     setSearchCityList(filterData);
        // }
    };

    const organizerFlatList = (dataList) => {
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
                        onPress={() => navigation.navigate("organizer-detail", item)}
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

    return (
        <View style={styles.headerContainer}>
            <HeaderBar navigation={navigation} name={"Requested Organizer List"}></HeaderBar>
            <CustomInput searchText={searchQuery} setSearchText={onChangeSearch}></CustomInput>
            {
                requestOrganizerList && organizerFlatList(requestOrganizerList)
            }
        </View >
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: '#fff',
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


export default RequestOrganizerList;