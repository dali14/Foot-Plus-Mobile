import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Animated, ScrollView ,TextInput,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const style = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

export default function Maps({ navigation }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://172.20.10.5:3004/terrain/AllTerrain")
            .then((res) => res.json())
            .then((resJSON) => {
                console.log(resJSON)
                setData(resJSON);

            })
            .catch((err) => console.error(err));
    }, []);
    const navigations = async () => { navigation.navigate('addreservation') }
    const _scrollView = React.useRef(null);
    let mapAnimation = new Animated.Value(0);
    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  
       
      }
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 36.8065,
                    longitude: 10.1815,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {data.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: item.lat, longitude: item.lng }}
                        title='hello'
                        description='dali'
                        image={require('../assets/logom.png')}
                    >
                        <Callout tooltip>
                            <View>
                                <View style={styles.bubble}>
                                    <Text style={styles.name}>{item.nameTerrain}</Text>
                                    <Text>{item.price}</Text>

                                    <TouchableOpacity key={index} 
                                    onPress={() => { navigation.navigate('TerrainDetails', {
                                        id: item._id,
                                        name: item.nameTerrain,
                                        adresse: item.address,
                                        ville : item.ville,
                                        images : item.image,

                                      }); }}
                                     style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}
                                    >
                                        <Text style={[styles.textSign, {
                                                        color: '#FF6347'
                                                        }]}>View</Text>

                                    </TouchableOpacity>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item.image[0] }}
                                    />
                                </View>
                                <View style={styles.arrowBorder} />
                                <View style={styles.arrow} />

                            </View>
                        </Callout>
                    </Marker>

                ))}




            </MapView>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {data.map((item, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{ uri: item.image[0] }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{item.nameTerrain}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>{item.ville}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>Price :{item.price}</Text>
                            <Text numberOfLines={1} style={styles.cardDescription}>{item.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('TerrainDetails', {
                                        id: item._id,
                                        name: item.nameTerrain,
                                        adresse: item.address,
                                        ville : item.ville,
                                        images : item.image,

                                      }); }}
                                    style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#FF6347'
                                    }]}>Order Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                ))}
            </Animated.ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({

    map: {
        height: '100%'
    },
    image: {
        width: "100%",
        height: 80,
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
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
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }

});