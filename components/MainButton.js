import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const MainButton = (props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View
        style={
          !props.alt
            ? { ...styles.button }
            : { ...styles.button, ...styles.alt }
        }
      >
        <FontAwesome5
          name={props.iconName}
          style={styles.inner}
          solid
        ></FontAwesome5>
      </View>
      {props.altText && <Text style={styles.altText}>{props.altText}</Text>}
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    padding: 6,
    borderRadius: 360,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 360,
    minWidth: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  alt: {
    width: "auto",
    flexDirection: "row",
    minWidth: 42,
    height: 42,
  },
  inner: {
    fontSize: 20,
  },
  altText: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 18,
    color: "#fff",
  },
});
