import React from 'react';
import Colors from '../utils/Colors';
import { View, Image, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';

const NormalEventCard = ({ item }) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                width: '100%',
                height: 150,
                backgroundColor: "#F5ECF9",
                marginBottom: 8,
                borderRadius: 10
            }}
        >
            <View
                style={{
                    width: "35%",
                    height: '100%',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    overflow: "hidden"
                }}
            >
                {
                    (!item?.image)
                        ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Avatar.Icon size={90} icon="camera" color={Colors.themeColorHigh} style={{ backgroundColor: Colors.light }} />
                        </View>
                        : <Image source={{ uri: item?.image }} style={{ width: "100%", height: "100%" }} />
                }
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    padding: 8,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    overflow: "hidden"
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '50%'
                    }}
                >
                    <Text style={{ color: "#000000", fontSize: 22, fontWeight: 600 }}>{item?.name}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '50%',
                        justifyContent: "center"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 2
                        }}
                    >
                        <MaterialIcons name="category" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            {item?.type}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 2
                        }}
                    >
                        <MaterialIcons name="event" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            2023
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 2
                        }}
                    >
                        <EvilIcons name="location" size={20} color={Colors.gray} />
                        <Text style={{ color: Colors.gray, fontSize: 16, paddingLeft: 5 }}>
                            {item?.city}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default NormalEventCard;