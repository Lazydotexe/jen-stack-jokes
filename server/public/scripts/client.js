console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', sendJoke)
    getJokes()
}

let jokeList;

let sendJoke = () => {
    console.log("inside sendJoke")
    const sendJokes = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
        
    }
    $('input').val(""); 
    
    $.ajax({
        method: "POST",
        url: "/addToJoke",
        data: sendJokes
    }).then((response) => {
        console.log("POST was successful:", response) // Expect 201
        getJokes()

    }).catch((error) => {
        console.log("Error with POST request:", error)
        alert("Error with POST")
    })
}

let getJokes = () => {
    console.log("inside of getJokes")
    
    $.ajax({
        method: 'GET',
        url: '/addToJoke'
    }).then((response) => {
        jokeList = response;
        render()// The render() function is triggered.
    }).catch((error) => {
        alert("Request Failed")
        console.log("Request failed, error:", error)
    })
}

let render = () => {
    $('#outputDiv').empty()
    for (let item of jokeList) {
        // console.log(item)
        $('#outputDiv').append(`
            <p>
            ${item.whoseJoke}
            <p>
            <p>
            ${item.jokeQuestion}
            <p>
            <p>
            ${item.punchLine}
            <p>
            
        `)
    }
    
}