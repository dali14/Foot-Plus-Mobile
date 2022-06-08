import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
const { width: WIDTH } = Dimensions.get('window')
export default function ThnxY({ navigation }) {
  
    return (
        <>
        <View style={StyleSheet.container}>
          
                <Text> Thnx Y </Text>
          
          
        </View>
        </>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  WrapText: {
    flex: 1,
    marginLeft: 23,
    justifyContent: "center",
    fontWeight: 'bold',
    fontSize: 15
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
