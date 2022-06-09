import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import {Button} from 'react-native-elements';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import ausgaben, {setTime, storeData} from '../backend/DataProcessing';
import kategorien from '../data/Kategorien';

let tempAusgabe = new ausgaben();

const NeuerEintrag = ({route, navigation}) => {
    const [date, setDate] = React.useState(new Date());
    const [message, setMessage] = React.useState('');

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
                    placeholder={'Betrag einfügen'}
                    placeholderTextColor={'grey'}
                    keyboardType={'numeric'}
                    style={styles.inputField}
                    onChangeText={message => {
                        setMessage(message);
                        tempAusgabe.betrag = message;
                    }}
                />
                <TouchableOpacity onPress={showDatepicker} title="Datum auswählen">
                    <TextInput style={styles.date} editable={false}>
                        {date.toLocaleDateString()}{' '}
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
                    navigation.navigate(route.params.previousScreen);
                }}
            />
        </View>
    );
};

const KategoryAuswahl = () => {
    const [kategoryIndex, setkategoryIndex] = React.useState(0);
    return (
        <View style={styles.categorySelectContainer}>
            {kategorien.map((item, index) => (
                <TouchableOpacity
                    activeOpacity={1}
                    key={index}
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
            ))}
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
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    notSelectedCategory: {
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 18,
        padding: 5,
        borderRadius: 10,
        width: 90,
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
