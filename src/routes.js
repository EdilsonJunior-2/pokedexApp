import Pokedex from "./pages/pokedex";
import Pokemon from "./pages/pokemon";
import Types from "./pages/types";
import SpecificType from "./pages/specificType";

import { createAppContainer } from "react-navigation";
import {  createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator} from "react-navigation-tabs";

/*
createBottomTabNavigator({
        Main,
        Pokemon
    })
    */

const Routes = createAppContainer(
    createBottomTabNavigator({
        Pokedex: createStackNavigator({
            Pokedex,
            Pokemon
        }, {
            defaultNavigationOptions:{
                header: null
            }
        }),
        Types: createStackNavigator({
            Types,
            SpecificType
        }, {
            defaultNavigationOptions:{
                header: null
            }
        })
    }
   
));

export default Routes;