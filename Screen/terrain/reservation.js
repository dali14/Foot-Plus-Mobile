import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { getClientData } from "../../utils/AsyncStorageClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Reservation = ({ navigation, route }) => {
  const [token, setToken] = useState(null);
  const [idTerrain, setIdTerrain] = useState('');
  const [clientinfo, setClientinfo] = useState([]);
  const [loading, setLoading] = useState(false);


  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [heurDebut, setHeurDebut] = useState('');
  const [heurFin, setHeurFin] = useState('');

  const date = new Date().getDate();
  const dateF = moment().format("ddd");
  const dateT = moment().add(1, 'days').format("ddd");
  const dateT1 = moment().add(2, 'days').format("ddd");
  const dateT2 = moment().add(3, 'days').format("ddd");
  const dateT3 = moment().add(4, 'days').format("ddd");
  const dateT4 = moment().add(5, 'days').format("ddd");
  const dateT5 = moment().add(6, 'days').format("ddd");

  const dateG = moment().format("YYYY-MM-DD");
  const dateG1 = moment().add(1, 'days').format("YYYY-MM-DD");
  const dateG2 = moment().add(2, 'days').format("YYYY-MM-DD");
  const dateG3 = moment().add(3, 'days').format("YYYY-MM-DD");
  const dateG4 = moment().add(4, 'days').format("YYYY-MM-DD");
  const dateG5 = moment().add(5, 'days').format("YYYY-MM-DD");
  const dateG6 = moment().add(6, 'days').format("YYYY-MM-DD");

  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);

  const isFocused = useIsFocused()




  const handleAddReservation = () => { 

    fetch("http://172.20.10.5:3004/reservation", {
      method: "post",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        name: username,
        id_Terrain: route.params?.id,
        dateD: dateDebut + 'T' + heurDebut,
        dateF: dateFin + 'T' + heurFin,
        duree: 150,
        etat: "NoNConfirmed",
        prix: 50,
        prixPayant: 0,
        id_user: id
      }
      )
    }).then(res => res.json())
      .then((res) => {
        console.log(res)
        navigation.navigate("ThnxY")
      }


      )
      .catch((err) => { console.warn(err) })
  }

  useEffect(() => {
    setToken(getClientData())
    setIdTerrain(route.params?.id);
    if (token != "") {
      setLoading(false);
      console.log("hello")

      console.log(clientinfo)
    }

  }, []);



  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else {

    const [state, setState] = useState({
      categes: [
        { cat_id: '1', day: date, daych: dateF, days: dateG, backgroundcolor: '#C7CBCF' },
        { cat_id: '2', day: date + 1, daych: dateT, days: dateG1, backgroundcolor: '#C7CBCF' },
        { cat_id: '3', day: date + 2, daych: dateT1, days: dateG2, backgroundcolor: '#C7CBCF' },
        { cat_id: '4', day: date + 3, daych: dateT2, days: dateG3, backgroundcolor: '#C7CBCF' },
        { cat_id: '5', day: date + 4, daych: dateT3, days: dateG4, backgroundcolor: '#C7CBCF' },
        { cat_id: '6', day: date + 5, daych: dateT4, days: dateG5, backgroundcolor: '#C7CBCF' },
        { cat_id: '7', day: date + 6, daych: dateT5, days: dateG6, backgroundcolor: '#C7CBCF' },
      ],
      change: false,
    });
    const [stateh, setStateh] = useState({
      categes: [
        { cat_id: '1', heurD: "08:00", heurF: "09:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '2', heurD: "09:30", heurF: "11:00", backgroundcolor: '#C7CBCF' },
        { cat_id: '3', heurD: "11:00", heurF: "12:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '4', heurD: "12:30", heurF: "14:00", backgroundcolor: '#C7CBCF' },
        { cat_id: '5', heurD: "14:00", heurF: "15:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '6', heurD: "15:30", heurF: "17:00", backgroundcolor: '#C7CBCF' },
        { cat_id: '7', heurD: "17:00", heurF: "18:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '8', heurD: "18:30", heurF: "20:00", backgroundcolor: '#C7CBCF' },
        { cat_id: '9', heurD: "20:00", heurF: "21:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '10', heurD: "21:30", heurF: "23:30", backgroundcolor: '#C7CBCF' },
        { cat_id: '11', heurD: "23:00", heurF: "00:30", backgroundcolor: '#C7CBCF' },

      ],
      change: false,
    });



    const changeBackground = item => {

      let categes = JSON.parse(JSON.stringify(state.categes));
      console.log(item);
      setDateDebut(item.days);
      setDateFin(item.days);
      for (let x = 0; x < state.categes.length; x++) {
        if (state.categes[x].cat_id == item.cat_id) {
          categes[x].backgroundcolor = '#0000FF';

          setState({
            categes: categes,
          });
        } else {
          categes[x].backgroundcolor = '#C7CBCF';

          setState({
            categes: categes,
          });
        }
      }
    };

    const changeBackgroundT = item => {
      let categes = JSON.parse(JSON.stringify(stateh.categes));
      console.log(item);
      console.log(idTerrain)

      for (let x = 0; x < stateh.categes.length; x++) {
        if (stateh.categes[x].cat_id == item.cat_id) {
          categes[x].backgroundcolor = '#0000FF';
          setHeurDebut(item.heurD);
          setHeurFin(item.heurF);
          setStateh({
            categes: categes,
          });
        } else {
          categes[x].backgroundcolor = '#C7CBCF';
          setStateh({
            categes: categes,
          });
        }


      };
      setHeurDebut(item.heurD);
      setHeurFin(item.heurF);
      console.log(dateDebut + 'T' + heurDebut);
      console.log(dateFin + 'T' + heurFin);
    }

    useEffect(() => {
      console.log(dateDebut + 'T' + heurDebut);
      console.log(dateFin + 'T' + heurFin);
    }, [heurDebut, heurFin])

    useEffect(async () => {
      const token = await AsyncStorage.getItem("Token")

      console.log(JSON.parse(token))
      if (token) {
        const userInfo = await fetch("http://172.20.10.5:3004/api/details", { headers: { "x-access-token": JSON.parse(token) } })
          .then((res) => res.json())
          .then((res) => {
            setId(res._id)
            setUsername(res.name)
          })
      } else {
        navigation.navigate("LoginC")
      }
      console.log("//////////////////////////")
      console.log({ user: JSON.stringify(user) })
      console.log("//////////////////////////")
    }, [])

    useEffect(() => {
      console.log({ name: username })
      console.log({ id: id })
      console.log(username, id)
    }, [id, username])

    useEffect(() => {
      if (isFocused) {
        if (token == "undefined") {
          navigation.navigate("LoginC")
        }
      }
    }, [token])

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.productContainer}>
          <View style={styles.image}>
            <Image source={{ uri: route.params?.images[0] }} style={{
              width: 70
              , height: 70, marginRight: 20
            }} />
          </View>
          <View>
            <Text style={styles.productName}>{route.params?.name}</Text>
            <Text style={styles.productName}>{route.params?.id}</Text>
            <Text style={styles.productDesc}>{route.params?.adresse}</Text>
          </View>
        </View>

        <Text style={styles.titleCat}>Book a Slot</Text>



        <View style={{ height: 80, marginTop: 20, marginBottom: 20 }}>

          <ScrollView horizontal style={styles.scrollView} >
            {state.categes.map((item, key) => (
              <TouchableOpacity
                style={[styles.dataBox, { backgroundColor: item.backgroundcolor }]}
                onPress={() => changeBackground(item)}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{item.day}</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>{item.daych}</Text>
              </TouchableOpacity>
            ))}

          </ScrollView>


        </View>
        <Text style={[styles.titleCat, { fontSize: 15, marginBottom: 10 }]}>Time Schedule </Text>
        <View style={{ height: 300 }}>

          <ScrollView vertical>
            {stateh.categes.map((item, key) => (
              <TouchableOpacity onPress={() => changeBackgroundT(item)}>
                <View style={styles.timeContainer}>
                  <Text style={{ color: '#707070' }}>{item.heurD}  -  {item.heurF}</Text>
                  <View style={styles.freeArea}>
                    <Text style={{ color: '#707070' }}>Free</Text>
                    <View style={[styles.radio, { backgroundColor: item.backgroundcolor }]}></View>

                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>

        <View style={styles.buttonArea} >
          <TouchableOpacity style={styles.button} onPress={() => {
            handleAddReservation()
          }}>
            <Text> ConFirme</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 30,
    paddingVertical: 30,

  },
  productContainer: {

    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#7D8392',
    borderBottomWidth: 1,
    marginBottom: 20

  },
  image: {


    justifyContent: 'center',


  },
  productName: {
    fontWeight: 'bold',
    color: '#7D8392',
    fontSize: 18
  },
  productDesc: {
    color: '#7D8392',
    fontSize: 13

  },

  dataBox: {
    height: 73,
    width: 63,
    borderWidth: 1,
    borderColor: '#C7CBCF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15

  },
  scrollView: {

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleCat: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 20

  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderColor: '#DBE3EB',
    borderBottomWidth: 1,
    paddingBottom: 5
  },

  freeArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radio: {
    height: 20,
    width: 20,
    borderColor: '#7D8392',
    borderWidth: 1,
    borderRadius: 30,
    marginLeft: 10,

  },
  buttonArea: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
    height: 100,

    borderRadius: 10
  },
  button: {
    height: 55,
    width: '100%',
    backgroundColor: '#f52d56',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
})


export default Reservation;