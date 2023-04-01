import { View, StyleSheet, Alert } from "react-native";

import MainButton from "./MainButton";

const createRestoreAlert = (callback, numberOfSelectedNotes) => {
  if (numberOfSelectedNotes === 0) return;

  Alert.alert(
    "",
    "Czy jesteś pewien, że chcesz przywrócić zaznaczone notatki?",
    [
      {
        text: "Anuluj",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Tak", onPress: callback },
    ]
  );
};
const createDeleteAlert = (callback, visibleNotes, numberOfSelectedNotes) => {
  if (numberOfSelectedNotes === 0) return;

  Alert.alert(
    "",
    `Czy jesteś pewien, że chcesz ${
      visibleNotes === "notes"
        ? "przenieść zaznaczone notatki do kosza"
        : "trwale usunąć zaznaczone notatki"
    }?`,
    [
      {
        text: "Anuluj",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Tak", onPress: callback },
    ]
  );
};

const MainMenu = (props) => {
  return (
    <View style={styles.menu}>
      <MainButton
        onPress={props.onCreateNote}
        iconName="plus"
        alt
        altText="Utwórz"
      ></MainButton>
      <View style={styles.connector}></View>
      {!props.isAction && (
        <MainButton
          onPress={props.onChangeVisibleNotes}
          iconName={props.visibleNotes === "notes" ? "trash-alt" : "list"}
        ></MainButton>
      )}

      {props.isAction && props.visibleNotes === "deleted" && (
        <>
          <View style={{ ...styles.connector, width: 5 }}></View>
          <MainButton
            onPress={createRestoreAlert.bind(
              this,
              props.onRestoreNotes,
              props.numberOfSelectedNotes
            )}
            iconName="trash-restore"
          ></MainButton>
        </>
      )}
      {props.isAction && (
        <MainButton
          onPress={createDeleteAlert.bind(
            this,
            props.onDeleteNotes,
            props.visibleNotes,
            props.numberOfSelectedNotes
          )}
          iconName="trash"
        ></MainButton>
      )}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 20,
  },
  connector: {
    height: 10,
    backgroundColor: "#282828",
    width: 8,
    right: 0,
    transform: "scale(2.8)",
  },
});
