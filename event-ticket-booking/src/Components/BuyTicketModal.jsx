import React from 'react';

const BuyTicketModal = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <Modal
            isVisible={isModalVisible}
            animationIn="slideInUp" // Use slideInUp for bottom to top animation
            animationOut="slideOutDown" // Use slideOutDown for closing animation
            backdropOpacity={0.5}
            onBackdropPress={toggleModal}
            animationInTiming={1000}
            animationOutTiming={1000}
            style={styles.modal}
            avoidKeyboard={false}
            onBackButtonPress={() => toggleModal()}
        >
            <View style={styles.modalContent}>
                <View style={{ width: "100%" }}>
                    <CustomBtn
                        height={60}
                        marginBottom={10}
                        textColor={Colors.light}
                        text={"Close Modal"}
                        func={() => {

                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default BuyTicketModal;