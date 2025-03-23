const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const item = require('./models/item.js');

const items = [
    {name: 'Band of Unanswered Prayers', restricted: false, slot: 'Finger', ilvl: 83, from: 'Anub\'Rekhan', softResdBy: ''},
    {name: 'Cryptfiend Silk Cloak', restricted: false, slot: 'Back', ilvl: 83, from: 'Anub\'Rekhan', softResdBy: ''},
    {name: 'Gem of Nerubis', restricted: false, slot: 'Held in Off-Hand', ilvl: 83, from: 'Anub\'Rekhan', softResdBy: ''},
    {name: 'Pauldrons of Elemental Fury', restricted: true, slot: 'Shoulder', ilvl: 85, from: 'Anub\'Rekhan', softResdBy: ''},
    {name: 'Spaulders of the Grand Crusader', restricted: true, slot: 'Shoulder', ilvl: 85, from: 'Anub\'Rekhan', softResdBy: ''},
]

const seeding = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecting to MongoDB...');
    console.log('Seeding DB...');
    for(obj of items){
        console.log(`Creating ${obj.name}...`);
        await item.create({
            name: obj.name,
            restricted: obj.restricted,
            slot: obj.slot,
            ilvl: obj.ilvl,
            from: obj.from,
            softResdBy: obj.softResdBy,
        });
    }
    await mongoose.disconnect();
    console.log('Disconecting from MongoDB...');
}

seeding();