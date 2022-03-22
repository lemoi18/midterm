import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// Using DB Reference
import { db } from "./Core/Config";
import { Dropdown } from "./Component/Dropdown.js";
import { TouchableOpacity } from "react-native-web";
import { Calender } from "./Component/Calender";
import alert from "react-native-web/dist/exports/Alert";

export default function App() {
  // Storing User Data
  const [userDoc, setUserDoc] = useState(null);
  // Update Text
  const [text, setText] = useState("");

  // For Dropdown menu
  const [location, setLocation] = useState("");
  const [apidate, setApiDate] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // MARK: CRUD Functions
  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "MyCollection", "MyDocument");

    // Your Document Goes Here
    const docData = {
      name: "iJustine",
      bio: "YouTuber",
    };

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Document Created!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Updated Successfully!");
        setText("");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Deleted Successfully!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const location_data = [
    { label: "Grimstad", lat: 58.3388944863743, lon: 8.579716794017456 },
    { label: "Kristiansand", lat: 58.136985, lon: 7.9997332 },
  ];

  const day_data = [
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
    { label: "6" },
    { label: "7" },
    { label: "8" },
    { label: "9" },
    { label: "10" },
    { label: "11" },
    { label: "12" },
    { label: "13" },
    { label: "14" },
    { label: "15" },
    { label: "16" },
    { label: "17" },
    { label: "18" },
    { label: "19" },
    { label: "20" },
    { label: "21" },
    { label: "22" },
    { label: "23" },
    { label: "24" },
    { label: "25" },
    { label: "26" },
    { label: "27" },
    { label: "28" },
    { label: "29" },
    { label: "30" },
    { label: "31" },
  ];

  const time_data = [
    { label: "00:00" },
    { label: "01:00" },
    { label: "02:00" },
    { label: "04:00" },
    { label: "05:00" },
    { label: "06:00" },
    { label: "07:00" },
    { label: "08:00" },
    { label: "09:00" },
    { label: "10:00" },
    { label: "11:00" },
    { label: "12:00" },
    { label: "13:00" },
    { label: "14:00" },
    { label: "15:00" },
    { label: "16:00" },
    { label: "17:00" },
    { label: "18:00" },
    { label: "19:00" },
    { label: "20:00" },
    { label: "21:00" },
    { label: "22:00" },
    { label: "23:00" },
  ];

  const date = [
    { label: "January" },
    { label: "February" },
    { label: "March" },
    { label: "April" },
    { label: "May" },
    { label: "June" },
    { label: "July" },
    { label: "August" },
    { label: "September" },
    { label: "October" },
    { label: "November" },
    { label: "December" },
  ];

  useEffect(() => {
    console.log(time, "changed");
  }, [time]);

  useEffect(() => {
    console.log(day, "changed");
  }, [day]);

  useEffect(() => {
    console.log(month, "changed");
  }, [month]);

  useEffect(() => {
    console.log(location, "changed");
  }, [location]);

  useEffect(() => {
    console.log(time, "changed");
    const date =
      month.label + ` ` + day.label + `, ` + `2022` + ` ` + time.label;

    setApiDate(new Date(date));
    console.log(date);
    console.log(apidate);
  }, [time]);

  return (
    <View style={styles.container}>
      <Dropdown
        label="Select Location"
        data={location_data}
        onSelect={setLocation}
      />
      <Dropdown label="Select Month" data={date} onSelect={setMonth} />
      <Dropdown label="Select Day" data={day_data} onSelect={setDay} />
      <Dropdown label="Select Time" data={time_data} onSelect={setTime} />
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
});
