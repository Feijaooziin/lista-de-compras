import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ItemData = {
  done: boolean;
  description: string;
};

type Props = {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
};

export default function Item({ data, onStatus, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
          <MaterialIcons
            name={data.done ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={data.done ? "#454545" : "#d3d3d3"}
          />
        </TouchableOpacity>

        <Text style={data.done ? styles.descriptionDone : styles.description}>
          {data.description}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name="delete" size={24} color="#830000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  container2: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flex: 1,
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d3d3d3",
  },
  descriptionDone: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#454545",
    textDecorationLine: "line-through",
  },
});
