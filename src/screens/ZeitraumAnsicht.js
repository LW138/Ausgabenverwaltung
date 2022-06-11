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
import NeuerEintragButton from '../components/NeuerEintragButton';

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
        zeitraeume[4].anzahl = 0
        zeitraeume[0].betrag = 0
        zeitraeume[1].betrag = 0
        zeitraeume[2].betrag = 0
        zeitraeume[3].betrag = 0
        zeitraeume[4].betrag = 0
        getCompleteData().then(arrayback => {
            arrayback.forEach(item => {
                //inspirated from stackoverflow in the next 12 lines
                let current_date = new Date();
                let compare1 = new Date(
                    current_date.getFullYear(),
                    current_date.getMonth(),
                    current_date.getDate(),
                );

                let compare2 = new Date(item.datum)
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
                if (days > 0) {
                    zeitraeume[3].anzahl = zeitraeume[3].anzahl + 1;
                    zeitraeume[3].betrag = zeitraeume[3].betrag + parseInt(item.betrag);
                }
                zeitraeume[4].anzahl = zeitraeume[4].anzahl + 1;
                zeitraeume[4].betrag = zeitraeume[4].betrag + parseInt(item.betrag);
            });
            setCounter(counter+1);
            });
    }
    return (
        <View style={styles.container}>
                <CardList detailScreen={'Details'} data={zeitraeume} typ={"Zeitraum"} />
            <View style={{position: 'absolute', left: WIDTH/2-35, bottom: 5}}>
                <NeuerEintragButton route={route.name}></NeuerEintragButton>
            </View>

        </View>
    );
};

const HEIGTH = Dimensions.get('window').heigth;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bebebe',
        flexDirection: 'column',
    },
});


export default ZeitraumAnsicht;
