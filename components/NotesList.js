import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import CheckBox from "expo-checkbox";

import MasonryList from "@react-native-seoul/masonry-list";

const NotesList = (props) => {
  const notes = props.notes.filter((note) =>
    note.title
      .toLowerCase()
      .replaceAll(" ", "")
      .includes(props.query.toLowerCase().replaceAll(" ", ""))
  );

  return (
    <>
      <View style={styles.list}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{props.title}</Text>
          {props.isAction && (
            <CheckBox
              value={props.numberOfSelectedNotes === notes.length}
              onValueChange={props.onSelectAll.bind(
                this,
                props.numberOfSelectedNotes === notes.length
              )}
              // color={
              //   props.numberOfSelectedNotes === notes.length
              //     ? "#3269ff"
              //     : "#282828"
              // }
            ></CheckBox>
          )}
        </View>

        {notes.length === 0 && (
          <Text style={styles.emptyListText}>Nie znaleziono notatek...</Text>
        )}

        <MasonryList
          showsVerticalScrollIndicator={true}
          numColumns={2}
          data={notes.reverse()}
          keyExtractor={(note) => note.id}
          renderItem={(item) => {
            const note = item.item;
            const i = item.i;

            return (
              <Pressable
                key={note.id}
                style={
                  i % 2 === 0
                    ? styles.note
                    : { ...styles.note, alignSelf: "flex-end" }
                }
                onLongPress={() => props.onChangeIsAction(true, note.id)}
                onPress={() => {
                  if (props.isAction) {
                    props.onChangeSelected(!note.isSelected, note.id);
                    return;
                  }
                  props.onSetHighlightedNote(note);
                }}
              >
                <View style={styles.noteHeader}>
                  <Text
                    style={
                      props.isAction
                        ? { ...styles.noteTitle, ...styles.actionNoteTitle }
                        : styles.noteTitle
                    }
                  >
                    {note.title}
                  </Text>
                  {props.isAction && (
                    <CheckBox
                      value={note.isSelected}
                      onValueChange={() =>
                        props.onChangeSelected(!note.isSelected, note.id)
                      }
                      style={styles.checkbox}
                    ></CheckBox>
                  )}
                </View>
                <Text style={styles.noteText}>
                  {note.text.split(/\s+/).splice(0, 15).join(" ")}
                </Text>
                <Text style={styles.noteDate}>{note.date}</Text>
              </Pressable>
            );
          }}
        ></MasonryList>
      </View>
    </>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  list: {
    marginTop: 15,
    width: "100%",
    height: "75%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 26,
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: 500,
  },
  emptyListText: {
    fontSize: 16,
    alignSelf: "flex-start",
  },
  note: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
    width: "95%",
  },
  noteHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  checkbox: {
    position: "absolute",
    right: 0,
  },
  actionNoteTitle: {
    marginRight: 20,
  },
  lastElement: {
    marginBottom: 160,
  },
  noteTitle: {
    color: "#000",
    fontSize: 18,
    marginBottom: 12,
  },
  noteText: {
    fontSize: 16,
    color: "#a8a8a8",
  },
  noteDate: {
    fontSize: 14,
    color: "#c8c8c8",
    marginTop: 12,
  },
});
