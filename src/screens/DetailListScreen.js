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
import DetailEintrag from '../components/DetailEintrag';
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

    const sortData = data => {
        if(data.length > 1){
            for (let i = 0; i < data.length - 1; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    let item_date1 = data[j].datum.split(".")
                    let compare1 = new Date(item_date1[2], item_date1[1]-1, item_date1[0])
                    let item_date2 = data[j + 1].datum.split(".")
                    let compare2 = new Date(item_date2[2], item_date2[1]-1, item_date2[0])
                    let millisBetween = compare2.getTime() - compare1.getTime();
                    if (millisBetween >= 0) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
        }
        return data;
    }

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
                setData(sortData(back));
            } else {
                setData([]);
            }
        });
    }


    return (
        <ScrollView>
            {data.map(item => {
                return (
                   <DetailEintrag keyVal={item.dateTime} item={item} typ={typ} titel={titel} route={route.name}></DetailEintrag>
                );
            })}
        </ScrollView>
    );
};


export default DetailListScreen;
