import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import MapboxGl from "@rnmapbox/maps";

MapboxGl.setAccessToken(
  "sk.eyJ1Ijoic2l2YXJhbWFuNyIsImEiOiJjbTBqaXB6c3IwbTRyMmlzYXdhNDE1eXY3In0.zE8Q2Z_e70_nRF_kgvzZUA"
);
MapboxGl.setTelemetryEnabled(false);

const MapScreen = () => {
  // Function to handle the SOS button press
  const handleSOSPress = () => {
    // Logic to send SOS alert to the dashboard (for now, it triggers an alert)
    Alert.alert(
      "SOS Alert",
      "An SOS alert has been sent to the control room. Don't Worry, we will be reaching you out."
    );

    // Here you can implement the API call or backend integration to send the alert
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
        styleURL="mapbox://styles/mapbox/satellite-streets-v12"
        rotateEnabled={true}
      >
        <MapboxGl.Camera
          zoomLevel={15}
          centerCoordinate={[76.949156, 10.936923]}
          pitch={60}
          animationMode={"flyTo"}
          animationDuration={6000}
        />
        <MapboxGl.PointAnnotation
          id="marker"
          coordinate={[76.949156, 10.936923]}
        >
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>📍</Text>
          </View>
        </MapboxGl.PointAnnotation>
      </MapboxGl.MapView>

      {/* Footer with controls */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Zoom Out</Text>
        </TouchableOpacity>
        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
          <Text style={styles.sosButtonText}>SOS alert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background to improve contrast
  },
  map: {
    flex: 1,
    marginBottom: 0, // Added spacing between the map and the footer
  },
  header: {
    marginTop: 40,
    height: 55,
    backgroundColor: "#181C14", // Darker green for a more professional look
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Adds a subtle shadow for a more elevated effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerText: {
    color: "#3E8E41",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1, // Add some spacing between letters
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
    justifyContent: "space-between", // Distribute buttons evenly
    alignItems: "center",
    backgroundColor: "#181C14",
    height: 75,
    paddingHorizontal: 15, // Adjust padding for better alignment
    paddingVertical: 10, // Add some padding for spacing inside the footer
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3E8E41",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    width: 100, // Set fixed width for consistent button sizes
  },
  buttonText: {
    color: "#3E8E41",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Redesigned SOS Button
  sosButton: {
    backgroundColor: "#ff5252", // Softer red for a friendlier but still urgent look
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ff0000", // Border color matches the SOS theme
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1, // Slight spacing for a cleaner look
  },
});

export default MapScreen;
