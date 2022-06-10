import React, {useEffect} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';

import {useNavigation,  useIsFocused} from '@react-navigation/native';
import {getCompleteData, getFilteredData} from '../backend/DataProcessing';

const DetailListScreen = ({route}) => {
    const [data, setData] = React.useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
       loadData()
    }, [isFocused]);

    let back = [];
    let typ = route.params.typ
    let titel = route.params.titel

    const loadData = () => {
        getCompleteData().then(arrayback => {
            if(typ == "Kategorie"){
                arrayback.forEach(item => {
                    if (titel === item.kategorie) {
                        back.push(item);
                    }
                });
            }else if(typ == "Zeitraum"){
                if (titel == 'Gesamt') {
                    back = arrayback;
                }else{
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
                        if (titel == '-7 Tage' && days > -8 && days <= 0) {
                            back.push(item);
                        }
                        if(titel == '-31 Tage' && days > -32 && days <=0) {
                            back.push(item);
                        }
                        if (titel == '-365 Tage' && days > -366) {
                            back.push(item);
                        }
                    });
                }
            }
            if (arrayback !== undefined) {
                setData(back);
            } else {
                setData([]);
            }
        });
    }


    return (
        <ScrollView>
            {data.map(item => {
                {
                }
                return (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={item.dateTime}
                        onPress={() =>
                            navigation.navigate('Bearbeiten', {
                                item: item,
                                previousScreen: route.name,
                                typ: typ,
                                titel: titel
                            })
                        }>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.card}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.date}>{item.datum}</Text>
                                    <Text style={styles.titel}>{item.titel}</Text>
                                    <Text style={styles.sum}>{item.betrag}€</Text>
                                    <Image style={styles.arrow} source={require('../../res/img/right.png')}></Image>
                                </View>
                                {item.notizen != null ? (
                                    <Text style={styles.notice}>{item.notizen}</Text>
                                ) : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    date: {
        margin: 5,
        textAlign: 'center',
        fontSize: 16,
        flex: 0.4,
        color: 'black',
    },
    titel: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
    },
    sum: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        margin: 5,
        flex: 0.4,
    },
    notice: {
        padding: 10,
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        borderTopWidth: 0.5,
    },
    card: {
        backgroundColor: '#efebe6',
        fontSize: 20,
        borderRadius: 10,
        shadowColor: '#000',
        elevation: 5,
        width: WIDTH - 40,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    arrow:{
        flex: 0.1,
        width: 20,
        height: 20,
        alignContent: 'center',
        margin: 5
    },
});

export default DetailListScreen;
