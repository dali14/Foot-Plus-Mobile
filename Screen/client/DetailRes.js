import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Button, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { getClientData, updateClientData } from "../../utils/AsyncStorageClient";
import profl from '../../assets/cl.png'
export default function DetailRes({ navigation }) {
  useEffect(async () => {
    const data = await getClientData();
    setClient(data);

    setNum_tel(data.data.utilisateur.Token)
    setAdr(data.data.utilisateur.Adr)

    console.log(client)
  }, []);
  return (
    <>
      {client != undefined ?
        <ScrollView>

          <View style={styles.logoContainer}>
            <Image source={profl} style={styles.logo} />

          </View>
          <View style={styles.container1}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 15,
              marginTop: 10
            }}> Profil </Text>
            <View style={styles.wrapper}>



              <TextInput
                style={styles.input}
                defaultValue={client?.data?.utilisateur.Num_tel}
                placeholder="Nouvelle  Numéro de téléphone"
                onChangeText={text => setNum_tel(text)}

              />


              <TextInput
                style={styles.input}
                defaultValue={client?.data?.token}
                placeholder="Nouvelle Email"
                onChangeText={text => setEmail(text)}


              />

              <TouchableOpacity style={styles.btnLogin} onPress={() => {
                editProfile()
              }}>
                <Text style={styles.TextBtn}>update</Text>

              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

        : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
    marginTop: 20
  },
  input: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 0,
    marginTop: 10
  },
  logoContainer: {
    alignItems: 'center'
  },
  btnLogin: {
    width: 250,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#4A919E',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
});