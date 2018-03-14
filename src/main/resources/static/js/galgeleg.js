/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var resturl = "webapi/galgeleg";
    var user = localStorage.getItem("username");
    var pass = localStorage.getItem("password");
    var obj = {"username": user, "password": pass};
    var visibleWord = "";
    var nFails = 0;
    var usedLetters = [];
    var word = ""; //Used for cheating

    fetch(resturl + "/auth", {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'}
    }).then(function (data) {
        console.log(data);
        if (data.status === 200)
        {
            data.json().then(function (json) {
                if (json.brugerGodkendt === false)
                    document.location.href = "index.html";

            });
        }

    }).catch(function (error) {
        console.log(error);
    });

    function updateEverything()
    {
       updateVisibleWord();
       updateUsedLetters();
       updateFails();
       isGameOver();
  
       
    }

    function updateVisibleWord() {
        fetch(resturl + "/" + user + "/synligtord").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                    visibleWord = json.synligtOrd;
                    $("#visibleWord").text(visibleWord);
                });
            } else
            {

            }
        });
    }
    function updateOrdet() {
        fetch(resturl + "/" + user + "/ordet").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                    word = json.ordet;


                });
            } else
            {

            }
        });
    }
    function guessLetter(letter)
    {
        fetch(resturl + "/" + user + "/gaetbogstav/" + letter, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'}
        }).then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                updateEverything();

            } else
            {

            }
        });
    }
    function updateFails()
    {
        fetch(resturl + "/" + user + "/antalforkerte").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);

                });
            } else
            {

            }
        });
    }
    function isGameWon()
    {
        fetch(resturl + "/" + user + "/erspilletvundet").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                });
            } else
            {

            }
        });
    }
    function isGameLost()
    {
        fetch(resturl + "/" + user + "/erspillettabt").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                });
            } else
            {

            }
        });
    }
    function isGameOver()
    {
        fetch(resturl + "/" + user + "/erspilletslut").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                });
            } else
            {

            }
        });
    }

    function reset()
    {
        fetch(resturl + "/" + user + "/nulstil").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                });
            } else
            {

            }
        });
    }
    function refreshWordList()
    {
        fetch(resturl + "/" + user + "/hentordfradr").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                });
            } else
            {

            }
        });
    }
    function updateUsedLetters()
    {
        fetch(resturl + "/" + user + "/brugtebogstaver").then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                    $("#usedLetters").text(json.brugteBogstaver);
                });
            } else
            {

            }
        });
    }
    $("#guess").click(function () {
        var letter = $("#input").val();
        guessLetter(letter);

    });

});

