/*
Die festgelegten Zeitraumkategorien
 */

const zeitraeume = [
    {
        id: 0,
        bild: require('../../res/img/woche.png'),
        titel: '-7 Tage',
        betrag: 0,
        anzahl: 0
    },
    {
        id: 1,
        bild: require('../../res/img/monat.png'),
        titel: '-31 Tage',
        betrag: 0,
        anzahl: 0
    },
    {
        id: 2,
        bild: require('../../res/img/jahr.png'),
        titel: '-365 Tage',
        betrag: 0,
        anzahl: 0,
    },
    {
        id: 3,
        bild: require('../../res/img/zukunft.png'),
        titel: 'Zukünftige',
        betrag: 0,
        anzahl: 0,
    },
    {
        id: 4,
        bild: require('../../res/img/summary.png'),
        titel: 'Gesamt',
        betag: 0,
        anzahl: 0,
    },
];

export default zeitraeume;
