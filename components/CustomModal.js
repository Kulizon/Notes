import { View, Modal, StyleSheet, StatusBar } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CustomModal = (props) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={props.onRequestClose}
      style={styles.modal}
      statusBarTranslucent={true}
    >
      <View style={styles.innerModal}>
        <View style={styles.header}>
          <FontAwesome5
            name="chevron-left"
            solid
            style={styles.return}
            onPress={props.onRequestClose}
          />
          <View style={styles.controlButtons}>
            <FontAwesome5
              style={styles.back}
              name="undo"
              onPress={props.onChangePlaceInHistory.bind(
                this,
                props.note.id,
                -1
              )}
            ></FontAwesome5>
            <FontAwesome5
              style={styles.front}
              name="undo"
              onPress={props.onChangePlaceInHistory.bind(
                this,
                props.note.id,
                1
              )}
            ></FontAwesome5>
          </View>
        </View>
        <View style={styles.modalContent}>{props.children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  innerModal: {
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    padding: 15,
  },
  return: {
    fontSize: 26,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 5,
  },
  controlButtons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  back: {
    fontSize: 22,
    marginRight: 14,
    color: "#282828",
  },
  front: {
    fontSize: 22,
    transform: [{ scaleX: -1 }],
    color: "#282828",
  },
});
