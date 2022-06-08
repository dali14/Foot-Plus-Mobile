import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState , useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity,FlatList, View ,ScrollView } from 'react-native';
import profile from '../../assets/profile.png';
import { getClientData, getClientinfo, LogoutClient  , updateClientData} from "../../utils/AsyncStorageClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Tab ICons...
import home from '../../assets/home.png';
import bookC  from '../../assets/booking-confirmed.png'
import bookR  from '../../assets/bookOnReview.png'
import bookA from '../../assets/booking-cancel.png'
import settings from '../../assets/settings.png';
import mesresrvations from '../../assets/l.png'
import logout from '../../assets/logout.png';
// Menu
import menu from '../../assets/menu.png';
import close from '../../assets/close.png';
// import Liste_stas from './liste';
export default function EspaceClient({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");
  const [id ,setId ] = useState(null);
  const [ username, setUsername] = useState(null);
   // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  
const[client, setClient]=useState('')
const [reservations, setReservations] = useState(null) 

useEffect(async () => {
  setClient(await getClientData());
  return client 
}, []);

useEffect(() => {
  
  // const response = await fetch("http://172.20.10.5:3004/reservation").then((res) => res.json()).then((res) => setReservations(res.filter((reservation) => reservation.user_id == user_id)))
  if(id != null){
    fetch("http://172.20.10.5:3004/reservation").then((res) => res.json()).then((res) => setReservations(res.filter(item => item.id_user == id)))
  }
}, [id])


useEffect( async () => {
  const token = await AsyncStorage.getItem("Token")

  console.log(JSON.parse(token))
  if (token) {
    fetch("http://172.20.10.5:3004/api/details", { headers: { "x-access-token": JSON.parse(token) } })
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
  return (
    <>
    {client  != undefined ?
    <SafeAreaView style={styles.container}>
<ScrollView style={styles.s}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 15
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{client?.accessToken}</Text>

        <TouchableOpacity onPress={() => {navigation.navigate("profile")}}>
          <Text style={{
            marginTop: 6,
            color: '#FFBF66'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 30 }}>
          {
            // Tab Bar Buttons....
          }

          <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
    <TouchableOpacity onPress={() => {navigation.navigate("liste")}}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'white',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={home} style={{
          width: 25, height: 25,
          tintColor: "#4682b4"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "#4682b4"
        }}>Home</Text>

      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
       navigation.navigate('ProfileEdit');
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={settings} style={{
          width: 25, height: 25,
          tintColor: "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>Settings</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {navigation.navigate("mesreservation")}}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={mesresrvations} style={{
          width: 25, height: 25,
          tintColor: "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>Mes reservations</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
         LogoutClient()
         // pour tester que  async storage est vide
         navigation.navigate('LoginC')

          }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={logout} style={{
          width: 25, height: 25,
          tintColor: "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: "white"
        }}>logout</Text>
      </View>
    </TouchableOpacity>
    </TouchableOpacity>

        </View>

        

      </View>
      
      </ScrollView>
      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 25,
              height: 25,
              tintColor: '#4A919E',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>
          <Text style={{
          fontSize:18 , 
          fontWeight:"bold",
          marginBottom:15,
          marginTop:30,
          color:'black',
          
        }}>Liste des Reservation {client?.accessToken}</Text>
          {/* <ScrollView  horizontal={true} >
            {reservations != null ? (<View>
              <ScrollView vertical>
              {reservations.map((reservation) => (  
                <TouchableOpacity >
                <View style={styles.timeContainer}>
                  <Text style={{ color: '#707070' }}>Date : {reservation.dateD}</Text>
                  <View style={styles.freeArea}>
                    <Text style={{ color: '#707070' }}>Etat : {reservation.etat}</Text>
                    {
                    reservation.etat =="Confirmed" ? <View style={[styles.radio, { backgroundColor: 'green' }]}></View>
                    :reservation.etat =="reviwe" ? <View style={[styles.radio, { backgroundColor: 'yellow' }]}></View>
                    :<View style={[styles.radio, { backgroundColor: 'red' }]}></View>
                    }
                    

                  </View>
                </View>
              </TouchableOpacity>
                
              ))}
              </ScrollView>
            </View>) : <Text>Loading</Text>}
          </ScrollView> */}
              <View style={StyleSheet.container}>
              <FlatList
                data={reservations}
                  renderItem={({ item }) => {
                    return (
                      <>
                  
                          <View
                             style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  backgroundColor: "#E0F2F7",
                                  marginBottom: 10,
                                  marginTop: 10,
                                  borderRadius: 10,
                                  backgroundColor: "#fff",
                                  shadowColor: "#000",
                                  shadowOffset: {
                                    width: 0,
                                    height: 10,
                                  },
                                  shadowOpacity: 0.3,
                                  shadowRadius: 20,
                                  padding: 10,
                                  marginStart: 7,
                                  marginEnd: 8

                                    }}
                            >
                               

                  {item.etat =="Confirmed" ? 
                    <Image
                      source={bookC}
                      style={{ width: 80, height: 70, margin: 5 }}
                  ></Image>
                      :item.etat =="Confirmed" ? <Image
                        source={bookR}
                        style={{ width: 80, height: 70, margin: 5 }}
                    ></Image>
                :
                      <Image
                          source={bookA}
                          style={{ width: 80, height: 70, margin: 5 }}
                      ></Image>
                }
                    
                    <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
                      <Text style={styles.WrapText}>Nom  : {item.name}</Text>
                      <Text>Date : {item.dateD}</Text>
                      
                      <Text>Etat :{item.etat}</Text>
                      <Text>Prix :{item.prix}</Text>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate('DetailClient', {
                           id: item._id,
                           etat: item.etat,
                           prix :item.prix,
                           nom: item.name,
                           date: item.dateD,
                           prixpayant : item.prixPayant,

                        });
                      }} style={styles.btnLogin}>
                        <Text style={styles.TextBtn}>View</Text>

                      </TouchableOpacity>

                    </View>
                    <View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#F0F0F0",
                    }}
                  ></View>
                </>
              );
            }}
          />
        
      </View>


        </Animated.View>

      </Animated.View>
     

    </SafeAreaView>
: null}
</>

  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {


LogoutUser(station.data.token)

     
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#4682b4" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#4682b4" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A919E',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  btnLogin: {
    width: 90,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#0594D0',
    justifyContent: 'center',
    marginTop: 10,
    marginStart: 45
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
});
