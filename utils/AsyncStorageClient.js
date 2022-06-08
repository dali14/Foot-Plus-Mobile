import AsyncStorage from "@react-native-async-storage/async-storage";

export const getClientData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Token");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const getClientinfo = async (value) => {
  try {
    
    fetch("http://192.168.1.4:3004/api/details", {headers: {"x-access-token": JSON.stringify(value)}})
            .then(res => res.json())
            .then(res => {
               AsyncStorage.setItem("iduser", res);
                return {res} ;
            })
    
  } catch (e) {
    console.log(e);
  }
};
export const updateClientData = async (data) => {
  return AsyncStorage.setItem('Token', JSON.stringify(data));
}
export const storeClientData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("Token", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  export const LogoutClient = async (token) => {
    try {
      await AsyncStorage.removeItem("Token");
     
    } catch (e) {
      console.log(e);
    }
  };