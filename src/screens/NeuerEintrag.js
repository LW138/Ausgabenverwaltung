import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native';
import {Button} from 'react-native-elements';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import ausgaben, {setTime, storeData} from '../backend/DataProcessing';
import kategorien from '../data/Kategorien';

/*
Screen zum Anlegen einer neuen Ausgabe. Besteht aus mehrere TextInput, einem Datepicker sowie einer Kategorieauswahl.
Die onPress Methode des Speichern-Buttons speichert die Ausgabe dauerhaft im Handyspeicher.
 */

let tempAusgabe = new ausgaben();

const NeuerEintrag = ({route, navigation}) => {
    const [date, setDate] = React.useState(new Date());
    const [message, setMessage] = React.useState('');
    tempAusgabe.datum = date.toLocaleDateString();

    const onChange = (event, date) => {
        let currentDate = date;
        setDate(currentDate);
        tempAusgabe.datum = date.toLocaleDateString();
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
        });
    };

    return (
        <View>
            <View style={styles.contentContainer}>
                <TextInput
                    placeholder={'Titel eintragen'}
                    placeholderTextColor={'grey'}
                    style={styles.inputField}
                    onChangeText={message => {
                        setMessage(message);
                        tempAusgabe.titel = message;
                    }}
                />
                <TextInput
                    placeholder={'Notizen eintragen'}
                    placeholderTextColor={'grey'}
                    style={styles.inputField}
                    onChangeText={message => {
                        setMessage(message);
                        tempAusgabe.notizen = message;
                    }}
                />
                <TextInput
                    placeholder={'Betrag in ??? eingeben'}
                    placeholderTextColor={'grey'}
                    keyboardType={'numeric'}
                    style={styles.inputField}
                    onChangeText={message => {
                        setMessage(message)
                        tempAusgabe.betrag = message;
                        console.log(message)
                    }}
                />
                <TouchableOpacity onPress={showDatepicker} title="Datum ausw??hlen">
                    <TextInput style={styles.date} editable={false}>
                        {date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()}{' '}
                    </TextInput>
                </TouchableOpacity>
            </View>
            <KategoryAuswahl item={tempAusgabe} />
            <Button
                title={'Speichern'}
                activeOpacity={1}
                buttonStyle={{backgroundColor: '#1ed760'}}
                titleStyle={{fontSize: 22}}
                onPress={() => {
                    setTime(tempAusgabe);
                    storeData(tempAusgabe);
                    tempAusgabe = new ausgaben()
                    navigation.navigate(route.params.previousScreen);
                }}
            />
        </View>
    );
};

const KategoryAuswahl = ({item}) => {
    let index = 0;
    if (item.kategorie != '' && item.kategorie != null){
        index = (kategorien.filter(i => i.titel == item.kategorie)[0].id);
    }
    const [kategoryIndex, setkategoryIndex] = React.useState(index);
    tempAusgabe.kategorie = kategorien[index].titel;
    return (
        <View style={styles.categorySelectContainer}>
            <FlatList
                numColumns={3}
                data={kategorien}
                renderItem={({item, index}) => (
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                setkategoryIndex(index);
                                tempAusgabe.kategorie = kategorien[index].titel;
                            }}>
                            <Text
                               style={[
                                    styles.notSelectedCategory,
                                    kategoryIndex === index && styles.selectedCategory,
                                ]}>
                                {item.titel}
                            </Text>
                        </TouchableOpacity>


                    </View>



                    )}
            />
        </View>
    );
};

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 15,
    },
    inputField: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        width: WIDTH - 50,
        marginLeft: 25,
        marginBottom: 10,
        backgroundColor: '#efebe6',
    },
    date: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        width: WIDTH - 50,
        marginLeft: 25,
        marginBottom: 10,
        backgroundColor: '#efebe6',
    },
    categorySelectContainer: {
        marginLeft: 5,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
        height: 100,


    },
    notSelectedCategory: {
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 18,
        padding: 5,
        borderRadius: 10,
        width: (WIDTH - 37)/ 3 ,
        margin: 5,
        height: 40,
        textAlign: 'center',
        color: 'black',
        backgroundColor: '#efebe6',

    },
    selectedCategory: {
        backgroundColor: '#595959',
        color: 'white',
        fontSize: 18,
    },
});

export default NeuerEintrag;
