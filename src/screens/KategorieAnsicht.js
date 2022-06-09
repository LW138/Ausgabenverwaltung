import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
import CardList from '../components/CardList';
import kategorien from '../data/Kategorien';


let array = [];
const KategorienAnsicht = ({route, navigation}) => {
    const [counter, setCounter] = React.useState(0);

    sortbyKategorie('Freizeit');
    sortByTime('Gesamt');
    countKategorieEntry();

    return (
        <View style={styles.container}>
            <CardList screen={'Details'} data={kategorien} />
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
    container: {
        height: Dimensions.get('window').height - 50,
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

export default KategorienAnsicht;

function countKategorieEntry() {
    let hausCounter = 0;
    let reisenCounter = 0;
    let sparenCounter = 0;
    let freizeitCounter = 0;

    for (let j = 0; j < array.length; j++) {
        if (array[j].kategorie == 'Haushalt') {
            hausCounter++;
        }
        if (array[j].kategorie == 'Sparen') {
            sparenCounter++;
        }
        if (array[j].kategorie == 'Reisen') {
            reisenCounter++;
        }
        if (array[j].kategorie == 'Freizeit') {
            freizeitCounter++;
        }
    }

    kategorien[0].anzahl = sparenCounter;
    kategorien[1].anzahl = hausCounter;
    kategorien[2].anzahl = freizeitCounter;
    kategorien[3].anzahl = reisenCounter;
}

function sortbyKategorie(titel) {
    let showElements = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].kategorie == titel) {
            showElements.push(array[i]);
        }
    }
    return showElements;
}

function sortByTime(titel) {
    let showElements = [];
    let current_date = new Date();
    if (titel === 'Gesamt') {
        showElements = array;
    } else {
        for (let i = 0; i < array.length; i++) {
            let item_date = new Date(array[i].datum);
            let compare1 = new Date(
                current_date.getFullYear(),
                current_date.getMonth(),
                current_date.getDate(),
            );
            let compare2 = new Date(
                item_date.getFullYear(),
                item_date.getMonth(),
                item_date.getDate(),
            );

            var millisecondsPerDay = 1000 * 60 * 60 * 24;
            var millisBetween = compare2.getTime() - compare1.getTime();
            var days = millisBetween / millisecondsPerDay;
            days = Math.floor(days);
            if (titel == 'Woche' && days > -8 && days <= 0) {
                showElements.push(array[i]);
            } else if (titel == 'Monat' && days > -32 && days < -7) {
                showElements.push(array[i]);
            } else if (titel == 'Jahr' && days > -366) {
                showElements.push(array[i]);
            }
        }
    }
    return showElements;
}
