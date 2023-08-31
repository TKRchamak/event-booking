import React, { useCallback } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import FontUtils from '../../utils/FontUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import landingImg from "../../../assets/img/landingPageImg.png";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = (props) => {
    const { navigation } = props;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                alignItems: 'flex-start',

            }}>
            <View style={{
                flex: 1,
                width: '100%',
                // height: 100,
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={styles.myLogo}>EVENT</Text>
            </View>

            <View style={{
                flex: 1,
                width: '100%',
                // height: 100,
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={[{ color: Colors.dark, fontWeight: FontUtils.cfw.mid }]}> Discover the best experience </Text>
                <Text style={[{ color: Colors.dark, fontWeight: FontUtils.cfw.mid }]}> in your city </Text>
            </View>

            <ImageBackground
                source={landingImg}
                resizeMode="contain"
                style={{
                    flex: 1,
                    width: '100%',
                    flexGrow: 7,
                    justifyContent: 'flex-end',
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
                        justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                    }}>
                    <CustomBtn
                        height={60}
                        textColor={Colors.light}
                        text={"Sign-In"}
                        marginBottom={20}
                        func={() => navigation.navigate('login')}

                    />

                    <CustomBtn
                        height={60}
                        textColor={Colors.light}
                        text={"Registration"}
                        marginBottom={80}
                        func={() => navigation.navigate('registration')}
                    />
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    myLogo: {
        color: Colors.themeColorHigh,
        // fontWeight: FontUtils.cfw.bigger,
        fontSize: FontUtils.cfs.logoSize,
        marginTop: 15,
        fontFamily: "BlackOpsOne-Regular",
    }
});


export default LandingPage;