import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Picker,
} from "react-native";
import { COLOR } from "../stylesheet/colorScheme";

export const ContactsScreen = (props) => {
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [contactsLoaded, setContactsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  
  const filters = [
    "No Filter Selected",
    "First names that contain the letter 'e'",
    "Older than 30",
  ];

  useEffect(() => {
    fetchContacts();
  }, []);
  const onButtonPress = (contact) => {
    props.navigation.navigate("ViewDetailsScreen", {
      contactObject: contact,
    });
  };
  const fetchContacts = async () => {
    setContactsLoaded(false);
    const response = await fetch("https://randomuser.me/api/?results=10");
    const contacts = await response.json();
    setContactsLoaded(true);
    contacts.results.sort((a, b) => {
      if (a.name.first < b.name.first) return -1;
      else if (a.name.first >= b.name.first) return 1;
    });
    setFetchedContacts(contacts.results);
  };
  const filterContact = (contact) => {
    switch (selectedFilter) {
      case "No filter":
        return true;
      case "First names that contain the letter 'e'":
        if (contact.name.first.includes("e")) {
          return true;
        } else {
          return false;
        }
      case "Older than 30":
        if (contact.dob.age > 30) {
          return true;
        } else {
          return false;
        }
      default:
        return true;
    }
  };

  if (contactsLoaded === false) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#663399"
          textContent={"Loading..."}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Picker
          style={{ width: 325, height: 50 }}
          selectedValue={selectedFilter}
          onValueChange={(newFilter) => setSelectedFilter(newFilter)}
        >
          {filters.map((item, index) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
        </Picker>
        <Button title="Fetch Contacts" onPress={() => fetchContacts()} />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={fetchedContacts.filter((contact) => filterContact(contact))}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <Text>{item.name.first}</Text>
                <Text>{item.location.country}</Text>
                <Text>{item.dob.age}</Text>
                <Button title="more info" onPress={() => onButtonPress(item)} />
              </View>
            );
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.page1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    fontSize: 20,
  },
  listItem: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-between",
    fontSize: 20,
    padding: 2,
    backgroundColor: "#ccc",
    borderColor: "purple",
    borderWidth: 1,
    marginVertical: 2,
  },
});
