import './scss/styles.scss'
require('./js/animation')
require('./js/getCharactersAxios')
require('./js/chart')

const worker = new Worker('worker.js');
worker.postMessage('')

worker.onmessage = function (message) {
   // alert('Worker finished calculation and final sum is ' + message.data)
}