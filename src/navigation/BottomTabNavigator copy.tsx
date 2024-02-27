import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from '@/constants';
import Icon from '@/components/shared/Icons';
import { useNavigationContainerRef } from '@react-navigation/native';
import { HomeScreen, TabScreen } from '@/screens';
import { GenericTouchableOpacity, GenericView } from '@/assets/css';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {


    const barColors = {
        home: colors.black,
        tab: colors.black
    };

    const [tab, setTab] = React.useState<keyof typeof barColors>('home');
    const navRef = useNavigationContainerRef();
    React.useEffect(() => {
        const unsubscribe = navRef.addListener('state', () => {
            const currRoute = navRef.getCurrentRoute();
            if (currRoute) {
                // A work-around to set background color for the bar after the ripple
                // effect completes. The 200 ms delay comes from trial and error
                setTimeout(() => setTab(currRoute.name as keyof typeof barColors), 200);
            }
        });
        return unsubscribe;
    });


    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            shifting={false} // Bu, tüm tab'ların etiketlerinin her zaman görünür olmasını sağlar.
            activeColor={colors.black} // Aktif tab'ın etiketi ve ikonu için renk
            inactiveColor={colors.darkGray} // Pasif tab'ların etiketi ve ikonu için renk (Eğer destekleniyorsa)
            barStyle={{
                backgroundColor: colors.white,
                /* borderTopLeftRadius: 20,
                borderTopRightRadius: 20, */
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
            }}

        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarColor: barColors.home,
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
                    tabBarIcon: ({ focused }) => (
                        <GenericTouchableOpacity
                            style={{
                                position: 'absolute',
                                top: -30, // Butonu yukarı çekmek için negatif bir değer
                                width: 60, // Buton genişliği
                                height: 60, // Buton yüksekliği
                                borderRadius: 30, // Dairesel buton için
                                justifyContent: 'center', // İçerik ortalamak için
                                alignItems: 'center', // İçerik ortalamak için
                                backgroundColor: 'red', // Butonun arka plan rengi
                            }}
                        >
                            <GenericView>
                                <Icon name="plus" size={28} color={colors.white} type='FontAwesome5' />
                            </GenericView>
                        </GenericTouchableOpacity>
                    )
                }}
            />
            <BottomTab.Screen
                name="TabScreen"
                component={TabScreen}
                options={{
                    tabBarColor: barColors.tab,
                    tabBarLabel: 'DAHA CÜZDAN',
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Icon name="star" size={28} color={focused == true ? colors.black : colors.darkGray} type='FontAwesome5' />
                        </>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

function EmptyScreen() {
    return null;
}