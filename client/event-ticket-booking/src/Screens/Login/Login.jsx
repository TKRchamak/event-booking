import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  Pressable,
  SafeAreaView
} from "react-native";
// import { useDispatch } from 'react-redux';
// import { setLoaderModalTrue, setLoaderModalFalse, setUserData } from '../../Redux/actions/userActions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from "./../../../assets/icon.png";
import Colors from "../../utils/Colors";
import CustomBtn from "../../Components/CustomBtn/CustomBtn";
import FontUtils from "../../utils/FontUtils";
// import { url } from '../../Redux/store';
import Checkbox from 'expo-checkbox';
import HeaderBar from "../../Components/HeaderBar/HeaderBar";

export default function Login(props) {
  const { navigation } = props;
  // const dispatch = useDispatch();
  const [inputLoginUser, setInputLoginUser] = useState({});
  const [isChecked, setChecked] = useState(false);
  // useEffect(() => {
  //     const checkUser = async () => {
  //         const data = await AsyncStorage.getItem("rcl_user_data");
  //         const userData = JSON.parse(data);
  //         if (userData) {
  //             dispatch(setUserData(userData));
  //         }
  //     }
  //     checkUser();
  // }, [])

  const handleInputChange = (text, label) => {
    const newData = { ...inputLoginUser };
    newData[label] = text;
    setInputLoginUser(newData);
  };

  // const loginFunc = () => {
  //     dispatch(setLoaderModalTrue());
  //     fetch(`${url}/user/login/`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(inputLoginUser)
  //     })
  //         .then(res => res.json())
  //         .then(async data => {
  //             if (data.error) {
  //                 Alert.alert(`${data.error}`);
  //             } else {
  //                 // await AsyncStorage.setItem("rcl_user_data", JSON.stringify(data));
  //                 dispatch(setUserData(data));
  //             }
  //         })
  //         .catch(err => {
  //             // console.log(err);
  //             Alert.alert("Please Login Again");
  //         })
  //         .finally(() => dispatch(setLoaderModalFalse()))
  // }


  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} name={"Login"} func={() => { navigation.goBack() }} />
      <ScrollView style={{ flex: 1, backgroundColor: Colors.light }}>
        <View style={styles.loginContainer}>
          {/* <Image style={styles.tinyLogo} source={logo} /> */}
          {/* <Text style={styles.brandName}>FEVER</Text> */}
          <Text style={styles.myLogo}>EVENT</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputFieldStyle}
              onChangeText={(text) => handleInputChange(text, "email")}
              placeholder="Email"
              placeholderTextColor={Colors.gray}
            />
            <TextInput
              style={styles.inputFieldStyle}
              onChangeText={(text) => handleInputChange(text, "password")}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={Colors.gray}
            />

            <Pressable style={{ flex: 1, flexDirection: "row", marginBottom: 16, marginLeft: 10, alignItems: "center" }} onPress={() => setChecked(!isChecked)}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? Colors.themeColorHigh : undefined}
              />
              <Text style={{ marginLeft: 10, fontSize: 18, color: Colors.gray }}>Login As an Organizer</Text>
            </Pressable>

            <CustomBtn
              height={60}
              marginBottom={10}
              textColor={Colors.light}
              text={"Sign-In"}
            // func={() => loginFunc()}
            />
            {/* height, text, color, iconName, func, textColor */}

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ marginLeft: 10, fontSize: 18, color: Colors.gray }}>
                Don’t have an account?
                <Text style={{ color: Colors.themeColorHigh, marginLeft: 30 }}>Register</Text>
              </Text>
            </View>


          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECEBE8',
    width: '100%',
    height: '100%',
  },
  loginContainer: {
    backgroundColor: Colors.light,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  myLogo: {
    marginTop: 160,
    marginBottom: 100,
    color: Colors.themeColorHigh,
    // fontWeight: FontUtils.cfw.bigger,
    fontSize: FontUtils.cfs.logoSize,
    fontFamily: "BlackOpsOne-Regular",
  },
  tinyLogo: {
    width: 131,
    height: 131,
    marginBottom: 30,
    marginTop: 80,
  },
  brandName: {
    color: Colors.dark,
    fontWeight: "900",
    fontSize: 60,
    marginVertical: 120,
    textAlign: "center",
  },
  inputView: {
    width: "90%",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  inputFieldStyle: {
    // width: "100%",
    flex: 2,
    // height: 40,
    color: Colors.dark,
    borderColor: Colors.gray,
    backgroundColor: Colors.light,

    borderWidth: 1,
    borderRadius: 16,

    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,

    fontSize: 18,
    // lineHeight: 30,
  }
});
