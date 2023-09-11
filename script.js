var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
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
            display.updateUpgrades()
        }
    }
}

var upgrade = {
    name: [
        'Stone Fingers',
        'Iron Fingers',
        'Stone Clicker'
    ],
    description: [
        'Pens are twice as efficient',
        'Pens are twice as efficient',
        'Mouse are twice as efficient'
    ],
    image: [
        'pen.png', 
        'pen.png',
        'pen.png'
    ],
    type: [
        'building',
        'building',
        'click'
    ],
    cost: [
        300,
        500,
        300
    ],
    buildingIndex: [
        0,
        0,
        -1,
    ],
    requirement: [
        1,
        5,
        1
    ],
    bonus: [
        2,
        2,
        2
    ],
    purchased: [false, false, false],

    purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == 'building' && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index]
                building.income[this.buildingIndex[index]] *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades()
                display.updateScore()
            }  else if (this.type[index] == 'click' && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index]
                game.clickValue *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades()
                display.updateScore()
            }
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
    },

    updateUpgrades: function() {
        document.getElementById('upgradeContainer').innerHTML = ''
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == 'building' && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById('upgradeContainer').innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' box)" onclick="upgrade.purchase('+i+')">'
                } else if (upgrade.type[i] == 'click' && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById('upgradeContainer').innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' box)" onclick="upgrade.purchase('+i+')">'
                }
            }
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
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
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
        if (typeof savedGame.upgradePurchased !== 'undefined') {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i]
            }
        }
    }
}

document.getElementById('clicker').addEventListener('click', function() {
    game.totalClicks++
    game.addToScore(game.clickValue)
}, false)

function resetGame() {
    if (confirm('Are you sure you want to reset your game?')) {
        var gameSave = {}
        localStorage.setItem('gameSave', JSON.stringify(gameSave))
        location.reload()
    }
}

window.onload = function() {
    loadGame()
    display.updateScore()
    display.updateUpgrades()
    display.updateShop()
}

setInterval(function() {
    game.score += game.getScorePerSecond()
    game.totalScore += game.getScorePerSecond()
    display.updateScore()
}, 1000) // 1000ms = 1 second


setInterval(function() {
    display.updateScore()
    display.updateUpgrades()
}, 10000) // 10000ms = 10 seconds

setInterval (function() {
    saveGame()
}, 30000) // 30000ms = 30 seconds

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault()
        saveGame()
    }
}, false)