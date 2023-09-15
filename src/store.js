import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Answer } from './answers';
import { fixCapitalization } from "./util";

var poke = [
    {
        "name": "bulbasaur",
        "type": ["grass", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 4
    },
    {
        "name": "ivysaur",
        "type": ["grass", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 4
    },
    {
        "name": "venusaur",
        "type": ["grass", "poison"],
        "stage": 3,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 4
    },
    {
        "name": "charmander",
        "type": ["fire"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 2
    },
    {
        "name": "charmeleon",
        "type": ["fire"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 2
    },
    {
        "name": "charizard",
        "type": ["fire", "flying"],
        "stage": 3,
        "legendary": false,
        "color": "red",
        "wings": true,
        "legs": 2
    },
    {
        "name": "squirtle",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "wartortle",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "blastoise",
        "type": ["water"],
        "stage": 3,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "caterpie",
        "type": ["bug"],
        "stage": 1,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 4
    },
    {
        "name": "metapod",
        "type": ["bug"],
        "stage": 2,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 0
    },
    {
        "name": "butterfree",
        "type": ["bug", "flying"],
        "stage": 3,
        "legendary": false,
        "color": "purple",
        "wings": true,
        "legs": 2
    },
    {
        "name": "weedle",
        "type": ["bug", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 14
    },
    {
        "name": "kakuna",
        "type": ["bug", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "beedrill",
        "type": ["bug", "poison"],
        "stage": 3,
        "legendary": false,
        "color": "yellow",
        "wings": true,
        "legs": 2
    },
    {
        "name": "pidgey",
        "type": ["normal", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "pidgeotto",
        "type": ["normal", "flying"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "pidgeot",
        "type": ["normal", "flying"],
        "stage": 3,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "rattata",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 4
    },
    {
        "name": "raticate",
        "type": ["normal"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "spearow",
        "type": "normal, flying",
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "fearow",
        "type": "normal, flying",
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "ekans",
        "type": ["poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 2
    },
    {
        "name": "arbok",
        "type": ["poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 2
    },
    {
        "name": "sandshrew",
        "type": ["ground"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "sandslash",
        "type": ["ground"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "nidoran female",
        "type": ["poison"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 4
    },
    {
        "name": "nidorina",
        "type": ["poison"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "nidoqueen",
        "type": ["poison", "ground"],
        "stage": 3,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "nidoran male",
        "type": ["poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 4
    },
    {
        "name": "nidorino",
        "type": ["poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 4
    },
    {
        "name": "nidoking",
        "type": ["poison", "ground"],
        "stage": 3,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 2
    },
    {
        "name": "pikachu",
        "type": ["electric"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "raichu",
        "type": ["electric"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "clefairy",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "clefable",
        "type": ["normal"],
        "stage": 2,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "vulpix",
        "type": ["fire"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "ninetales",
        "type": ["fire"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 4
    },
    {
        "name": "jigglypuff",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "wigglytuff",
        "type": ["normal"],
        "stage": 2,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "zubat",
        "type": ["poison", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": true,
        "legs": 2
    },
    {
        "name": "golbat",
        "type": ["poison", "flying"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": true,
        "legs": 2
    },
    {
        "name": "oddish",
        "type": ["grass", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "gloom",
        "type": ["grass", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "vileplume",
        "type": ["grass", "poison"],
        "stage": 3,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 2
    },
    {
        "name": "paras",
        "type": ["bug", "grass"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "parasect",
        "type": ["bug", "grass"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 6
    },
    {
        "name": "venonat",
        "type": ["bug", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 2
    },
    {
        "name": "venomoth",
        "type": ["bug", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": true,
        "legs": 0
    },
    {
        "name": "diglett",
        "type": ["ground"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 0
    },
    {
        "name": "dugtrio",
        "type": ["ground"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 0
    },
    {
        "name": "meowth",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "persian",
        "type": ["normal"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 4
    },
    {
        "name": "psyduck",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "golduck",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "mankey",
        "type": ["fighting"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "primeape",
        "type": ["fighting"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "growlithe",
        "type": ["fire"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "arcanine",
        "type": ["fire"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "poliwag",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "poliwhirl",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "poliwrath",
        "type": ["water", "fighting"],
        "stage": 3,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "abra",
        "type": ["psychic"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "kadabra",
        "type": ["psychic"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "alakazam",
        "type": ["psychic"],
        "stage": 3,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "machop",
        "type": ["fighting"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "machoke",
        "type": ["fighting"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "machamp",
        "type": ["fighting"],
        "stage": 3,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "bellsprout",
        "type": ["grass", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 2
    },
    {
        "name": "weepinbell",
        "type": ["grass", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 0
    },
    {
        "name": "victreebel",
        "type": ["grass", "poison"],
        "stage": 3,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 0
    },
    {
        "name": "tentacool",
        "type": ["water", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "tentacruel",
        "type": ["water", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 4
    },
    {
        "name": "geodude",
        "type": ["rock", "ground"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 0
    },
    {
        "name": "graveler",
        "type": ["rock", "ground"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "golem",
        "type": ["rock", "ground"],
        "stage": 3,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "ponyta",
        "type": ["fire"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 4
    },
    {
        "name": "rapidash",
        "type": ["fire"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 4
    },
    {
        "name": "slowpoke",
        "type": ["water", "psychic"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 4
    },
    {
        "name": "slowbro",
        "type": ["water", "psychic"],
        "stage": 2,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "magnemite",
        "type": ["electric"],
        "stage": 1,
        "legendary": false,
        "color": "gray",
        "wings": false,
        "legs": 0
    },
    {
        "name": "magneton",
        "type": ["electric"],
        "stage": 2,
        "legendary": false,
        "color": "gray",
        "wings": false,
        "legs": 0
    },
    {
        "name": "farfetch'd",
        "type": ["normal", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": true,
        "legs": 2
    },
    {
        "name": "doduo",
        "type": ["normal", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "dodrio",
        "type": ["normal", "flying"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "seel",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "white",
        "wings": false,
        "legs": 0
    },
    {
        "name": "dewgoing",
        "type": ["water", "ice"],
        "stage": 2,
        "legendary": false,
        "color": "white",
        "wings": false,
        "legs": 0
    },
    {
        "name": "grimer",
        "type": ["poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "muk",
        "type": ["poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "shellder",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "cloyster",
        "type": ["water", "ice"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "gastly",
        "type": ["ghost", "poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "haunter",
        "type": ["ghost", "poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "gengar",
        "type": ["ghost", "poison"],
        "stage": 3,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "onix",
        "type": ["rock", "ground"],
        "stage": 1,
        "legendary": false,
        "color": "gray",
        "wings": false,
        "legs": 0
    },
    {
        "name": "drowzee",
        "type": ["psychic"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "hypno",
        "type": ["psychic"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "krabby",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "kingler",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "voltorb",
        "type": ["electric"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 0
    },
    {
        "name": "electrode",
        "type": ["electric"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 0
    },
    {
        "name": "exeggcute",
        "type": ["grass", "psychic"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 0
    },
    {
        "name": "exeggutor",
        "type": ["grass", "psychic"],
        "stage": 2,
        "legendary": false,
        "color": "green",
        "wings": false,
        "legs": 2
    },
    {
        "name": "cubone",
        "type": ["ground"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "marowak",
        "type": ["ground"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "hitmonlee",
        "type": ["fighting"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "hitmonchan",
        "type": ["fighting"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "lickitung",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "koffing",
        "type": ["poison"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "weezing",
        "type": ["poison"],
        "stage": 2,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "rhyhorn",
        "type": ["ground", "rock"],
        "stage": 1,
        "legendary": false,
        "color": "gray",
        "wings": false,
        "legs": 4
    },
    {
        "name": "rhydon",
        "type": ["ground", "rock"],
        "stage": 2,
        "legendary": false,
        "color": "gray",
        "wings": false,
        "legs": 2
    },
    {
        "name": "chansey",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "tangela",
        "type": ["grass"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "kangaskhan",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "horsea",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "seadra",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "goldeen",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 0
    },
    {
        "name": "seaking",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 0
    },
    {
        "name": "staryu",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 0
    },
    {
        "name": "starmie",
        "type": ["water", "psychic"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "mr. mime",
        "type": ["psychic"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 2
    },
    {
        "name": "scyther",
        "type": ["bug", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "green",
        "wings": true,
        "legs": 2
    },
    {
        "name": "jynx",
        "type": ["ice", "psychic"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 2
    },
    {
        "name": "electabuzz",
        "type": ["electric"],
        "stage": 1,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 2
    },
    {
        "name": "pinsir",
        "type": ["fire"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "tauros",
        "type": ["bug"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 4
    },
    {
        "name": "magikarp",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 0
    },
    {
        "name": "magmar",
        "type": ["water"],
        "stage": 1,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 2
    },
    {
        "name": "gyarados",
        "type": ["water", "flying"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "lapras",
        "type": ["water", "ice"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "ditto",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": false,
        "legs": 0
    },
    {
        "name": "eevee",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 4
    },
    {
        "name": "vaporeon",
        "type": ["water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 4
    },
    {
        "name": "jolteon",
        "type": ["electric"],
        "stage": 2,
        "legendary": false,
        "color": "yellow",
        "wings": false,
        "legs": 4
    },
    {
        "name": "flareon",
        "type": ["fire"],
        "stage": 2,
        "legendary": false,
        "color": "red",
        "wings": false,
        "legs": 4
    },
    {
        "name": "porygon",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "pink",
        "wings": false,
        "legs": 0
    },
    {
        "name": "omanyte",
        "type": ["rock", "water"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "omastar",
        "type": ["rock", "water"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "kabuto",
        "type": ["rock", "water"],
        "stage": 1,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 6
    },
    {
        "name": "kabutops",
        "type": ["rock", "water"],
        "stage": 2,
        "legendary": false,
        "color": "brown",
        "wings": false,
        "legs": 2
    },
    {
        "name": "aerodactyl",
        "type": ["rock", "flying"],
        "stage": 1,
        "legendary": false,
        "color": "purple",
        "wings": true,
        "legs": 2
    },
    {
        "name": "snorlax",
        "type": ["normal"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 2
    },
    {
        "name": "articuno",
        "type": ["ice", "flying"],
        "stage": 1,
        "legendary": true,
        "color": "blue",
        "wings": true,
        "legs": 2
    },
    {
        "name": "zapdos",
        "type": ["electric", "flying"],
        "stage": 1,
        "legendary": true,
        "color": "yellow",
        "wings": true,
        "legs": 2
    },
    {
        "name": "moltres",
        "type": ["fire", "flying"],
        "stage": 1,
        "legendary": true,
        "color": "yellow",
        "wings": true,
        "legs": 2
    },
    {
        "name": "dratini",
        "type": ["dragon"],
        "stage": 1,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "dragonair",
        "type": ["dragon"],
        "stage": 2,
        "legendary": false,
        "color": "blue",
        "wings": false,
        "legs": 0
    },
    {
        "name": "dragonite",
        "type": ["dragon", "flying"],
        "stage": 3,
        "legendary": false,
        "color": "yellow",
        "wings": true,
        "legs": 2
    },
    {
        "name": "mewtwo",
        "type": ["psychic"],
        "stage": 1,
        "legendary": true,
        "color": "purple",
        "wings": false,
        "legs": 2
    },
    {
        "name": "mew",
        "type": ["psychic"],
        "stage": 1,
        "legendary": true,
        "color": "pink",
        "wings": false,
        "legs": 2
    }
];

const initialStore = {
    pokemon: poke,
    question: {
        "current": null
    },
    won: false
};

function reducer(state, answer) {
    var bool = answer.type === Answer.True ? true : false;
    var bool2 = false;
    var newPoke;
    switch (state.question.current) {
        case ("w"):
            newPoke = state.pokemon.filter(p => p.wings === bool);
            bool2 = true;
            break;
        case ("l"):
            newPoke = state.pokemon.filter(p => (p.legs === state.question.param) === bool);
            break;
        case ("c"):
            newPoke = state.pokemon.filter(p => (p.color === state.question.param) === bool);
            break;
        case ("t"):
            newPoke = state.pokemon.filter(p => p.type.includes(state.question.param) === bool);
            break;
        case ("s"):
            newPoke = state.pokemon.filter(p => p.legendary === bool);
            bool2 = true;
            break;
        case ("n"):
            newPoke = state.pokemon.filter(p => (p.stage === state.question.param) === bool);
            break;
        case ("p"):
            if (bool) {
                return {
                    ...state,
                    won: true
                };
            }
            newPoke = state.pokemon;
            break;
        default:
            return {
                ...state,
                question: randomQuestion(null, poke)
            }
    }
    console.log(state.pokemon.length);
    console.log(state.pokemon);
    if (bool || bool2) state.question.list = state.question.list.filter(i => i !== state.question.current);
    return {
        ...state,
        pokemon: newPoke,
        question: randomQuestion(state.question, newPoke)
    };
}

export function randomQuestion(q, p) {
    var newQ;
    if (Math.floor(Math.random() * 6) === 2 || p.length < 4) {
        newQ = q;
        newQ.current = "p";
        newQ.text = "Is it " + fixCapitalization(p.pop().name) + "?";
        return newQ;
    }
    if (q == null) {
        newQ = {
            "count": 1,
            "list": ["w", "l", "c", "t", "s", "n"],
            "text": null,
            "param": null,
            "current": null,
            "aColors": ["red", "pink", "yellow", "blue", "brown", "purple", "green", "gray", "white"],
            "aStages": [1, 2, 3],
            "aTypes": ["grass", "bug", "dragon", "poison", "fire", "water", "flying", "ice", 
                "ground", "rock", "normal", "psychic", "ghost", "fighting", "electric"],
            "aLegs": [0, 2, 4]
        };
    } else {
        newQ = q;
        newQ.count++;
    }
    var randPoke = p[Math.floor(Math.random() * p.length)];
    var randQuest = newQ.list[Math.floor(Math.random() * newQ.list.length)];
    newQ.current = randQuest;
    switch (randQuest) {
        case ("w"):
            newQ.text = newQ.count + ". Does the Pokemon have wings?";
            break;
        case ("s"):
            newQ.text = newQ.count + ". Is it a legendary Pokemon?";
            break;
        case ("l"):
            newQ.param = randPoke.legs;
            newQ.text = newQ.count + ". Does it have " + newQ.param + " legs?";
            newQ.aLegs = newQ.aLegs.filter(item => item !== newQ.param);
            if (newQ.aLegs.length === 1) newQ.list = newQ.list.filter(item => item !== "l");
            break;
        case ("n"):
            newQ.param = randPoke.stage;
            newQ.text = newQ.count + ". Is it a stage " + newQ.param + " Pokemon?";
            newQ.aStages = newQ.aStages.filter(item => item !== newQ.param);
            if (newQ.aStages.length === 1) newQ.list = newQ.list.filter(item => item !== "n");
            break;
        case ("c"):
            newQ.param = randPoke.color;
            newQ.text = newQ.count + ". Is it " + newQ.param + "?";
            newQ.aColors = newQ.aColors.filter(item => item !== newQ.param);
            if (newQ.aColors.length === 1) newQ.list = newQ.list.filter(item => item !== "c");
            break;
        case ("t"):
            newQ.param = randPoke.type[Math.floor(Math.random() * randPoke.type.length)];
            newQ.text = newQ.count + ". Is it " + newQ.param + " type?";
            newQ.aTypes = newQ.aTypes.filter(item => item !== newQ.param);
            if (newQ.aTypes.length === 1) newQ.list = newQ.list.filter(item => item !== "t");
            break;
        default:
            break;
    }
    console.log(newQ);
    return newQ;
}

export const store = createStore(reducer, initialStore, applyMiddleware(thunk));