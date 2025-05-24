async function main() {
    await fetch('https://semi.mobit.app/')
    console.log('success')
}

setInterval(main, 1000)