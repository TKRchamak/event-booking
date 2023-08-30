import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontUtils from '../../utils/FontUtils';

const HeaderBar = ({ name, navigation, backButton, func }) => {
    return (
        <View style={styles.headerBar}>
            <View style={{ position: "absolute", left: 10, zIndex: 1 }}>
                {
                    backButton ? <Text></Text> :
                        <TouchableOpacity onPress={() => {
                            if (name === "Customer Registration" || name === "Sales Return" || name === "Take New Order" || name === "Order Preview") {
                                func()
                            } else if (name === "Your Active Orders") {
                                navigation.popToTop();
                            } else {
                                navigation.goBack();
                            }

                        }} style={{ color: "#fff", fontSize: 20, }}>
                            <Text style={{
                                height: 30,
                                width: 30,
                                borderWidth: 2,
                                borderColor: Colors.dark,
                                borderRadius: 15,
                                textAlign: "center",
                                paddingTop: 5.5
                            }}>
                                {/* <Icon
                                    name="arrow-left"
                                    size={17}
                                    color="#fff"
                                /> */}
                                <AntDesign name="arrowleft" size={17} color={Colors.dark} />
                            </Text>
                        </TouchableOpacity>
                }

            </View>


            <Text style={{ flex: 1, flexGrow: 1, textAlign: "center", color: Colors.dark, fontSize: 20, fontWeight: FontUtils.cfw.mid }}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        headerBar: {
            flexDirection: "row",
            minHeight: 50,
            backgroundColor: Colors.light,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
        },
        tinyLogo: {
            width: 30,
            height: 30,
        },
    }
)

export default HeaderBar;