import React, { useState} from "react";
import {Linking} from 'react-native'
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import data from "../../data/resturentData.json";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../../constants/theme";
import Rating from "../../components/rating";
import Carousel from "react-native-snap-carousel";

const TerrainDetails = ({navigation, route}) => {

    const [fav, setFav] = useState(false);
    const [days, setDays] = useState([
      { day: 'Monday', time: 'Closed'},
      { day: 'Tuesday', time: 'Closed'},
      { day: 'Wednesday', time: 'Closed'},
      { day: 'Thursday', time: 'Closed'},
      { day: 'Friday', time: 'Closed'},
      { day: 'Saturday', time: 'Closed'},
      { day: 'Sunday', time: 'Closed'},
  ]);

  const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  function setOpeningHours(data){
    data.forEach((val) => {
        const index = days.findIndex((x) => x.day === daysOfTheWeek[val.day]);
        const time = `${(val.start.substring(0,2))}:${(val.start.substring(2,4))} - ${(val.end.substring(0,2))}:${(val.start.substring(2,4))}`;

        if(days[index].time === 'Closed'){
            days[index].day = daysOfTheWeek[val.day];
            days[index].time = time
        } else if((days[index].time).length > 15 && data.length > 7){
            days[index].time = `${(days[index].time)}\n${time}`;
        }
    });

    return(
        days.map((val) => (
            <View>
                <View style={styles.line} />
                <View style={styles.row2}>
                    <Text style={styles.subTxt}>{val.day}</Text>
                    <Text style={styles.subTxt} >{val.time}</Text>
                </View>
            </View>
        ))
    )
}

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View style={styles.top}>
        <View style={styles.row}>
            <Text style={styles.name}>{route.params?.name}</Text>
            {
                data.is_claimed === true && (
                    <Icon name="check-decagram" size={20} color={COLORS.primary} />
                )
            }
        </View>
        <Text style={styles.address}>{`${route.params?.adresse}, ${route.params?.ville}`}</Text>
        <View style={styles.row}>
            <Rating count={data.rating} />
            <Text style={styles.subTxt}>({data.review_count} reviews)</Text>
        </View>
    </View>
    <View style={styles.line} />
    <View style={styles.row2}>
        <View style={styles.row}>
            <TouchableOpacity onPress={() => {
                setFav(!fav);
            }} style={styles.icon}>
                <Icon2 name={fav ? "heart-sharp" : "heart-outline"} size={20} color={ fav ? COLORS.primary : COLORS.title} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('maps://app?saddr=100+101&daddr='+`${route?.params?.lat}'+'${route?.params?.lng}`)} style={styles.icon}>
                <Icon2 name="map-outline" size={20} color={COLORS.title} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${route.params?.tel}`);}} style={styles.icon}>
                <Icon2 name="call-outline" size={20} color={COLORS.title} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={() => { navigation.navigate('Reservation', {
                                        id: route?.params?.id,
                                        name: route?.params?.name,
                                        images : route?.params?.images,
                                        adresse : route?.params?.adresse,

                                      }); }}
                                      style={styles.items}>
            <Text style={styles.text}>Book Now</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.line} />
    <Text style={styles.subtitle}>FEATURED IMAGES</Text>
    <View style={styles.imageConatiner}>
        <Carousel
            data={route?.params?.images}
            sliderWidth={SIZES.width}
            itemWidth={SIZES.width}
            loop
            firstItem={1}
            activeSlideOffset={0}
            autoplayInterval={8000}
            autoplay={true}
            renderItem={({item}) => <Image source={{uri: item}} style={styles.image}/>}
        /> 
    </View>
    <View>
        <Text style={styles.subtitle}>OPENING HOURS</Text>
        <View style={styles.hoursValuesContainer}>
            { setOpeningHours(data.hours[0].open) }
        </View>
    </View>
</ScrollView>
  )
}

export default TerrainDetails ;
