import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackCategoryNav, StackTimespanNav} from './StackNavigator';
import {useNavigation,} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({

                tabBarShowLabel: false,
                headerShown: false,
                tabBarInactiveBackgroundColor: '#efebe6',
                tabBarActiveBackgroundColor: '#595959',

            })}>
            <Tab.Screen
                name="KategorienStack"
                component={StackCategoryNav}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../../res/img/img_1.png')}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,

                            }}
                            tintColor={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="ZeitraumStack"
                component={StackTimespanNav}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('../../res/img/planner.png')}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                            }}
                            tintColor={focused ? 'white' : 'black'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
