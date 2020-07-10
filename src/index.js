const express = require('express');
const fs = require('fs');
const csv = require('fast-csv');
const { resolve } = require('path');

const app = express();
app.use(express.json());

app.get('/api/cases', (req, res) => {
    let array = []
    const str = fs.createReadStream('data.csv')
    const strCsv = csv.parse({
        headers: true,
        delimiter: ';',
        quote: '"'
    })
    .on('error', error => console.log('error ', error))
    .on('data', data => 
        array.push(data),
    )
    .on('end', () => 
        res.json(array),
    )
    
    str.pipe(strCsv)
    return;
});

app.listen(3333);