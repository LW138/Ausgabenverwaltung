import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import CardList from '../components/CardList';
import kategorien from '../data/Kategorien';
import {getCompleteData} from '../backend/DataProcessing';


let array = [];
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
                    kategorien[0].betrag =  kategorien[0].betrag + parseInt(item.betrag);
                }
                if (item.kategorie == 'Haushalt') {
                    kategorien[1].anzahl = kategorien[1].anzahl + 1;
                    kategorien[1].betrag =  kategorien[1].betrag + parseInt(item.betrag);
                }
                if (item.kategorie == 'Freizeit') {
                    kategorien[2].anzahl =  kategorien[2].anzahl + 1;
                    kategorien[2].betrag =  kategorien[2].betrag + parseInt(item.betrag);
                }
                if (item.kategorie == 'Reisen') {
                    kategorien[3].anzahl =  kategorien[3].anzahl + 1;
                    kategorien[3].betrag =  kategorien[3].betrag + parseInt(item.betrag);
                }
                if (item.kategorie == 'Lebensmittel') {
                    kategorien[4].anzahl =  kategorien[4].anzahl + 1;
                    kategorien[4].betrag =  kategorien[4].betrag + parseInt(item.betrag);
                }
                if (item.kategorie == 'Sonstiges'){
                    kategorien[5].anzahl = kategorien[5].anzahl + 1
                    kategorien[5].betrag = kategorien[5].betrag + parseInt(item.betrag)
                }
            })
            setCounter(counter+1);
        })

    }
    return (
        <View style={styles.container}>
            <CardList detailScreen={'Details'} data={kategorien} typ={"Kategorie"} />
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.neuerEintragButton}
                onPress={() => {
                    console.log(isFocused)
                    navigation.navigate('Neuer Eintrag', {
                        previousScreen: route.name,
                    })
                }}>
                <Text style={{fontSize: 45, textAlign: 'center', color: 'black'}}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 500
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

export default KategorienAnsicht;
