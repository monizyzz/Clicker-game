var game = {
    score: 0,
    totalScore: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function(amount) {
        this.score += amount
        this.totalScore += amount
        display.updateScore()
    }, 

    getScorePerSecond: function() {
        var scorePerSecond = 0
        for (i = 0; i < building.name.length; i++) {
            scorePerSecond += building.income[i] * building.count[i]
        }
        return scorePerSecond
    }
}

var building = {
    name: [
        'Pen',
        'Scissor',
        'Hammer',
        'Chainsaw',
        'Thor Hammer'
    ],
    image: [
        'pen.png',
        'scissor.png',
        'hammer.webp',
        'chainsaw.webp',
        'thor-hammer.png'
    ],
    count: [0, 0, 0, 0, 0],
    income: [
        1,
        3,
        5,
        10,
        50
    ],
    cost: [
        15,
        100,
        500,
        1500,
        10000
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]){
            game.score -= this.cost[index]
            this.count[index]++
            this.cost[index]  = Math.ceil(this.cost[index] * 1.15)
            display.updateScore()
            display.updateShop()
        }
    }
}
 
var display = {
    updateScore: function() {
        document.getElementById('score').innerHTML = game.score
        document.getElementById('scorepersecond').innerHTML = game.getScorePerSecond()
        document.title = game.score + ' box - Box Clicker'
    },

    updateShop: function() {
        document.getElementById('shopContainer').innerHTML = ''
        for (i = 0; i < building.name.length; i++) {
            document.getElementById('shopContainer').innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td class="image unselectable"><img src="images/'+building.image[i]+'" alt="pen"></td><td class="nameAndCost unselectable"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> box</p></td><td class="amount unselectable"><span>'+building.count[i]+'</span></td></tr></table>'
        }
    }
}

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost
    }
    localStorage.setItem('gameSave', JSON.stringify(gameSave))
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem('gameSave'))
    if (localStorage.getItem('gameSave') !== null) {
        if (typeof savedGame.score !== 'undefined') game.score = savedGame.score
        if (typeof savedGame.totalScore !== 'undefined') game.totalScore = savedGame.totalScore
        if (typeof savedGame.clickValue !== 'undefined') game.clickValue = savedGame.clickValue
        if (typeof savedGame.totalClicks !== 'undefined') game.totalClicks = savedGame.totalClicks
        if (typeof savedGame.buildingCount !== 'undefined') {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i]
            }
        }
        if (typeof savedGame.buildingIncome !== 'undefined') {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i]
            }
        }
        if (typeof savedGame.buildingCost !== 'undefined') {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i]
            }
        }
    }
}

window.onload = function() {
    loadGame()
    display.updateScore()
    display.updateShop()
}

setInterval(function() {
    game.score += game.getScorePerSecond()
    game.totalScore += game.getScorePerSecond()
    display.updateScore()
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