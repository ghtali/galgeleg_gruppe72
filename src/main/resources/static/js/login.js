/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var resturl = "http://duko.mynetgear.com:8080/RestServer/webapi/galgeleg";
    $("#login").click(function () {
        var pass = $("#passwordInput").val();
        var user = $("#usernameInput").val();
        $("#passwordInput").val("");
        var obj = {"username": user, "password": pass};
        var json = JSON.stringify(obj);
        console.log(json);
        fetch(resturl + "/auth", {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json'}
        }).then(function (data) {
            console.log(data);
            if (data.status === 200)
            {
                data.json().then(function (json) {
                    console.log(json);
                    if (json.brugerGodkendt === true)
                    {
                        localStorage.setItem("username", user);
                        localStorage.setItem("password", pass);
                        window.location = "/galgeleg";

                    } else if (json.brugerGodkendt === false)
                    {
                        $("#error").text("Username and password did not match");
                    }
                });
            }
        }).catch(function (exception) {
            console.log(exception);
        });
    });
});

