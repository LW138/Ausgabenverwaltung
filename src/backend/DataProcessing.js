import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
Methodensammlung zur Kommunikation mit dem Speicher
 */

export default class ausgaben {
    constructor() {
        this.titel = null;
        this.betrag = null;
        this.notizen = null;
        this.kategorie = '';
        this.datum = null;
        this.dateTime = '';
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
    if(tempAusgabe.betrag == null ){
        tempAusgabe.betrag = '0';
    }
    if(tempAusgabe.titel == null){
        tempAusgabe.titel = "Ausgabe"
    }

    let betrag_split = tempAusgabe.betrag.split('.');
    if(betrag_split.length > 2){
        tempAusgabe.betrag = 0
    }else{
        tempAusgabe.betrag = parseFloat(parseFloat(tempAusgabe.betrag).toFixed(2));
    }

    try {
        await AsyncStorage.setItem(
            tempAusgabe.dateTime.toString(),
            JSON.stringify(tempAusgabe),
        );
    } catch (e) {
        alert('Daten speichern fehlgeschlagen');
    }
};

export const mergeData = async tempAusgabe => {
    try {
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
        return values;
    });
};

export const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
};

export const clearSingleValue = async tempAusgabe => {
    await AsyncStorage.removeItem(tempAusgabe.dateTime.toString());
};

