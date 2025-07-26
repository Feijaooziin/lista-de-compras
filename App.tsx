import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Item from "./src/item";

import { createStore } from "tinybase";
import { useCreatePersister } from "tinybase/ui-react";
import * as SQLite from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";

const TABLE_NAME = "products";
const store = createStore();

type ProductStore = {
  description: string;
  done: boolean;
};

type Product = ProductStore & { id: string };

export default function App() {
  const [description, setDescription] = useState("");
  const [products, setPoducts] = useState<Product[]>([]);

  useCreatePersister(
    store,
    (store) =>
      createExpoSqlitePersister(store, SQLite.openDatabaseSync("database.db")),
    [],
    // @ts-ignore
    (persister) => persister.load().then(persister.startAutoSave)
  );

  function get() {
    const data = store.getTable(TABLE_NAME);
    const response = Object.entries(data).map(([id, product]) => ({
      id,
      description: String(product.description),
      done: Boolean(product.done),
    }));
    setPoducts(response);
  }

  function add() {
    if (description.trim() === "") {
      return Alert.alert("Atenção", "Informe o produto");
    }

    const id = Math.random().toString(30).substring(2, 20);
    store.setRow(TABLE_NAME, id, { description, done: false });

    setDescription("");
  }

  function remove(id: string) {
    Alert.alert("Remover", "Deseja mesmo remover este item?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          store.delRow(TABLE_NAME, id);
        },
      },
    ]);
  }

  function toggleStatus(id: string) {
    const product = store.getRow(TABLE_NAME, id);
    store.setRow(TABLE_NAME, id, { ...product, done: !product.done });
  }

  useEffect(() => {
    const listener = store.addTableListener(TABLE_NAME, get);
    get();

    return () => {
      store.delListener(listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <View style={styles.form}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Feather name="heart" size={32} color={"white"} />
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            LISTA DO APÊ 22
          </Text>
          <Feather name="heart" size={32} color={"white"} />
        </View>

        <TextInput
          placeholder="O que você precisa comprar?"
          placeholderTextColor="#000"
          onChangeText={setDescription}
          value={description}
          style={styles.input}
        />

        <Button title="Adicionar" color={"#830000"} onPress={add} />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Item
            data={item}
            onStatus={() => toggleStatus(item.id)}
            onRemove={() => remove(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Nenhum item.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },

  form: {
    width: "100%",
    alignItems: "center",
    marginTop: 80,
    gap: 16,
    marginBottom: 80,
  },

  input: {
    backgroundColor: "#d3d3d3",
    borderWidth: 1,
    width: "90%",
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    color: "#d3d3d3",
    fontSize: 16,
  },
});
