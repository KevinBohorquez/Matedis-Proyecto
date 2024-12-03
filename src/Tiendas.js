import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Icon } from "leaflet";

class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    insert(node) {
        this.heap.push(node);
        let index = this.heap.length - 1;

        while (index > 0 && this.heap[this.parent(index)][0] > this.heap[index][0]) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    pop() {
        if (this.heap.length === 0) return null;

        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();

        this.heapify(0);

        return min;
    }

    heapify(index) {
        let smallest = index;
        const left = this.leftChild(index);
        const right = this.rightChild(index);

        if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapify(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
}

class Nodo {
    constructor(nombre, geocode) {
        this.nombre = nombre;
        this.geocode = geocode;
        this.vecinos = [];
    }

    agregarVecino(vecino, costo = 1) {
        this.vecinos.push({ vecino, costo });
    }
}

class AStar {
    constructor(inicio, destino, nodos) {
        this.inicio = inicio;
        this.destino = destino;
        this.nodos = nodos;
        this.openList = new MinHeap();
        this.closedList = new Set();
    }

    calcularHeuristica(nodo) {
        return distanciaHaversine(nodo, this.nodos[this.destino]);
    }

    reconstruirRuta(cameFrom) {
        let ruta = [];
        let actual = this.nodos[this.destino];
        
        if (!cameFrom[actual.nombre]) {
            return ruta;
        }
    
        while (actual !== null) {
            ruta.unshift(actual);
            actual = cameFrom[actual.nombre] || null;
        }
        return ruta;
    }
    

    ejecutar() {
        const startNode = this.nodos[this.inicio];
        startNode.g = 0;
        startNode.h = this.calcularHeuristica(startNode);
        startNode.f = startNode.g + startNode.h;

        this.openList.insert([startNode.f, startNode]);

        const cameFrom = {};

        while (this.openList.size() > 0) {
            const currentNode = this.openList.pop()[1];

            if (currentNode.nombre === this.destino) {
                return this.reconstruirRuta(cameFrom);
            }

            this.closedList.add(currentNode.nombre);

            for (const vecino of currentNode.vecinos) {
                const { vecino: vecinoNodo, costo } = vecino;

                if (this.closedList.has(vecinoNodo.nombre)) {
                    continue;
                }

                const tentative_gScore = currentNode.g + costo;

                let mejorVecino = this.openList.heap.find((item) => item[1].nombre === vecinoNodo.nombre);
                let mejorVecinoG = mejorVecino ? mejorVecino[1].g : Infinity;

                if (tentative_gScore < mejorVecinoG) {
                    cameFrom[vecinoNodo.nombre] = currentNode;

                    vecinoNodo.g = tentative_gScore;
                    vecinoNodo.h = this.calcularHeuristica(vecinoNodo);
                    vecinoNodo.f = vecinoNodo.g + vecinoNodo.h;

                    if (!this.openList.heap.some((item) => item[1].nombre === vecinoNodo.nombre)) {
                        this.openList.insert([vecinoNodo.f, vecinoNodo]);
                    }
                }
            }
        }
        return [];
    }
}

function distanciaHaversine(nodo1, nodo2) {
    const [lat1, lon1] = nodo1.geocode;
    const [lat2, lon2] = nodo2.geocode;

    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;

    const dlat = radLat2 - radLat1;
    const dlon = radLon2 - radLon1;

    const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    const r = 6371;
    return c * r;
}

function cargarNodosDesdeJson(archivoJson) {
    return fetch(archivoJson)
        .then((response) => response.json())
        .then((data) => {
            const nodos = {};

            data.markers.forEach((marker) => {
                const { name, lat, lng } = marker;
                const nodo = new Nodo(name, [lat, lng]);
                nodos[name] = nodo;
            });

            data.connections.forEach((conexion) => {
                const origen = conexion.from;
                const destinos = conexion.to;

                if (origen in nodos) {
                    destinos.forEach((destino) => {
                        if (destino in nodos) {
                            const costo = distanciaHaversine(nodos[origen], nodos[destino]);
                            nodos[origen].agregarVecino(nodos[destino], costo);
                        }
                    });
                }
            });
            return nodos;
        })
        .catch((error) => {
            console.error("Error al cargar el archivo JSON:", error);
        });
}

const MainDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;

`

const MapDiv = styled.div`
    border: 2px solid red;
    width: 650px;
    height: auto;
    .leaflet-container {
        height: 100vh;
    }
`;

const ControllerDiv = styled.div`
    padding:90px;
    select {
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        width: 200px;
        margin: 10px;
    }

    option {
        padding: 10px;
    }
`

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
    iconAnchor: [19, 40]
});

const Tiendas = () => {
    const [nodos, setNodos] = useState({});
    const [ruta, setRuta] = useState([]);
    const [costoTotal, setCostoTotal] = useState(null);

    const [origenOption, setOrigenOption] = useState("Paradero FISI");
    const [destinoOption, setDestinoOption] = useState("Paradero FISI");

    const origenChange = (event) => {
        setOrigenOption(event.target.value);
    };

    const destinoChange = (event) => {
        setDestinoOption(event.target.value);
    };

    useEffect(() => {
        cargarNodosDesdeJson("places.json").then((nodosCargados) => {
            setNodos(nodosCargados);
        });
    }, []);

    const handleBuscarRuta = (archivoJson) => {
        cargarNodosDesdeJson(archivoJson).then((nodos) => {
            const astar = new AStar(origenOption, destinoOption, nodos);
            const ruta = astar.ejecutar();
            
            if (ruta.length > 0) {
                let distanciaTotal = 0;
                const markers = [];
    
                for (let i = 0; i < ruta.length - 1; i++) {
                    distanciaTotal += distanciaHaversine(ruta[i], ruta[i + 1]);
                }
    
                const primerNodo = ruta[0];
                markers.push({
                    lat: primerNodo.geocode[0],
                    lng: primerNodo.geocode[1],
                    popup: origenOption,
                });
    
                const ultimoNodo = ruta[ruta.length - 1];
                markers.push({
                    lat: ultimoNodo.geocode[0],
                    lng: ultimoNodo.geocode[1],
                    popup: destinoOption,
                });
    
                setRuta(ruta.map((nodo) => ({ lat: nodo.geocode[0], lng: nodo.geocode[1] })));
                setCostoTotal(distanciaTotal);
    
                setMarkers(markers);
            } else {
                console.log("No se encontró ruta.");
            }
        });
    };
    
    const [markers, setMarkers] = useState([]);


    return (
        <MainDiv>
            <ControllerDiv>
                <div>
                <h3>Selecciona un origen</h3>
                    <select value={origenOption} onChange={origenChange}>
                        <option value="Paradero FISI">Paradero FISI</option>
                        <option value="Paradero Biblioteca">Paradero Biblioteca</option>
                        <option value="Paradero Comedor">Paradero Comedor</option>
                        <option value="Puerta 7">Puerta 7</option>
                        <option value="Puerta 5">Puerta 5</option>
                        <option value="Puerta 4">Puerta 4</option>
                        <option value="Puerta 3">Puerta 3</option>
                        <option value="Puerta 2">Puerta 2</option>
                        <option value="Puerta 1">Puerta 1</option>
                        <option value="Comedor">Comedor</option>
                        <option value="Clinica">Clinica</option>
                        <option value="Biblioteca">Biblioteca</option>
                    </select>

                <h3>Selecciona un destino</h3>
                    <select value={destinoOption} onChange={destinoChange}>
                        <option value="Paradero FISI">Paradero FISI</option>
                        <option value="Paradero Biblioteca">Paradero Biblioteca</option>
                        <option value="Paradero Comedor">Paradero Comedor</option>
                        <option value="Puerta 7">Puerta 7</option>
                        <option value="Puerta 5">Puerta 5</option>
                        <option value="Puerta 4">Puerta 4</option>
                        <option value="Puerta 3">Puerta 3</option>
                        <option value="Puerta 2">Puerta 2</option>
                        <option value="Puerta 1">Puerta 1</option>
                        <option value="Comedor">Comedor</option>
                        <option value="Clinica">Clinica</option>
                        <option value="Biblioteca">Biblioteca</option>
                    </select>
                </div>
                <div>
                <button onClick={() => handleBuscarRuta("/places.json")}>
                    Buscar Ruta mas corta
                </button>
                {costoTotal !== null && <div>Costo total: {costoTotal} km</div>}
                </div>
            </ControllerDiv>


            <MapDiv>
            <MapContainer center={[-12.0564241, -77.0845688]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {ruta.length > 0 && <Polyline positions={ruta} color="blue" />}
                {markers.map((markerData) => (
                    <Marker key={markerData.key} position={[markerData.lat, markerData.lng]} icon={customIcon}>
                        <Popup>{markerData.popup}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            </MapDiv>
        </MainDiv>
        
    );
};

export default Tiendas;
