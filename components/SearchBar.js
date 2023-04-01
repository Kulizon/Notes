import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SearchBar = (props) => {
  return (
    <View style={styles.bar}>
      <TextInput
        placeholder="Szukaj...."
        style={styles.input}
        onChangeText={(newQuery) => props.onChangeQuery(newQuery)}
      ></TextInput>
      <FontAwesome5 name="search" style={styles.icon}></FontAwesome5>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  input: {
    padding: 5,
    paddingLeft: 45,
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    fontSize: 20,
    left: 15,
  },
});
