// Constantes

const axios = require("axios")
const fs = require("fs")
const colors = require('colors');

const API_EPISODE = "https://rickandmortyapi.com/api/episode/?page="
const API_CHARACTER = "https://rickandmortyapi.com/api/character/?page="
const API_LOCATION = "https://rickandmortyapi.com/api/location/?page="
const JSON_FINAL = []



module.exports = {axios,fs,colors,API_EPISODE,API_CHARACTER,API_LOCATION,JSON_FINAL}