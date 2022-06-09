import React, {useEffect} from 'react';
import {
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {getCompleteData, getFilteredData} from '../backend/DataProcessing';

const DetailListScreen = ({route, titel}) => {
    const [data, setData] = React.useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        console.log("GetFilteredData")
        getCompleteData().then(arrayback => {
            if (arrayback !== undefined) {
                setData(arrayback);
            }
        });
    }, []);

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
                                screen: route.name,
                            })
                        }>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.card}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.date}>{item.datum}</Text>
                                    <Text style={styles.titel}>{item.titel}</Text>
                                    <Text style={styles.sum}>{item.betrag}€</Text>
                                </View>
                                {item.notizen !== '' ? (
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
});

export default DetailListScreen;
