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
import {clearSingleValue, storeData} from '../backend/DataProcessing';
import {useNavigation} from '@react-navigation/native';
import kategorien from '../data/Kategorien';

const BearbeitenAnsicht = ({route}) => {
    let item = route.params.item;
    const [date, setDate] = React.useState(new Date(item.datum));

    const navigation = useNavigation();

    const onChange = (event, date) => {
        let currentDate = date;
        setDate(currentDate);
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
                <View>
                    <TextInput
                        defaultValue={item.titel}
                        style={styles.inputField}
                        editable={true}
                    />
                    <TextInput defaultValue={item.notizen} style={styles.inputField} />
                    <TextInput
                        defaultValue={item.betrag.toString()}
                        keyboardType={'numeric'}
                        style={styles.inputField}
                    />
                    <TouchableOpacity onPress={showDatepicker} title="Datum auswählen">
                        <TextInput style={styles.date} editable={false}>
                            {date.toLocaleDateString()}{' '}
                        </TextInput>
                    </TouchableOpacity>
                </View>
            </View>
            <KategoryAuswahl item={item} />

            <Button
                activeOpacity={1}
                title={'Speichern'}
                buttonStyle={{
                    backgroundColor: '#1ed760',
                    marginTop: 20,
                    marginBottom: 5,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                titleStyle={{fontSize: 22}}
                onPress={() => safeState(item, navigation)}
            />

            <Button
                activeOpacity={1}
                title={'Löschen'}
                buttonStyle={{
                    backgroundColor: '#ff654e',
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: 15,
                    marginRight: 15,
                }}
                titleStyle={{fontSize: 22}}
                onPress={() => deleteEntry(item, navigation)}
            />
        </View>
    );
};

const KategoryAuswahl = ({item}) => {
    console.log('Item', item);
    let startIndex = kategorien.filter(i => i.titel == item.kategorie)[0].id;
    const [kategoryIndex, setkategoryIndex] = React.useState(startIndex);
    return (
        <View style={styles.categorySelectContainer}>
            {kategorien.map((item, index) => (
                <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    onPress={() => {
                        setkategoryIndex(index);
                        item.kategorie = kategorien[index].titel;
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
function safeState(item, navigation) {
    navigation.goBack();
    console.log('Update Item');
    console.log(item);
    storeData(item);
}

function deleteEntry(item, navigation) {
    console.log(navigation);
    console.log('LÖSCHEN', item.dateTime);
    navigation.goBack();
    clearSingleValue(item.dateTime);
}

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headline: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#bfbbb7',
        padding: 10,
    },
    contentContainer: {
        width: WIDTH / 2,
        marginTop: 15,
        flexDirection: 'row',
    },
    inputField: {
        color: 'black',
        fontSize: 16,
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
export default BearbeitenAnsicht;
