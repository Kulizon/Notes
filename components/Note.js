import { View, Text, StyleSheet, TextInput } from "react-native";

const Note = (props) => {
  return (
    <View style={styles.note}>
      <TextInput
        style={styles.title}
        onChangeText={(newTitle) =>
          props.onEditNote({ ...props.note, title: newTitle })
        }
      >
        {props.note.title}
      </TextInput>
      <Text style={styles.date}>{props.note.date}</Text>
      <TextInput
        style={styles.text}
        multiline
        numberOfLines={12}
        onChangeText={(newText) =>
          props.onEditNote({ ...props.note, text: newText })
        }
      >
        {props.note.text}
      </TextInput>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  note: {},
  title: {
    fontSize: 26,
    color: "#000",
  },
  date: {
    fontSize: 16,
    color: "#a8a8a8",
  },
  text: {
    fontSize: 16,
    color: "#5f5f5f",
    marginTop: 20,
    textAlignVertical: "top",
    maxHeight: "80%",
  },
});
