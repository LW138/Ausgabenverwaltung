import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import KategorienAnsicht from '../screens/KategorieAnsicht';
import DetailListScreen from '../screens/DetailListScreen';
import NeuerEintrag from '../screens/NeuerEintrag';
import ZeitraumAnsicht from '../screens/ZeitraumAnsicht';
import BearbeitenAnsicht from '../screens/BearbeitenAnsicht';

const StackNavigator = createStackNavigator();
const StackCategoryNav = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleStyle: {fontSize: 24},
                headerStyle: {backgroundColor: '#efebe6'},
            }}>
            <StackNavigator.Screen name="Kategorie auswählen" component={KategorienAnsicht}/>
            <StackNavigator.Screen name="Neuer Eintrag" component={NeuerEintrag} />
            <StackNavigator.Screen name="Details" component={DetailListScreen} />
            <StackNavigator.Screen name="Bearbeiten" component={BearbeitenAnsicht} />

        </StackNavigator.Navigator>
    );
};

const StackTimespanNav = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleStyle: {fontSize: 24},
                headerStyle: {backgroundColor: '#efebe6'},
            }}>
            <StackNavigator.Screen name="Zeitraum auswählen" component={ZeitraumAnsicht}/>
            <StackNavigator.Screen name="Neuer Eintrag" component={NeuerEintrag} />
            <StackNavigator.Screen name="Details" component={DetailListScreen} />
            <StackNavigator.Screen name="Bearbeiten" component={BearbeitenAnsicht} />

        </StackNavigator.Navigator>
    );
};

export {StackCategoryNav, StackTimespanNav};
