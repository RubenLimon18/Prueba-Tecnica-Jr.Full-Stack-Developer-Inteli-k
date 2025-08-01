const express = require('express');
const axios = require('axios');
const router = express.Router();
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjUwODQ4NzkwMiwiYWFpIjoxMSwidWlkIjo3NDAzMzU2MywiaWFkIjoiMjAyNS0wNS0wNVQxNzowNDoxNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Mjg3NjAwODIsInJnbiI6InVzZTEifQ.qlIIZccCkYAGhhTruWOHQF5a09I8uujVkJTV6q-ci2g";

router.get('', async (req, res)=>{

    // 1. GET Data
    const url = 'https://hook.us1.make.com/0vdmuhrzbtr5w8bynrpvs8ju697a42qy';
    const  data  = await axios.get(url);


    // 2. Data Transformation
    const date = new Date();
    const dataTransformed = {
        ...data.data,
        Edad: 22,
        Fecha: date.toISOString(),
        Nombre: "Ruben Limon Rangel",
        Teléfono: "3325416183",
        "Correo Electrónico": "ruben.limonrangel@gmail.com",
        Github: "https://github.com/RubenLimon18/Prueba-Tecnica-Jr.Full-Stack-Developer-Inteli-k.git"
    }
    //res.status(200).json(dataTransformed)
    
    //3. API Monday
    
    // Column values
    const columnValuesObject = {
        numeric_mktb8zbj: dataTransformed.Edad.toString(),
        email_mktb8jqh: {
            email: dataTransformed["Correo Electrónico"],
            text: dataTransformed["Correo Electrónico"]
        },
        phone_mktbpkth: {
            phone: dataTransformed.Teléfono
        },
        date4: {
            date: dataTransformed.Fecha.split("T")[0]
        },
        link_mktbykh5: {
            url: dataTransformed.Github,
            text: dataTransformed.Github
        }
    };


    // GraphQL
 const columnValuesString = JSON.stringify(columnValuesObject)
            .replace(/"/g, '\\"')  
            .replace(/\n/g, ''); 



    // Mutation
    const monday = `
        mutation {
            create_item(
                board_id: 9708129485,
                group_id: "topics",
                item_name: "${dataTransformed.Nombre}",
                column_values: "${columnValuesString}"
            ) {
                id
            }
        }
        `;

    // Response
    try{
        const response = await axios.post(
            'https://api.monday.com/v2',
            { query: monday },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({
            data: response.data
        });
    
    } catch(error) {
        console.error('Error completo:', error.response?.data || error.message);
        res.status(500).json({
            error: error.message,
            details: error.response?.data || error
        });
    }


})


module.exports = router;