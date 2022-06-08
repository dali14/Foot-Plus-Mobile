import React from 'react' ;
import { StyleSheet, Text , View ,Image , TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' ;
import Home from '../Screen/home';
import Liste from '../Screen/liste';
import Login from '../Screen/login';
import Map from '../Screen/map';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginC from '../Screen/client/LoginC';
import LoginP from '../Screen/prop/LoginP';
import EspaceClient from '../Screen/client/EspaceClient';

import TerrainDetails from '../Screen/terrain/terrainDetails';
import EspacePt from '../Screen/prop/EspacePt';
import Reservation from '../Screen/terrain/reservation';

import RegisterC from '../Screen/client/registerC';
import ProfileEdit from '../Screen/client/ProfileEdit';
import ThnxY from '../Screen/thnxY';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const LoginStack = () => {
    return (
      <Stack.Navigator options={{headerShown: false}}>
        <Stack.Screen
          
          name="login"
          component={Login}
         
        />
        <Stack.Screen 
          
          name="RegisterC"
          component={RegisterC}
          options={({route}) => ({
            title: "Register",
          })}
        />
        <Stack.Screen
          name="LoginC"
          component={LoginC}
          options={({route}) => ({
            title: route.params?.title,
          })}
        />
        <Stack.Screen options={{headerShown: false}}
          name="EspaceClient"
          component={EspaceClient}
          
        />
        <Stack.Screen 
          name="ProfileEdit"
          component={ProfileEdit}
          
        />
        <Stack.Screen
          name="LoginP"
          component={LoginP}
          options={({route}) => ({
            title: route.params?.title,
          })}
        />
        <Stack.Screen
          name="EspacePt"
          component={EspacePt}
          options={({route}) => ({
            title: route.params?.title,
          })}
        />
      </Stack.Navigator>
    );
  };




  const MapStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}
          
          name="Map" 
          component={Map}
         
          
        />
        <Stack.Screen
          name="TerrainDetails"
          component={TerrainDetails}
          options={({route}) => ({
            title: route.params?.name,
            headerShown: false
            
          })}
        />
        <Stack.Screen options={{headerShown: false}}
          name="Reservation"
          component={Reservation}
         
        />
        <Stack.Screen options={{headerShown: false}}
          name="ThnxY"
          component={ThnxY}
         
        />
        <Stack.Screen options={{headerShown: false}}
          name="LoginC"
          component={LoginC}
         
        />
         <Stack.Screen options={{headerShown: false}}
          name="EspaceClient"
          component={EspaceClient}
         
        />
      </Stack.Navigator>
    );
  };


const CustomTabBarButton = ({children , onPress}) =>(

    <TouchableOpacity
        style={{
            top : -30 ,
            justifyContent: 'center',
            alignItems : 'center',
            ...styles.shadow

        }}
        onPress={onPress}

    >
        <View style={{
            width : 70 , 
            height : 70 ,
            borderRadius : 35,
            backgroundColor:'#e32f45'

        }}>
            {children}
        </View>

    </TouchableOpacity>

);
const Tabs = () => {

    return(
        <Tab.Navigator
             tabBarOptions={{
                showLabel : false,
                        style : {
                            position: 'absolute',
                            bottom:25 ,
                            left:20 ,
                            right: 20,
                            elevation: 0,
                            backgroundColor: '#ffffff',
                            borderRadius: 15,
                            height: 90,
                            ...styles.shadow
                        }

        }}
        
        >


            <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems : 'center' , justifyContent:'center', top : 10}}>
                        <Image 
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                   width : 25 ,
                                   height : 25 , 
                                   tintColor : focused ? '#e32f45' : '#748c94'
                                }}                
                                        />
                                        <Text>Home</Text>
                        
                    </View>

                ),
            }}/>
        

        <Tab.Screen 
            name="Map" 
            component={MapStack} 
            options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems : 'center' , justifyContent:'center', top : 10}}>
                        <Image 
                            source={require('../assets/icons/map.png')}
                            resizeMode='contain'
                            style={{
                                   width : 25 ,
                                   height : 25 , 
                                   tintColor : focused ? '#e32f45' : '#748c94'
                                }}                
                                        />
                                        <Text>Map</Text>
                        
                    </View>

                ),
            }}/>
               {/* <Tab.Screen name="LoginC" component={LoginC}
               options={{
                   tabBarIcon : ({focused}) =>(
                       <Image 

                       source={require('../assets/icons/ball.png')}
                            resizeMode='contain'
                            style={{
                                   width : 73 ,
                                   height : 73 , 
                                   
                                }}                
                       
                          /> 
                   ),
                   tabBarButton : (props)=> (
                       <CustomTabBarButton {...props} />
                   )
               }}
               /> */}
            <Tab.Screen 
            name="Liste" 
            component={Liste} 
            options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems : 'center' , justifyContent:'center', top : 10}}>
                        <Image 
                            source={require('../assets/icons/list.png')}
                            resizeMode='contain'
                            style={{
                                   width : 25 ,
                                   height : 25 , 
                                   tintColor : focused ? '#e32f45' : '#748c94'
                                }}                
                                        />
                                        <Text>Terrain</Text>
                        
                    </View>

                ),
            }}/>
            
            <Tab.Screen 
            name="Login" 
            component={LoginStack} 
                options={{
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={{alignItems : 'center' , justifyContent:'center', top : 10}} >
                            <Image 
                                source={require('../assets/icons/login.png')}
                                resizeMode='contain'
                                style={{
                                   width : 25 ,
                                   height : 25 , 
                                   tintColor : focused ? '#e32f45' : '#748c94'
                                }}                
                                        />
                            <Text>My Account</Text>
                        </View>

                ),
            }}/>

       


        </Tab.Navigator>


    );

}

    const styles = StyleSheet.create({
        shadow : {
            shadowColor : '#7F5DF0' , 
            shadowOffset:{
                        width: 0,
                        height :10 ,    
                    },
                    shadowOpacity: 0.25 , 
                    shadowRadius : 3.5 ,
                    elevation : 5 ,
        }

    })

export default Tabs;