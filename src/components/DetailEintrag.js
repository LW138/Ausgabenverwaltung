import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DetailEintrag = ({key, item, typ, titel, route}) => {
    const navigation = useNavigation();
    let date = new Date(item.datum)
    return(
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                navigation.navigate('Bearbeiten', {
                    item: item,
                    previousScreen: route,
                    typ: typ,
                    titel: titel
                })
            }>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.date}>{date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()}</Text>
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
    )
}

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    date: {
        margin: 5,
        textAlign: 'center',
        fontSize: 15,
        flex: 0.5,
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
export default DetailEintrag;
