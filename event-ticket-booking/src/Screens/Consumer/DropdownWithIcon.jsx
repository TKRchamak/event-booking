import React from 'react';

const DropdownWithIcon = (width = 250, icon = null, itemList, key, label, value, selectedValue, func) => {
    return (
        <View style={{
            borderColor: Colors.gray,
            borderWidth: 1,
            borderRadius: 10,
            overflow: 'hidden',
            width: width,
            height: 56,
            marginTop: 20
        }}>
            <View style={{
                flexDirection: 'row', // Align the clock icon and picker horizontally
                alignItems: 'center', // Center the clock icon vertically
                // paddingLeft: 10, // Add some padding to the left of the picker
            }}>
                {
                    icon &&
                    <AntDesign
                        name="clockcircleo"
                        size={24} color="black"
                        style={{
                            width: 24, // Set the width of the clock icon
                            height: 24, // Set the height of the clock icon
                            marginRight: 5, // Add some margin to separate the icon from the picker
                        }}
                    />
                }

                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => func(itemValue)}
                    style={{
                        flex: 1, // Take up the remaining space horizontally
                        height: 50,
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                >
                    {
                        itemList.map(slot => <Picker.Item key={slot.id} label={`${slot.from}-${slot.to}`} value={slot} />)
                    }
                </Picker>
            </View>
        </View>
    );
};

export default DropdownWithIcon;