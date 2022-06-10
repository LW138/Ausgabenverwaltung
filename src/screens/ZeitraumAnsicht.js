import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import CardList from '../components/CardList';
import zeitraeume from '../data/Zeitraeume';
import {getCompleteData} from '../backend/DataProcessing';

const ZeitraumAnsicht = ({route, navigation}) => {
    const [counter, setCounter] = useState(0)
    const isFocused = useIsFocused();
    useEffect(() => {
        countEntriesPerTimespan()
    }, [isFocused]);

    const countEntriesPerTimespan = () => {
        zeitraeume[0].anzahl = 0
        zeitraeume[1].anzahl = 0
        zeitraeume[2].anzahl = 0
        zeitraeume[3].anzahl = 0
        zeitraeume[0].betrag = 0
        zeitraeume[1].betrag = 0
        zeitraeume[2].betrag = 0
        zeitraeume[3].betrag = 0
        getCompleteData().then(arrayback => {
            arrayback.forEach(item => {
                let current_date = new Date();
                let compare1 = new Date(
                    current_date.getFullYear(),
                    current_date.getMonth(),
                    current_date.getDate(),
                );
                let item_date = item.datum.split(".")
                let compare2 = new Date(item_date[2], item_date[1]-1, item_date[0])
                var millisecondsPerDay = 1000 * 60 * 60 * 24;
                var millisBetween = compare2.getTime() - compare1.getTime();
                var days = millisBetween / millisecondsPerDay;
                days = Math.floor(days);
                if (days >= -7 && days <= 0) {
                    zeitraeume[0].anzahl = zeitraeume[0].anzahl + 1;
                    zeitraeume[0].betrag = zeitraeume[0].betrag + parseInt(item.betrag);
                }
                if(days >= -31 && days <=0) {
                    zeitraeume[1].anzahl = zeitraeume[1].anzahl + 1;
                    zeitraeume[1].betrag = zeitraeume[1].betrag + parseInt(item.betrag);
                }
                if (days >= -365) {
                    zeitraeume[2].anzahl = zeitraeume[2].anzahl + 1;
                    zeitraeume[2].betrag = zeitraeume[2].betrag + parseInt(item.betrag);
                }
                zeitraeume[3].anzahl = zeitraeume[3].anzahl + 1;
                zeitraeume[3].betrag = zeitraeume[3].betrag + parseInt(item.betrag);
            });
            setCounter(counter+1);
            });
    }
    return (
        <View style={styles.style}>
            <View style={{marginBottom: 155}}>
                <CardList detailScreen={'Details'} data={zeitraeume} typ={"Zeitraum"} />
            </View>
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
    neuerEintragButton: {
        backgroundColor: '#efebe6',
        width: 70,
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        height: 70,
        elevation: 5,
    },
});

export default ZeitraumAnsicht;
