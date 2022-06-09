import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';

import CardList from '../components/CardList';
import zeitraeume from '../data/Zeitraeume';

const ZeitraumAnsicht = ({route, navigation}) => {
    return (
        <View style={styles.style}>
            <CardList screen={'Details'} data={zeitraeume} />
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.neuerEintragButton}
                onPress={() =>
                    navigation.navigate('Neuer Eintrag', {
                        previousScreen: route.name,
                    })
                }>
                <Text style={{fontSize: 45, textAlign: 'center', color: 'black'}}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    style: {
        height: Dimensions.get('window').height - 50,
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    neuerEintragButton: {
        backgroundColor: '#efebe6',
        width: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        height: 60,
        elevation: 5,
        zIndex: -999,
    },
});

export default ZeitraumAnsicht;
