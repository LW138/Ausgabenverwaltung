import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,

} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import CardList from '../components/CardList';
import kategorien from '../data/Kategorien';
import {getCompleteData} from '../backend/DataProcessing';
import NeuerEintragButton from '../components/NeuerEintragButton';

/*
Dieser Screen erscheint, wenn der linke Button des Tabnavigators gedrückt wird und ist die Startseite der App. Es besteht aus einer Liste
von Karten zum Anzeigen der in "kategorien" definierten Kateogorien und einem "NeuerEintragButton" zum Anlegen eines neuen Eintrags.
 */

const KategorienAnsicht = ({route, navigation}) => {
    const [counter, setCounter] = useState(0)
    const isFocused = useIsFocused();

    useEffect(() => {
        countEntriesPerCategory()
    }, [isFocused]);

    const countEntriesPerCategory = () => {
        kategorien[0].anzahl = 0
        kategorien[1].anzahl = 0
        kategorien[2].anzahl = 0
        kategorien[3].anzahl = 0
        kategorien[4].anzahl = 0
        kategorien[5].anzahl = 0
        kategorien[0].betrag = 0
        kategorien[1].betrag = 0
        kategorien[2].betrag = 0
        kategorien[3].betrag = 0
        kategorien[4].betrag = 0
        kategorien[5].betrag = 0
        getCompleteData().then(arrayback => {
            arrayback.forEach(item => {
                if (item.kategorie == 'Sparen') {
                    kategorien[0].anzahl = kategorien[0].anzahl + 1;
                    kategorien[0].betrag =  parseFloat((kategorien[0].betrag + parseFloat(item.betrag)).toFixed(2))
                }
                if (item.kategorie == 'Haushalt') {
                    kategorien[1].anzahl = kategorien[1].anzahl + 1;
                    kategorien[1].betrag =  parseFloat((kategorien[1].betrag + parseFloat(item.betrag)).toFixed(2))
                }
                if (item.kategorie == 'Freizeit') {
                    kategorien[2].anzahl =  kategorien[2].anzahl + 1;
                    kategorien[2].betrag =  parseFloat((kategorien[2].betrag + parseFloat(item.betrag)).toFixed(2))
                }
                if (item.kategorie == 'Reisen') {
                    kategorien[3].anzahl =  kategorien[3].anzahl + 1;
                    kategorien[3].betrag =  parseFloat((kategorien[3].betrag + parseFloat(item.betrag)).toFixed(2))
                }
                if (item.kategorie == 'Lebensmittel') {
                    kategorien[4].anzahl =  kategorien[4].anzahl + 1;
                    kategorien[4].betrag =  parseFloat((kategorien[4].betrag + parseFloat(item.betrag)).toFixed(2))
                }
                if (item.kategorie == 'Sonstiges'){
                    kategorien[5].anzahl = kategorien[5].anzahl + 1
                    kategorien[5].betrag = parseFloat((kategorien[5].betrag + parseFloat(item.betrag)).toFixed(2))
                }
            })
            setCounter(counter+1);
        })

    }
    return (
        <View style={styles.container}>
                <CardList detailScreen={'Details'} data={kategorien} typ={"Kategorie"} />
            <View style={{position: 'absolute', left: WIDTH/2-35, bottom: 5}}>
                <NeuerEintragButton route={route.name}></NeuerEintragButton>
            </View>
        </View>

    );
};

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bebebe',
        flexDirection: 'column',
    },
});

export default KategorienAnsicht;
