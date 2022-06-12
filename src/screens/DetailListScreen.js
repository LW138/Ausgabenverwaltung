import React, {useEffect} from 'react';
import {
    ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getCompleteData} from '../backend/DataProcessing';
import DetailEintrag from '../components/DetailEintrag';

/*
Beim klicken auf eine Kategorie oder ein Zeitraum öffnet sich dieser Screen, der eine Liste aller zu dieser Kategorien oder
Zeitraum gehörenden Einträge zeigt. Jeder Eintrag erscheint als eine eigene Instanz der Komponente "DetailEintrag"
 */

const DetailListScreen = ({route}) => {
    const [data, setData] = React.useState([]);
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
                    let compare1 = new Date(data[j].datum)
                    let compare2 = new Date(data[j+1].datum)
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
                        let compare2 = new Date(item.datum)
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
                        if (titel == '-365 Tage' && days > -366 && days <= 0) {
                            back.push(item);
                        }
                        if (titel == 'Zukünftige' && days > 0) {
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
                   <DetailEintrag key={item.dateTime} id={item.dateTime} item={item} typ={typ} titel={titel} route={route.name}></DetailEintrag>
                );
            })}
        </ScrollView>
    );
};


export default DetailListScreen;
