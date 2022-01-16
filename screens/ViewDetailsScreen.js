import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { COLOR } from "../stylesheet/colorScheme";


export const ViewDetailsScreen = (props) => {
  const contact = props.route.params.contactObject;

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 200, width: 200 }}
        source={{ uri: contact.picture.large }}
      />
      <Text>Title: {contact.name.title}</Text>
      <Text>First name: {contact.name.first}</Text>
      <Text>Last name: {contact.name.last}</Text>
      <Text>Age: {contact.dob.age}</Text>
      <Text>Country: {contact.location.country}</Text>
      <Text>Latitude: {contact.location.coordinates.latitude}</Text>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: contact.location.coordinates.latitude,
          longitude: contact.location.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.page2,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    fontSize: 20,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
