let hasLocalScore;
console.log(localStorage.getItem("highScore"))
if(localStorage.getItem("highScore") != null) {
    $("#highScore").html("High Score: " + localStorage.getItem("highScore"))
    hasLocalScore = true;
} else {
    hasLocalScore = false;
}

fruitList = [["Images/apple.png", "Images/apple.png", "Images/banana.png", "Images/banana.png",],
             ["Images/grapefruit.png", "Images/grapefruit.png", "Images/grape.png", "Images/grape.png",],
             ["Images/olive.png", "Images/olive.png", "Images/orange.png", "Images/orange.png",],
             ["Images/pomegranate.png", "Images/pomegranate.png", "Images/starfruit.png", "Images/starfruit.png",]]

function randomize() {
    for (i=0;i<4;i++) {
        for (j=0;j<4;j++) {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
            temp = fruitList[row][col]
            fruitList[row][col] = fruitList[i][j]
            fruitList[i][j] = temp
        }
    }
}
function finish() {
    for (r=0;r<4;r++) {
        for (c=0;c<4;c++) {
            if($("#Imgr" + r +"c" + c).attr("done") != "done") {
                return 1;
            }
        }
    }
    return 0;
}
randomize()


for (r=0;r<4;r++) {
    $("#match").append('<tr id=\"r' + r + '\"></tr>')
    for (c=0;c<4;c++) {
        $("#r" + r).append('<th id=\"r' + r + "c" + c + '\"></tr>')
        $("#r" + r + "c" + c).append("<img id=Imgr" + r +"c" + c + " src=\"Images/background.png\">")
    }
}
let score = 0
let clicks = 0
let previousRow
let previousCol
$("img").click(function() {
    console.log(clicks)
    
    let row = $(this).attr("id")[4]
    let col = $(this).attr("id")[6]
    if($(this).attr("done") == "done" || clicks >= 2 || (row == previousRow && col == previousCol)) {
        return
    }

    $(this).attr("src", fruitList[row][col])
    score++;
    $("#score").html("Score: " + score)
    if (clicks == 0) {
        clicks++
        previousRow = row
        previousCol = col
    } else {
        clicks++;
        if(fruitList[row][col] != fruitList[previousRow][previousCol]) {
            setTimeout(function(){
                $("#Imgr" + row + "c" + col).attr("src", "Images/background.png")
                $("#Imgr" + previousRow + "c" + previousCol).attr("src", "Images/background.png")
            }, 2000) 
        } else {
            $("#Imgr" + row + "c" + col).attr("done", "done")
            $("#Imgr" + previousRow + "c" + previousCol).attr("done", "done")
        }
        setTimeout(function(){clicks = 0 }, 2000)
        if(finish() == 0) {
            $("#score").html("Final Score: " + score)
            if (hasLocalScore) {
                if(score < localStorage.getItem("highScore")) {
                    localStorage.setItem("highScore", score)
                    $("#highScore").html("High Score: " + score)                
                }
            } else {
                localStorage.setItem("highScore", score)
                $("#highScore").html("High Score: " + score)
            }
        }                        
    }
})
$("#reset").click(function() {
            randomize()
            for (r=0;r<4;r++) {
                for (c=0;c<4;c++) {
                    console.log("Imgr" + r +"c" + c)
                    $("#Imgr" + r +"c" + c).attr("src", "Images/background.png")
                    $("#Imgr" + r +"c" + c).removeAttr("done")
                }
            }
            score = 0
            $("#score").html("Score: " + score)
        })
$("#showAll").click(function() {
    for (r=0;r<4;r++) {
        for (c=0;c<4;c++) {
            console.log("Imgr" + r +"c" + c)
            $("#Imgr" + r +"c" + c).attr("src", fruitList[r][c])
            $("#Imgr" + r +"c" + c).attr("done", "done")
        }
    }
    score = 0
    $("#score").html("Score: " + score)
})
