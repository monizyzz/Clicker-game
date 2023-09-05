var score = 0
var clickingPower = 1

var penCost = 15 
var pens = 0

var scissorCost = 100
var scissors = 0

var hammerCost = 500
var hammers = 0

var chainsawCost = 1000
var chainsaws = 0 

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
    }
}


setInterval (function() {
    score = score + pens
    score = score + scissors * 5
    score = score + hammers * 10
    score = score + chainsaws * 15

    document.getElementById('score').innerHTML = score
}, 1000) // 1000ms = 1 second 