import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import Tabs from './navigation/tabs';
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <NavigationContainer>
        <Tabs />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
