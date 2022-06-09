import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import kategorien from '../data/Kategorien';

export default class ausgaben {
    constructor() {
        this.titel = null;
        this.betrag = null;
        this.notizen = null;
        this.kategorie = null;
        this.datum = null;
        this.dateTime = null;
    }
}

export const setTime = tempAusgabe => {
    var today = new Date();
    var date =
        today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    tempAusgabe.dateTime = date + ' ' + time;
};

export const storeData = async tempAusgabe => {
    try {
        for (let i = 0; i < kategorien.length; i++) {
            console.log('kategorien[i].titel', kategorien[i].titel);
            console.log('tempAusgabe.kategorie', tempAusgabe.kategorie);
            if (kategorien[i].titel === tempAusgabe.kategorie) {
                console.log('kategorien[i].anzahl', kategorien[i].anzahl);
                kategorien[i].anzahl = kategorien[i].anzahl + 1;
                kategorien[i].summe = kategorien[i].summe + tempAusgabe.betrag;
                console.log('kategorien[i].titel erhöht', kategorien[i].titel);
                console.log('kategorien[i].anzahl erhöht', kategorien[i].anzahl);
            }
        }

        await AsyncStorage.setItem(
            tempAusgabe.dateTime.toString(),
            JSON.stringify(tempAusgabe),
        );
    } catch (e) {
        alert('Daten speichern fehlgeschlagen');
    }
};


//TODO Brauchen wir das?
export const mergeData = async tempAusgabe => {
    try {
        console.log('tempAusgabe', tempAusgabe);
        await AsyncStorage.mergeItem(
            tempAusgabe.dateTime.toString(),
            JSON.stringify(tempAusgabe),
        );
    } catch (e) {
        alert('Daten aktualisieren fehlgeschlagen');
    }
};

export const getCompleteData = async () => {
    let values = [];
    let keysValues;
    await AsyncStorage.getAllKeys(async (err, keys) => {
        keysValues = keys;
    });
    return await AsyncStorage.multiGet(keysValues, (err, stores) => {
        stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            // let key = store[i][0];
            values.push(JSON.parse(store[i][1]));
        });
    }).then(() => {
        console.log('reload Data');
        return values;
    });
};

export const getFilteredData = async currentCategory => {
    let back = [];
    let data = await getCompleteData()
    data.forEach(item => {
        if (currentCategory === item.kategorie) {
            back.push(item);
        }
    });
        console.log("BAck", back)
    return back;
};

export const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
};

export const clearSingleValue = async tempAusgabe => {
    await AsyncStorage.removeItem(tempAusgabe.dateTime.toString());
};
