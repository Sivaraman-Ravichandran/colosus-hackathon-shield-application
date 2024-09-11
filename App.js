import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "pk.eyJ1Ijoic2l2YXJhbWFuNyIsImEiOiJjbTBqZWxnYXEwd29kMmpzaG52ZHRubnpyIn0.6ZJm9jbhRw5dyq3WFPFbAg"
);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.mapContainer}>
        <Mapbox.MapView style={styles.map} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
