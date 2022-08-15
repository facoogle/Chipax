
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F70fa2042-9d59-4125-848c-555237d58c4c%2F633249.jpg?table=block&id=84a1b794-dc09-429f-b317-8c2a24e7c217&spaceId=a47b7bc9-6551-4845-bb74-5b783d345454&width=2000&userId=&cache=v2)
# CHIPAX RICK AND MORTY CHALLANGE 

### Bienvenidos a la aplicacion Challange de Chipax by Facu Moreyra.

## Tecnologias
***
Para este Proyecto usamos:
* [Node](https://nodejs.org/es/): Version 16.14.2 
* [API](https://rickandmortyapi.com/): Rick and Morty Api 



## Instalacion
***
Antes de comenzar instalemos. 
```
$ git clone https://github.com/facoogle/Chipax
$ npm install
$ node index (ejecutar app)
$ npm test (ejecutar testing)
```


### Comenzamos
### Primer Ejercicio: Char Counter
##### Nos piden que recorramos CHARACTER, LOCATION, Y EPISODE desde la API de Rick and Morty y resolvamos :


  -   cuántas veces aparece la letra **"l"** (case insensitive) en los nombres de todos los location
- cuántas veces aparece la letra **"e"** (case insensitive) en los nombres de todos los episode
- cuántas veces aparece la letra **"c"** (case insensitive) en los nombres de todos los character
- cuánto tardó el programa 👆 en total (desde inicio ejecución hasta entrega de resultados)


##### Nos piden que devolvamos el primer ejercicio con este formato : 
{
        "exercise_name": "Char counter",
        "time": "2s 545.573272ms",
        "in_time": true,
        "results": [
            {
                "char": "l",
                "count": 12345,
                "resource": "location"
            }
}

##### 1 - Lo primero que haremos: 
Crear un objeto donde guardaremos la informacion solicitada:
llamado **obj**
**{**
        exercise_name: "Char counter",
        time: 0,
        in_time: true,
        results: []
**}**

##### 2 - Crearemos un objeto que nos ayudara de contador mas adelante
Como necesitamos contar letras, guardaremos el conteo de lo pedido inicializado en cero, en este obj llamado **counter.**

**const counter** = **{**
    location: 0,
    episode: 0,
    character: 0
**}**

##### 3- Creamos las funciones 
Podriamos usar una sola funcion para recorrer las tres opciones (location, episode, character), pero como buena practica, haremos una funcion para cada recorrido. 

Entonces creamos las funciones: 
**fetchLocations()
fetchEpisodes()
fetchCharacters()**

Cada una de estas funciones hara muchas peticiones ya que la Api nos proporciona la informacion en partes, a traves de varias paginas **(info.next)**.

Para hacer varias peticiones a la vez, y sin consultar una por una, usaremos **Promise.All()**, que nos permite hacer la consulta masiva pasandole como parametro un array [ ] con dichas peticiones.

 Ejemplo : **Promise.All([** axios.get(https://rickandmortyapi.com/api/character?page=1),
 axios.get(https://rickandmortyapi.com/api/character?page=2),
 **])**

Para pasarle esos pedidos por paramatro a **Promise.All**,  creamos un array llamado **array** al cual, le vamos a Pushear gracias a un **for**,  todos los gets dependiendo de la cantidad de paginas que nos proporcione la API. 

Ejemplo : 

**La API nos da esta informacion **

**info**": {
"**pages**": **42**,
"next": "https://rickandmortyapi.com/api/character?page=3",
},

**Como en este caso son 42 paginas le pusheamos al array los 42 pedidos de la siguiente manera**

let api
for (let i = 1; i <=**42**; i++) {
        api = API_LOCATION + i
        **array.push**(**axios.get(api)**)
    }
######  aclaracion API_LOCATION  = "https://rickandmortyapi.com/api/character?page="

#### CONTINUAMOS..
Nuestro **array** ya tiene cargado todos los get para que nuestro** Promise.All([array])**, nos devuelva en un solo llamado, la informacion necesaria.

Procedemos a hacer el llamado y guardarlo en una constante llamada **res = await Promise.All([array])**

ahora en **const data =** guardamos la info mapeando **res**, para poder recorrerla de forma correcta


Toda la informacion que necesitabamos ya esta en **data**,  solo queda recorrer y contar las letras por cada nombre, que nos solicitaron. 

**data**.map(el => el.**results**.map(el => {
   for (let i = 0; i < **el.name**.length; i++) {

**el.name[i]**.toLowerCase() === "**c**" ? counter.location++ : counter.location
            }
        }))


con **map** recorremos el **obj.results**, y dentro de **results** que es un **array**, hacemos otro **map** donde comparamos con **length** en un **for**, cada letra pasada a minuscula con **toLowerCase** y comparando con la letra solicitada "**c**"
En caso de ser true, usaremos el objeto **counter** que creamos al principio y le pasamos el conteo.. como en este caso es character..  hacemos **counter.character++**


Terminado todos los recorridos de la funcion,  le pusheamos el resultado a nuestro array en nuestro **obj** creado al principio  **obj.results.push**({ char: "**c**", count: **counter.character**, resourse: "character" }) 


el cual quedaria asi  **obj.results** = [ { char: "**c**", count: **counter.character**(cantidad), resourse: "character" }]


Y asi es como terminan nuestras tres funciones de conteo.


##### 4- Cuanto tarda la aplicacion

Bien, ahora nos queda saber el tiempo de respuesta de nuestro primer ejercicio, para ello usaremos  **performance.now()**

Creando una nueva funcion llamada **CharCounter**, mediremos desde el comienzo
con un start = performance.now() la ejecucion de nuestras tres funciones 
**START**
**await fetchLocations()
await fetchEpisodes()
await fetchCharacters()**
**END**
y un end = performance.now()

obtendremos restando start - end,  el tiempo que le vamos a setear a nuestro **obj** principal

let **ms** = (**end** - **start**) / 1000  <--------  Obtenemos **mili segundos**
   let **seg** = Math.round(ms)   <-------- Obtenemos **segundos**
   **obj.time** = `${seg}s ${ms}ms` <-------- le seteamos a **obj.time** la info
   **obj.in_time** = **seg** <= 3 ? true : false <-------- Como el maximo que nos permiten son **3 segundos**, preguntamos si es menor o igual a lo pedido.
   
   Y asi concluye nuestro primer ejercicio.
   
   

### Segundo Ejercicio: Episode Locations
##### Nos piden que para cada episode, indiquemos la cantidad y un listado con las location (origin) de todos los character que aparecieron en ese episode (sin repetir) + tiempo que demora la aplicacion.


##### Nos piden que devolvamos el primer ejercicio con este formato : 
 {
        "exercise_name": "Episode locations",
        "time": "1s 721.975698ms",
        "in_time": true,
        "results": [
            {
                "name": "Pickle Rick",
                "episode": "S03E03",
                "locations": [
                  "Earth (C-137)",
                  "Earth (Replacement Dimension)",
                  "unknown"
                ]
            }
        ]
    }

##### 1 - Lo primero que haremos: 
Crearemos un objeto, llamado obj2 que contendra el siguiente formato:
obj2 = {
    exercise_name: "Episode locations",
    time: 0,
    in_time: false,
    results: []
}

Ahora bien, como debemos recorrer los **episodios**, y solo son **3 Paginas**, y a la vez, cada pagina nos devuelve un array con los links hacia los **character** optamos por la  recursividad. 

La api, segun su documentacion,  nos permite llamar a todos los character pasandole en su ruta un array con sus **id** Ejemplo:  **/api/character/[1,2,3]** . 

Entonces cuando recorramos **episodios** a nuestra propiedad **character** le haremos un get de la siguiente manera:

Creamos la funcion **fetchEpisode_Location(parem)**, que recibe como parametro el link al cual hacer el get. ()

y tambien vamos a necesitar otra funcion, que recorra los Character para obtener su origin location. 

Creamos la funcion **BuscarPj(info,episodio,name)** que recibe tres parametros y que vamos a ejecutar dentro de nuestro **fetchEpisode_Location** 

**info** va a ser un array, con los id de los characters que necesitamos 
Ej:_ /api/character/**[1,2,3]**    <-- **info**

quedaria asi: 
let **json** = await axios.get(https://rickandmortyapi.com/api/character/${info}) <--**info**




como en nuestra funcion **fetchEpisode_Location(parem)**, json.data.results.map(el=>el.characters.map(el=>el))  nos devuelve el link completo de cada character e info solo necesita los numeros finales de esas paginas. crearemos la variable 
**regex** = /(\d+)/g;

y cuando recorramos  data.results.map(el=>{
ejecutamos BuscarPj(**el.characters.map(el => el.match(regex)[0])**.) <-- Info
})

 como segundo parametro BuscarPj(el.episode)  <---- episodio
  como tercer parametro BuscarPj(el.name) <---- name
  
  una vez que recibio los tres parametros BuscarPj(info,episodio,name)
  mapeamos la **data** obtenida y guardamos los **origin** en un array llamado **array**
  
 ** let array = json.data.map(el => el.origin.name)**
 
 como los origin pueden llegar a repetirse usamos la funcion **new set(Array)** que nos dejara un nuevo array sin repeticiones
 
 **const dataArr = new Set(array);**
  
  
  una vez terminado pusheamos a **obj2.results**
  {name: **name**,episodio: **episodio**,locations: [...**dataArr**]}
  
  
  Cuando termina la ejecucion de **BuscarPj** en nuestro **fetchEpisode_Location(parem)** ,
  
  creamos una variable llamada next, que va a guardar si la API nos proporciona otro link con mas episodios 
** let next = json.data.info.next**

Si **next** no es null,  volvemos a ejecutar **fetchEpisode_Location**(**next**) pero ahora le pasamos como parametro ese **next**, que contiene la ruta a donde hacer el nuevo get.

Y asi concluye nuestra primera parte del segundo ejercicio. 


##### 2 - Tiempo de respuesta: 
Como hicimos en el ejercicio uno, aplicamos el mismo metodo dentro de una funcion llamada **Episode_Location** que ejecutara await **fetchEpisode_Location**(API_EPISODE)  con un start y un end.

##### 3 - Ejecucion final: 
Nuestra funcion Run() ejecutara :
await **Episode_Location**()
await **CharCounter**()

una vez que termine la espera le pusheamos a JSON_FINAL los dos ejercicios:
**JSON_FINAL**.push(**obj**)
**JSON_FINAL**.push(**obj2**)

como debemos devolver un .json, usamos la api "**fs"** de node, y lo guardamos en la carpeta **RESULTADO.**


##### FIN.♥



# Muchas gracias por haber llegado hasta aca, espero sea de su agrado. 
###Linkedin:
###https://www.linkedin.com/in/facundo-moreyra/
###Proyectos:
###https://pi-countries-facoogle.vercel.app/
###https://clima-app-morefacu.vercel.app/

###GitHub: 
###https://github.com/facoogle

Saludos coordiales.
 Facundo Moreyra 15/08/2022