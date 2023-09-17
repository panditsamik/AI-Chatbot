import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState(ChatFaceData);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState(
    chatFaceData[0]
  );
  const navigation = useNavigation();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(chatFaceData[0]);
  }, []);

  const onChatFacePress = (id) => {
    setSelectedChatFaceData(chatFaceData[id - 1]);
  };

  return (
    <View style={styles.parentView}>
      <Text style={[{ color: selectedChatFaceData.primary }, { fontSize: 30 }]}>
        Hello
      </Text>

      <Text
        style={[
          { color: selectedChatFaceData.primary },
          { fontSize: 30, fontWeight: "bold" },
        ]}
      >
        I am {selectedChatFaceData.name}
      </Text>

      <Image
        source={{ uri: selectedChatFaceData.image }}
        style={styles.image}
      />

      <Text
        style={[
          { color: selectedChatFaceData.primary },
          { fontSize: 25, marginTop: 30 },
        ]}
      >
        How can I help you?
      </Text>
      <View style={styles.chatbots}>
        <FlatList
          data={chatFaceData}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) =>
            selectedChatFaceData.id != item.id && (
              <TouchableOpacity
                onPress={() => {
                  onChatFacePress(item.id);
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.flatlistImage}
                />
              </TouchableOpacity>
            )
          }
        />
      </View>
      <Text style={styles.hazyStyle}>Choose your Favourite ChatBuddy 🤟</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("chat", { selectedFace: selectedChatFaceData });
        }}
        style={[
          { backgroundColor: selectedChatFaceData.primary },
          {
            padding: 17,
            width: Dimensions.get("screen").width * 0.6,
            borderRadius: 19,
            alignItems: "center",
            marginTop: 30,
          },
        ]}
      >
        <Text style={styles.buttonText}>Let's chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    paddingTop: 90,
    alignItems: "center",
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  flatlistImage: {
    width: 50,
    height: 50,
    margin: 10,
  },
  chatbots: {
    marginTop: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    height: 95,
    padding: 10,
    justifyContent: "center",
    borderRadius: 15,
  },
  hazyStyle: {
    marginTop: 5,
    fontSize: 17,
    color: "#B0B0B0",
  },
  buttonText: {
    fontSize: 19,
    color: "#fff",
  },
});
