# PokéDex Explorer

App hecha con React Native y Expo que consume la [PokéAPI](https://pokeapi.co/). Muestra una lista de Pokémon, permite buscarlos por nombre o número y abre una ficha con su imagen, tipos y estadísticas.

## Qué hace la app

- Muestra 20 Pokémon al abrir y carga 20 más al llegar al final de la lista (scroll infinito).
- Cada tarjeta tiene la imagen, el número (por ejemplo `#025`) y el nombre.
- Se puede buscar por nombre o por número. No importa si se escribe en mayúsculas o con espacios al inicio o al final.
- Al tocar una tarjeta o buscar, se abre la ficha del Pokémon con:
  - imagen grande, nombre y número
  - un distintivo de color por cada tipo
  - altura en metros y peso en kilogramos
  - las 6 estadísticas base con una barra proporcional (el máximo es 255)
- La ficha tiene un botón "Volver a la lista".

## Estados de la interfaz

| Estado | Qué ve el usuario | Dónde |
|---|---|---|
| Cargando | Un círculo de carga con texto | Al abrir la lista, al abrir una ficha y al final de la lista |
| Error | Mensaje en español y botón "Reintentar" | Lista y ficha |
| Sin resultados | Mensaje cuando el nombre buscado no existe | Ficha |
| Éxito | La lista o la ficha | Lista y ficha |

## Cómo correrla

Necesitas Node.js y la app Expo Go en el celular (SDK 57).

```
npm install
npx expo start
```

Después se escanea el QR con Expo Go. No hace falta ninguna llave de API ni instalar una librería para las peticiones, porque `fetch` ya viene incluido. Lo único extra que se instaló fue `react-native-safe-area-context`.

## Estructura de carpetas

```
pokedex-explorer/
├── App.js                      decide si se ve la lista o la ficha
└── src/
    ├── services/
    │   └── pokeApi.js          hace las peticiones a la API
    ├── hooks/
    │   ├── usePokemonList.js   carga la lista y el scroll infinito
    │   └── usePokemonDetail.js carga la ficha y guarda su estado
    ├── screens/
    │   ├── HomeScreen.js       la pantalla de la lista y el buscador
    │   └── DetailScreen.js     la pantalla de la ficha
    ├── components/
    │   ├── PokemonCard.js      la tarjeta de cada Pokémon en la lista
    │   ├── SearchBar.js        la barra de búsqueda y el botón "Buscar"
    │   ├── TypeBadge.js        el distintivo de color de cada tipo
    │   ├── StatBar.js          la barra de cada estadística
    │   └── StatusView.js       los mensajes de cargando, error y vacío
    ├── theme/
    │   ├── colors.js           colores y espacios de toda la app
    │   └── typeColors.js       color y nombre en español de cada tipo
    └── utils/
        └── format.js           funciones pequeñas para dar formato a los datos
```

## Por qué la organizamos así

La idea principal fue separar la parte que habla con internet de la parte que se ve en pantalla.

- **`services/`** es el único lugar donde está el `fetch`. Si algo cambia en la API, solo se toca `pokeApi.js`. Ningún componente tiene llamadas a la API mezcladas con estilos y JSX.
- **`hooks/`** guarda la lógica de cuándo se carga algo y en qué estado está (cargando, error o listo). Así las pantallas no se llenan de `useEffect` y `useState` de red.
- **`screens/` y `components/`** solo dibujan lo que reciben. Las pantallas arman la vista y los componentes son piezas que se reutilizan.
- **`theme/`** junta colores y espacios en un solo lugar, para que toda la app se vea igual y sea fácil cambiarlos.
- **`utils/`** tiene funciones pequeñas que no dependen de React, como poner el número con 3 dígitos.

## Cómo funciona el cambio entre la lista y la ficha

No usamos una librería de navegación, porque el taller pide una sola pantalla principal con dos vistas. En `App.js` hay un estado (`selectedQuery`) que guarda qué Pokémon se abrió. Si es `null`, se ve la lista. Si tiene un valor, se muestra la ficha.

La lista no se desmonta cuando abrimos una ficha, solo se oculta. Así, al volver, no se recarga y se conserva el scroll. El botón "atrás" de Android también regresa a la lista.

## Cómo se maneja la API

- La lista usa `GET /pokemon?limit=20&offset=...`. Solo trae nombre y URL, así que el id se saca del final de la URL.
- La ficha usa `GET /pokemon/{nombre o id}`.
- Antes de leer la respuesta se revisa `response.ok`, porque un nombre que no existe responde 404 con texto y no con JSON.
- La altura viene en decímetros y el peso en hectogramos, por eso se divide entre 10.
- Las imágenes de la lista se arman con el id, sin pedir la ficha completa.
