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

setInterval (function() {
    score += pens
    score += scissors * 3
    score += hammers * 5
    score += chainsaws * 10
    score += thorhammers * 50

    document.getElementById('score').innerHTML = score

    document.title = score + " box - Box Clicker"
}, 1000) // 1000ms = 1 second 