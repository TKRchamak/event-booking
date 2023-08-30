import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const CustomBtn = ({ height, text, textColor = "#fff", color1 = Colors.themeColorHigh, color2 = Colors.themeColorLow, iconName, func, radius = 40, marginBottom = 0 }) => {
    return (
        <TouchableOpacity onPress={func} >
            <LinearGradient
                // Button Linear Gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.10, 0.89]}
                colors={[color1, color2]}
                style={{
                    height: height,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderWidth: 0,
                    borderRadius: radius,
                    // borderColor: color,
                    // backgroundColor: color ,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: marginBottom
                }}>
                {
                    text &&
                    <Text style={{ color: textColor, fontWeight: "bold" }}>{text}</Text>
                }
                {
                    iconName &&
                    <Text >
                        <Icon
                            name={iconName}
                            size={15}
                            color="#fff"
                        />
                    </Text>
                }
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomBtn;