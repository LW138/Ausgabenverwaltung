import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation,} from '@react-navigation/native';

const CardList = ({route, detailScreen, data, typ}) => {
    const navigation = useNavigation();


    return (
        <View style={styles.cardContainer}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    columnWrapperStyle={{justifyContent: 'space-between'}}

                    numColumns={2}
                    data={data}
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    navigation.navigate(detailScreen, {
                                        titel: item.titel,
                                        typ: typ
                                    });
                                }}>
                                <View style={styles.card}>
                                    <View
                                        style={{
                                            height: 70,
                                            alignItem: 'center',
                                            flexDirection: 'row',
                                        }}>
                                        <Image style={styles.image} source={item.bild} />
                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: 'right',
                                                fontSize: 20,
                                                color: 'black',
                                            }}>
                                            {item.anzahl}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.titel}>{item.titel}</Text>
                                        <Text style={styles.summe}>{item.betrag + "€"}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />

        </View>
    );
};

const width = Dimensions.get('window').width / 2 - 30;
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        heigth: 510,
        marginBottom: 10,

    },
    card: {
        backgroundColor: '#efebe6',
        width,
        borderRadius: 15,
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#000',
        elevation: 5,
        height: 148,
    },
    titel: {
        fontSize: 25,
        paddingTop: 5,
        color: 'black',
    },
    summe: {
        fontSize: 20,
        color: 'black',
    },
    image: {
        height: 60,
        width: 60,
    },
});

export default CardList;
