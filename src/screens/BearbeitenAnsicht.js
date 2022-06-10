import React, {useEffect} from 'react';
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
import ausgaben, {mergeData, clearSingleValue, storeData} from '../backend/DataProcessing';
import kategorien from '../data/Kategorien';


let tempAusgabe = new ausgaben();

const BearbeitenAnsicht = ({route, navigation}) => {

    let item = route.params.item;
    let titel = route.params.titel;
    let typ = route.params.typ;
    let item_date = item.datum.split('.')
    const [date, setDate] = React.useState(new Date(item_date));
    const [message, setMessage] = React.useState('');
    tempAusgabe = item;
    tempAusgabe.datum = date.toLocaleDateString();


    const onChange = (event, date) => {
        let currentDate = date;
        setDate(currentDate);
        tempAusgabe.datum = date.toLocaleDateString();
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date.toLocaleDateString(),
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
                        onChangeText={message => {
                            setMessage(message);
                            tempAusgabe.titel = message;
                        }}
                    />
                    <TextInput
                        defaultValue={item.notizen}
                        style={styles.inputField}
                        onChangeText={message => {
                            setMessage(message);
                            tempAusgabe.notizen = message;
                        }}
                    />
                    <TextInput
                        defaultValue={item.betrag}
                        keyboardType={'numeric'}
                        style={styles.inputField}
                        onChangeText={message => {
                            setMessage(message);
                            tempAusgabe.betrag = message;
                        }}
                    />
                    <TouchableOpacity onPress={showDatepicker} title="Datum auswählen">
                        <TextInput style={styles.date} editable={false}>
                            {date.toLocaleDateString()}
                        </TextInput>
                    </TouchableOpacity>
                </View>
            </View>
            <KategoryAuswahl item={item} />

            <Button
                activeOpacity={1}
                title={'Speichern'}
                buttonStyle={styles.buttonSave}
                titleStyle={{fontSize: 22}}
                onPress={() => {
                    mergeData(tempAusgabe);
                    navigation.navigate(route.params.previousScreen, {typ: typ, titel: titel});
                }}
            />

            <Button
                activeOpacity={1}
                title={'Löschen'}
                buttonStyle={styles.buttonDelete}
                titleStyle={{fontSize: 22}}
                onPress={() => {
                    clearSingleValue(tempAusgabe);
                    navigation.navigate(route.params.previousScreen, {typ: typ, titel: titel});
                }}
            />
        </View>
    );
};

export const KategoryAuswahl = ({item}) => {
    let index = 0;
    if (item.kategorie != '' && item.kategorie != null){
        index = (kategorien.filter(i => i.titel == item.kategorie)[0].id);
    }
    const [kategoryIndex, setkategoryIndex] = React.useState(index);

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
    buttonSave:{
        backgroundColor: '#1ed760',
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    buttonDelete:{
        backgroundColor: '#ff654e',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    contentContainer: {
        width: WIDTH / 2,
        marginTop: 15,
        flexDirection: 'row',
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
export default BearbeitenAnsicht;
