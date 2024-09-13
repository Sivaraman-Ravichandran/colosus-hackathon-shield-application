import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import MapboxGl from "@rnmapbox/maps";
MapboxGl.setAccessToken(
  "sk.eyJ1Ijoic2l2YXJhbWFuNyIsImEiOiJjbTBqaXB6c3IwbTRyMmlzYXdhNDE1eXY3In0.zE8Q2Z_e70_nRF_kgvzZUA"
);
MapboxGl.setTelemetryEnabled(false);
const MapScreen = () => {
  // Set default location (Bangalore) and safe location (safe place)
  const [defaultLocation] = useState({
    latitude: 12.963829,
    longitude: 77.505777,
  });
  const [safeLocation] = useState({
    latitude: 13.963829,
    longitude: 77.505777, // Safe location coordinates
  });
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);

  // Function to handle the SOS button press and send alert to the control room
  const handleSOSPress = async () => {
    try {
      const response = await fetch("http://192.168.137.227:5000/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user123",
          name: "Jane Doe",
          latitude: defaultLocation.latitude,
          longitude: defaultLocation.longitude,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Emergency", "An alert sent to the control room.");

        // Navigate to the safe location after sending the alert
        setCurrentLocation(safeLocation);
      } else {
        Alert.alert("Error", data.message || "Failed to send SOS alert");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Get Safe with Shield</Text>
      </View>

      {/* Map View */}
      <MapboxGl.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/streets-v12"
        rotateEnabled={true}
      >
        <MapboxGl.Camera
          zoomLevel={15}
          centerCoordinate={[
            currentLocation.longitude,
            currentLocation.latitude,
          ]}
          pitch={60}
          animationMode={"flyTo"}
          animationDuration={6000}
        />
        <MapboxGl.PointAnnotation
          id="marker"
          coordinate={[currentLocation.longitude, currentLocation.latitude]}
        >
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>📍</Text>
          </View>
        </MapboxGl.PointAnnotation>
      </MapboxGl.MapView>

      {/* Footer with controls */}
      <View style={styles.footer}>
        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
          <Text style={styles.sosButtonText}>Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
    marginBottom: 0,
  },
  header: {
    marginTop: 40,
    height: 55,
    backgroundColor: "#181C14",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerText: {
    color: "#3E8E41",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ff0000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  markerText: {
    fontSize: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#181C14",
    height: 75,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sosButton: {
    backgroundColor: "#ff5252",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ff0000",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginLeft: 100,
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default MapScreen;
