if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://alibhtty.github.io/cyborg/sw.js')
    .then(reg=>console.log('Registro de SW existoso',reg))
    .catch(err=>console.warn('Error al tratar de registrar el SW',
    err))
}