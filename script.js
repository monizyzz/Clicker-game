var score = 0
var clickingPower = 1

var penCost = 15 
var pens = 0

var scissorCost = 100
var scissors = 0

var hammerCost = 500
var hammers = 0

var chainsawCost = 1500
var chainsaws = 0 

var thorhammerCost = 10000
var thorhammers = 0

function addToScore(amount) {
    score = score + amount
    document.getElementById('score').innerHTML = score
}

function buyPen() {
    if (score >= penCost) {
        score = score - penCost
        pens++
        penCost = Math.round(penCost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('pencost').innerHTML = penCost
        document.getElementById('pens').innerHTML = pens
        updateScorePerSecond()
    }
}

function buyScissor() {
    if (score >= scissorCost) {
        score = score - scissorCost
        scissors++
        scissorCost = Math.round(scissorCost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('scissorcost').innerHTML = scissorCost
        document.getElementById('scissors').innerHTML = scissors
        updateScorePerSecond()
    }
}

function buyHammer() {
    if (score >= hammerCost) {
        score = score - hammerCost
        hammers++
        hammerCost = Math.round(hammerCost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('hammercost').innerHTML = hammerCost
        document.getElementById('hammers').innerHTML = hammers
        updateScorePerSecond()
    }
}

function buyChainsaw() {
    if (score >= chainsawCost) {
        score = score - chainsawCost
        chainsaws++
        chainsawCost = Math.round(chainsawCost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('chainsawcost').innerHTML = chainsawCost
        document.getElementById('chainsaws').innerHTML = chainsaws
        updateScorePerSecond()
    }
}

function buyThorHammer() {
    if (score >= thorhammerCost) {
        score = score - thorhammerCost
        thorhammers++
        thorhammerCost = Math.round(thorhammerCost * 1.15)

        document.getElementById('score').innerHTML = score
        document.getElementById('thorhammercost').innerHTML = thorhammerCost
        document.getElementById('thorhammers').innerHTML = thorhammers
        updateScorePerSecond()
    }
}

function updateScorePerSecond() {
    scorePerSecond = pens + scissors * 3 + hammers * 5 + chainsaws * 10 + thorhammers * 50
    document.getElementById('scorepersecond').innerHTML = scorePerSecond
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem('gameSave'))
    if (typeof savedGame.score !== 'undefined') score = savedGame.score
    if (typeof savedGame.clickingPower !== 'undefined') clickingPower = savedGame.clickingPower
    if (typeof savedGame.penCost !== 'undefined') penCost = savedGame.penCost
    if (typeof savedGame.pens !== 'undefined') pens = savedGame.pens
    if (typeof savedGame.scissorCost !== 'undefined') scissorCost = savedGame.scissorCost
    if (typeof savedGame.scissors !== 'undefined') scissors = savedGame.scissors
    if (typeof savedGame.hammerCost !== 'undefined') hammerCost = savedGame.hammerCost
    if (typeof savedGame.hammers !== 'undefined') hammers = savedGame.hammers
    if (typeof savedGame.chainsawCost !== 'undefined') chainsawCost = savedGame.chainsawCost
    if (typeof savedGame.chainsaws !== 'undefined') chainsaws = savedGame.chainsaws
    if (typeof savedGame.thorhammerCost !== 'undefined') thorhammerCost = savedGame.thorhammerCost
    if (typeof savedGame.thorhammers !== 'undefined') thorhammers = savedGame.thorhammers
}

function saveGame() {
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        penCost: penCost,
        pens: pens, 
        scissorCost: scissorCost,
        scissors: scissors,
        hammerCost: hammerCost,
        hammers: hammers,
        chainsawCost: chainsawCost,
        chainsaws: chainsaws,  
        thorhammerCost: thorhammerCost, 
        thorhammers: thorhammers 
    }
    localStorage.setItem('gameSave', JSON.stringify(gameSave))
}

function resetGame() {
    if (confirm('Are you sure you want to reset your game?')) {
        var gameSave = {}
        localStorage.setItem('gameSave', JSON.stringify(gameSave))
        location.reload()
    }
}

window.onload = function() {
    loadGame()
    updateScorePerSecond()
    document.getElementById('score').innerHTML = score
    document.getElementById('pencost').innerHTML = penCost
    document.getElementById('pens').innerHTML = pens
    document.getElementById('scissorcost').innerHTML = scissorCost
    document.getElementById('scissors').innerHTML = scissors
    document.getElementById('hammercost').innerHTML = hammerCost
    document.getElementById('hammers').innerHTML = hammers
    document.getElementById('chainsawcost').innerHTML = chainsawCost
    document.getElementById('chainsaws').innerHTML = chainsaws
    document.getElementById('thorhammercost').innerHTML = thorhammerCost
    document.getElementById('thorhammers').innerHTML = thorhammers
}

setInterval (function() {
    score += pens
    score += scissors * 3
    score += hammers * 5
    score += chainsaws * 10
    score += thorhammers * 50

    document.getElementById('score').innerHTML = score

    document.title = score + " box - Box Clicker"
}, 1000) // 1000ms = 1 second 

setInterval (function() {
    saveGame()
}, 30000) // 30000ms = 30 seconds

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault()
        saveGame()
    }
}, false)