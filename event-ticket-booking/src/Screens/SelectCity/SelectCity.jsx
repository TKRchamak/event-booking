import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ImageBackground, Pressable, Image } from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import { Searchbar } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import rootUrl from '../../Services/rootUrl';
import FontUtils from '../../utils/FontUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { setUserData } from '../../Redux/userSlice';
import EmptyListScreen from '../../Components/EmptyListScreen';

const SelectCity = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;
    const screenHeight = Dimensions.get('window').height;
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.token);
    const [cityList, setCityList] = useState([]);
    const [selectCity, setSelectCity] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCityList, setSearchCityList] = useState([]);


    const onChangeSearch = query => {
        setSearchQuery(query);

        if (cityList.length > 1) {
            let filterData = cityList.filter(item => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()))
            setSearchCityList(filterData);
        }
    };

    const getCityList = async () => {
        try {
            const { data } = await axios.get(`${rootUrl}/api/v1/city/`);
            setCityList(data.data);
        } catch (error) {
            console.log(error);
        } finally {
        }
    }

    useEffect(() => {
        getCityList();
    }, [])

    const updateUserCity = async () => {
        const headers = {
            // 'Authorization': `Bearer ${token}`,
            'X-Auth-Token': token
        };

        let newData = { ...user };
        newData.selected_city = selectCity;
        const { data } = await axios.put(
            `${rootUrl}/api/v1/user/update`,
            newData,
            {
                headers
            }
        );
        if (data?.status === "success") {
            dispatch(setUserData(data));
        } else {
            throw data;
        }
    }

    return (
        <View style={styles.container}>
            <HeaderBar
                backButton={true}
                navigation={navigation}
                name={"Select Your City"}
                func={() => {
                    navigation.goBack();
                }}
            />
            <CustomInput searchText={searchQuery} setSearchText={onChangeSearch}></CustomInput>

            {/* <View style={{ flex: 1, flexGrow: 10, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "red" }}> */}
            <View style={{ height: screenHeight - 195, width: "100%", justifyContent: "center", alignItems: "center", }}>
                {

                    (searchQuery === "" && cityList.length > 0) &&
                    <FlatList
                        // horizontal={true}
                        data={cityList}
                        renderItem={({ item }) =>
                            <ImageBackground
                                source={{ uri: item.posterUrl }}
                                resizeMode="cover"
                                style={{ height: 140, width: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.dark }}>
                                <Pressable
                                    onPress={() => { setSelectCity(item.name) }}
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                    <LinearGradient
                                        // Button Linear Gradient
                                        useAngle
                                        angle={45}
                                        angleCenter={{ x: 0.5, y: 0.5 }}
                                        colors={["transparent", Colors.dark]}
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            paddingHorizontal: 10,
                                        }}>
                                        {
                                            selectCity === item.name ?
                                                <Text style={{ textAlign: "center", fontSize: FontUtils.cfs.header3, color: Colors.themeColorLow, fontWeight: FontUtils.cfw.mid }}>{item.name}</Text>
                                                :
                                                <Text style={{ textAlign: "center", fontSize: FontUtils.cfs.header3, color: Colors.light, fontWeight: FontUtils.cfw.mid }}>{item.name}</Text>
                                        }
                                    </LinearGradient>
                                </Pressable>
                            </ImageBackground>
                        }
                        keyExtractor={item => item._id}
                        numColumns={2}
                        style={{ width: "100%" }}
                    />
                }
                {
                    (searchQuery !== "" && searchCityList.length > 0) &&
                    <FlatList
                        // horizontal={true}
                        data={searchCityList}
                        renderItem={({ item }) =>
                            <ImageBackground
                                source={{ uri: item.posterUrl }}
                                resizeMode="cover"
                                style={{ height: 140, width: "100%", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.dark }}>
                                <Pressable
                                    onPress={() => { setSelectCity(item.name) }}
                                    style={{
                                        flex: 1,
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                    <LinearGradient
                                        // Button Linear Gradient
                                        useAngle
                                        angle={45}
                                        angleCenter={{ x: 0.5, y: 0.5 }}
                                        colors={["transparent", Colors.dark]}
                                        style={{
                                            flex: 1,
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            paddingHorizontal: 10,
                                        }}>
                                        <Text style={{ textAlign: "center", fontSize: FontUtils.cfs.header3, color: Colors.light, fontWeight: FontUtils.cfw.mid }}>{item.name}</Text>
                                    </LinearGradient>
                                </Pressable>
                            </ImageBackground>
                        }
                        keyExtractor={item => item._id}
                        numColumns={2}
                        style={{ width: "100%" }}
                    />
                }

                {
                    (searchQuery !== "" && searchCityList.length === 0) &&
                    <EmptyListScreen />
                }
            </View>

            <View>
                {
                    (token === "" && selectCity !== "") ?
                        <CustomBtn
                            height={60}
                            textColor={Colors.light}
                            text={"SELECT CITY"}
                            radius={0}
                            func={updateUserCity}
                        />
                        : (token !== "" && selectCity !== "" && user.selected_city !== selectCity) ? <CustomBtn
                            height={60}
                            textColor={Colors.light}
                            text={"SELECT CITY"}
                            radius={0}
                            func={updateUserCity}
                        /> : <CustomBtn
                            height={60}
                            textColor={Colors.light}
                            text={"SELECT CITY"}
                            radius={0}
                            disabled={true}
                        />
                }

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        width: "100%",
        height: "100%",
    },
});

export default SelectCity;