import React from 'react';
import { Text, View } from 'react-native';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../Redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';

const AdminProfile = () => {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, width: "100%", justifyContent: "center", }}>
            <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>Profile Page</Text>
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

export default AdminProfile;