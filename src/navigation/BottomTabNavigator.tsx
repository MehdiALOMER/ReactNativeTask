import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '@/constants';
import Icon from '@/components/shared/Icons';
import { HomeScreen, TabScreen } from '@/screens';
import { GenericTouchableOpacity, GenericView } from '@/assets/css';


const BottomTab = createBottomTabNavigator();



export default function BottomTabNavigator() {

    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                /* tabBarShowLabel: false, */
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: colors.darkGray,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,
                    elevation: 13,
                    /* position: 'absolute',
                    bottom: 30,
                    marginHorizontal: 20, */
                }
            }}

        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarActiveTintColor: colors.black,
                    tabBarLabel: 'KEŞFET',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="compass" size={28} color={focused == true ? colors.black : colors.grayDark} type='FontAwesome5' />
                    )
                }}
            />
            <BottomTab.Screen
                name="EmptyScreen"
                component={EmptyScreen}
                options={{
                    tabBarLabel: '',
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: 30,
                        marginHorizontal: 20,
                    },
                    tabBarIcon: ({ focused }) => (
                        <GenericTouchableOpacity
                            style={{
                                position: 'absolute',
                                top: -15, // Butonu yukarı çekmek için negatif bir değer
                                width: 60, // Buton genişliği
                                height: 60, // Buton yüksekliği
                                borderRadius: 20, // Dairesel buton için
                                justifyContent: 'center', // İçerik ortalamak için
                                alignItems: 'center', // İçerik ortalamak için
                                backgroundColor: 'white', // Butonun arka plan rengi
                                borderWidth: 3,
                                borderLeftColor: 'red',
                                borderRightColor: 'yellow',
                                borderTopColor: 'green',
                                borderBottomColor: 'orange',
                            }}
                        >
                            <GenericView>
                                <Icon name="plus" size={28} color={'red'} type='FontAwesome5' />
                            </GenericView>
                        </GenericTouchableOpacity>
                    )
                }}
            />
            <BottomTab.Screen
                name="TabScreen"
                component={TabScreen}
                options={{
                    tabBarActiveTintColor: colors.black,
                    tabBarLabel: 'DAHA CÜZDAN',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="star" size={28} color={focused == true ? colors.black : colors.darkGray} type='FontAwesome5' />
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

function EmptyScreen() {
    return null;
}