import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import About from "./About";
import { Button } from "react-native";
import Blogs from "./Blogs";

const { Navigator, Screen } = createNativeStackNavigator()

const App = ()=> {
    return(
        <NavigationContainer>
            <Navigator>
                <Screen name="Home" component={Home} options={{
                    headerTitle : "OG Home",
                    headerRight : ()=> <Button title="Login" />
                }} />
                <Screen name="About" component={About} />
                <Screen name="Blogs" component={Blogs} />
            </Navigator>
        </NavigationContainer>
    );
}
export default App
