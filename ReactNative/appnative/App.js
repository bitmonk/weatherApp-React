import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import About from "./About";

const { Navigator, Screen } = createNativeStackNavigator()

const App = ()=> {
    return(
        <NavigationContainer>
            <Navigator>
                <Screen name="Home" component={Home} />
                <Screen name="About" component={About} />
            </Navigator>
        </NavigationContainer>
    );
}
export default App
