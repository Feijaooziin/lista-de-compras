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
            color="#d3d3d3"
          />
        </TouchableOpacity>

        <Text style={styles.description}>{data.description}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name="delete" size={24} color="#d3d3d3" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  container2: {
    flexDirection: "row",
    gap: 8,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d3d3d3",
  },
});
