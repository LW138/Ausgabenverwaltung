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
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CardList = ({route, screen, data}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.cardContainer}>
            <ScrollView style={{height: 492}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    contentContainerStyle={styles.contentContainerStyle}
                    numColumns={2}
                    data={data}
                    renderItem={({item}) => (
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    navigation.navigate(screen, {
                                        titel: item.titel,
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
                                        <Text style={styles.summe}>{item.summe}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const width = Dimensions.get('window').width / 2 - 30;
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
    },
    card: {
        backgroundColor: '#efebe6',
        width,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        shadowColor: '#000',
        elevation: 5,
        height: 150,
    },
    titel: {
        fontSize: 25,
        paddingTop: 10,
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
