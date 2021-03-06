import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/*
Definition des "NeuerEintragButton", der sowohl in der KategorienAnsicht als auch im ZeitraumAnsicht benutzt wird.
 */
const NeuerEintragButton = ({route}) => {
    const navigation = useNavigation();
    return(

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.neuerEintragButton}
                onPress={() => {
                    navigation.navigate('Neuer Eintrag', {
                        previousScreen: route,
                    })
                }}>
                <Text style={{fontSize: 45, textAlign: 'center', color: 'white'}}>
                    +
                </Text>
            </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    neuerEintragButton: {
        width: 70,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        height: 70,
        elevation: 5,
        backgroundColor: '#595959',
    },
});

export default NeuerEintragButton;
