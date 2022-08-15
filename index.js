// Constantes

const axios = require("axios")
const fs = require("fs")
const colors = require('colors');

const API_EPISODE = "https://rickandmortyapi.com/api/episode/?page="
const API_CHARACTER = "https://rickandmortyapi.com/api/character/?page="
const API_LOCATION = "https://rickandmortyapi.com/api/location/?page="

const counter = {
    location: 0,
    episode: 0,
    character: 0
}

const JSON_FINAL = []

// Actividad Char Counter
let obj = {
    exercise_name: "Char counter",
    time: 0,
    in_time: true,
    results: []
}
// Actividad Episode locations
let obj2 = {
    exercise_name: "Episode locations",
    time: 0,
    in_time: true,
    results: []
}



const fetchLocations = async () => {
    let array = []
    let api

    for (let i = 1; i <= 7; i++) {
        api = API_LOCATION + i
        array.push(axios.get(api))
    }


    try {
        const res = await Promise.all(array);

        const data = res.map((res) => res.data);

        data.map(el => el.results.map(el => {
            for (let i = 0; i < el.name.length; i++) {

                el.name[i].toLowerCase() === "l" ? counter.location++ : counter.location
            }
        }))
        obj.results.push({ char: "l", count: counter.location, resourse: "location" })

    } catch {
        throw Error("Promise failed");
    }
};




const fetchCharacters = async () => {
    let array = []
    let api

    for (let i = 1; i <= 42; i++) {
        api = API_CHARACTER + i
        array.push(axios.get(api))
    }


    try {
        const res = await Promise.all(array);

        const data = res.map((res) => res.data);
        data.map(el => el.results.map(el => {
            for (let i = 0; i < el.name.length; i++) {

                el.name[i].toLowerCase() === "c" ? counter.character++ : counter.character
            }
        }))
        obj.results.push({ char: "c", count: counter.character, resourse: "character" })

    } catch {
        throw Error("Promise failed");
    }
};


const fetchEpisode = async () => {
    let array = []
    let api

    for (let i = 1; i <= 3; i++) {
        api = API_EPISODE + i
        array.push(axios.get(api))
    }


    try {
        const res = await Promise.all(array);

        const data = res.map((res) => res.data);
        data.map(el => el.results.map(el => {
            for (let i = 0; i < el.name.length; i++) {

                el.name[i].toLowerCase() === "e" ? counter.episode++ : counter.episode
            }
        }))
        obj.results.push({ char: "e", count: counter.episode, resourse: "episode" })

    } catch {
        throw Error("Promise failed");
    }
};







const CharCounter = async () => {
    start = performance.now()
    await fetchLocations()
    await fetchEpisode()
    await fetchCharacters()
    end = performance.now()

    let ms = (end - start) / 1000
    let seg = Math.round(ms)
    obj.time = `${seg}s ${ms}ms`
    obj.in_time = seg <= 3 ? true : false
    

}



const BuscarPj = async (info, episodio, name) => {
    let json = await axios.get(`https://rickandmortyapi.com/api/character/${info}`)
    let array = json.data.map(el => el.origin.name)
    const dataArr = new Set(array);

    obj2.results.push({
        name: name,
        episodio: episodio,
        locations: [...dataArr]

    })




}


const more2 = async (parem) => {

    let json = await axios.get(parem)


    var regex = /(\d+)/g;
    json.data.results.map((el) => BuscarPj(el.characters.map(el => el.match(regex)[0]), el.episode, el.name)


    )

    let next = json.data.info.next
    next !== null ? await more2(next) : null


}

const Episode_Location = async () => {
    start = performance.now()
    await more2(API_EPISODE)
    
    end = performance.now()


    let ms = (end - start) / 1000
    let seg = Math.round(ms)
    obj2.time = `${seg}s ${ms}ms`
    obj2.in_time = seg <= 3 ? true : false


}





async function Run() {

    await Episode_Location()
    await CharCounter()
    JSON_FINAL.push(obj)
    JSON_FINAL.push(obj2)

    const JsonArray = JSON.stringify(JSON_FINAL);


    let file = "Resultado.json"
    fs.writeFile("./RESULTADO/" + file, JsonArray, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(`Chipax Message: Archivo "${file}" Generado Correctamente! ✓✓`.green);
        console.log('Puedes encontrarlo en la carpeta RESULTADO.'.green);
        console.log(`Char_Counter: ${obj.time} Episode_Locations: ${obj2.time}`.green);
        //console.log(JSON_FINAL)  <-- En caso de no querer revisar Json, Descomentar
    });

}



Run()

module.exports = {obj,obj2, CharCounter, Episode_Location}


