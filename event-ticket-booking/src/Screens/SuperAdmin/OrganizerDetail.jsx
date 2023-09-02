import React from 'react';
import { Text, View } from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../Redux/userSlice';
import Colors from '../../utils/Colors';

const OrganizerDetail = () => {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, width: "100%", justifyContent: "center", }}>
            <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>I am User</Text>
            <CustomBtn
                height={60}
                width={500}
                textColor={Colors.light}
                text={"Log Out"}
                marginBottom={80}
                func={async () => {
                    await AsyncStorage.removeItem("userData");
                    await AsyncStorage.removeItem("userToken");
                    dispatch(clearUserData());
                }}
            />
        </View>
    );
};

export default OrganizerDetail;