let url1="http://www.finnkino.fi/xml/Schedule/?area=1033"; 
let url2= "http://www.finnkino.fi/xml/Schedule/?area=1031"; 
let url3="http://www.finnkino.fi/xml/Schedule/?area=1039";
let url4="http://www.finnkino.fi/xml/Schedule/?area=1038";    
let url5="https://www.finnkino.fi/xml/Schedule/?area=1045";
let url6="https://www.finnkino.fi/xml/Schedule/?area=1032";
let url7="https://www.finnkino.fi/xml/Schedule/?area=1013";
let url8="https://www.finnkino.fi/xml/Schedule/?area=1015";   //setting the urls for xml files of different movie theaters
let url9="https://www.finnkino.fi/xml/Schedule/?area=1016";
let url10="https://www.finnkino.fi/xml/Schedule/?area=1017";
let url11="https://www.finnkino.fi/xml/Schedule/?area=1041";
let url12="https://www.finnkino.fi/xml/Schedule/?area=1018";
let url13="https://www.finnkino.fi/xml/Schedule/?area=1019";
let url14="https://www.finnkino.fi/xml/Schedule/?area=1034";
let url15="https://www.finnkino.fi/xml/Schedule/?area=1035";
let url16="https://www.finnkino.fi/xml/Schedule/?area=1022";
let url17="https://www.finnkino.fi/xml/Schedule/?area=1046";

function getData(url) {
let xmlhttp = new XMLHttpRequest(); // funktio millä haetaan xml data finnkinon sivulta function to get the xml data from the finnkino page. The url is determined by the theater that is chosen by the user
 xmlhttp.open("GET", url, true); //starting the connection to get the xml file
 xmlhttp.send();
 
// Kun vastaus saapuu, niin...
xmlhttp.onreadystatechange = function() {
// Tarkista että kaikki ok
if(xmlhttp.readyState == 4 && xmlhttp.status == 200) { // Aseta vastauksen sisältö myDiv-nimiseen lohkoon
    let schedule = xmlhttp.responseXML; //storing the xml data into a variable so that it can be used later

    let movie = schedule.getElementsByTagName("Title"); //getting the info from the xml file to set as variables and to use for displaying the data. 
    let genre = schedule.getElementsByTagName("Genres");
    let picture = schedule.getElementsByTagName("EventSmallImagePortrait");
    let timetable = schedule.getElementsByTagName("dttmShowStart");
    let lengthmin = schedule.getElementsByTagName("LengthInMinutes");
    let place = schedule.getElementsByTagName("TheatreAuditorium");   

    let add = "<table id='movie-list'>"; // Start of the table 
    add+= "<tr><th></th> <th>Elokuva</th><th>Genre</th> <th>Kesto</th><th>Alkamisaika</th> <th>Sali</th>"; //setting the table headers

    for (let i=0; i < movie.length; i++){ //looping the data from one theater so that each row has the info of a one movie and one show time

    let time = new Date(timetable[i].innerHTML);  //changing the data of the show time from string to datetime so that it can be formatted differently
    add += '<tr>'; //adding rows to the table
    add += '<td><img src="'+picture[i].innerHTML+'"></td>'; //adding a picture inside the table
    add += '<td class="movietitle">' + movie[i].innerHTML + '</td>';
    add += '<td>' + genre[i].innerHTML + '</td>';
    add += '<td>' + lengthmin[i].innerHTML+ " min " +'</td>';
    add += '<td>' + time.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})+'</td>'; //changing the format of the datetime to just display the time
    add += '<td>' + place[i].innerHTML+'</td>';
    add += '</tr>';

    }
    // closing the table
    add+="</table>";

    // Placing the table to the moviedata div.
    document.getElementById("moviedata").innerHTML = add;
    document.getElementById("searchfield").style.display=""; //displaying the search field when a movie theater is chosen
    document.getElementById("topbutton").style.display=""; 
    document.getElementById("moviesearch").value =""; //clearing the search field when changing the theater
            }
        }
    }
        
function loadData() { //funktio jolla saadaan dataa valitusta teatterista 
let option = document.getElementById("dropdown").value;
if (option=="tennis") {
    getData(url1);
}
if (option=="kino") {
    getData(url2);
}
if (option=="omena") {
    getData(url3);
}
if (option=="sello") {      // Tarkistaa arvon teatterilistasta ja saa datan vastaavasta urlista.
    getData(url4);          
}
if (option=="itis") {
    getData(url5);
}
if (option=="maxim") {
    getData(url6);
}                     
if (option=="flamingo") {
    getData(url7)
}
if (option=="fantasia") {
    getData(url8)
}
if (option=="scala") {
    getData(url9)
}
if (option=="kuvapalatsi") {
    getData(url10)
}
if (option=="strand") {
    getData(url11)
}
if (option=="plaza") {
    getData(url12)
}
if (option=="promenadi") {
    getData(url13)
}
if (option=="cineatlas") {
    getData(url14)
}
if (option=="plevna") {
    getData(url15)
}
if (option=="kinopalatsi") {
    getData(url16)
}
if (option=="luxemylly") {
    getData(url17)
}
if (option=="empty") {
    document.getElementById("moviedata").innerHTML = "";
}
}

    function searchMovie() { //function to search movies from the table
        let userinput, word, table, row, td, i; // Declaring variables

        userinput = document.getElementById("moviesearch"); //determining the input field that should be checked
        word = userinput.value.toUpperCase(); //getting the input from user
        table = document.getElementById("movielist"); //determining the table where the movies are searched from
        row = table.getElementsByTagName("tr"); //determining the row variable
       
      
        for (i = 0; i < row.length; i++) { // For loop to go through all the rows from the table       
          td = row[i].getElementsByTagName("td")[0]; //finding each cell
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(word) > -1) { //checking if the text inside the cell matches the word or letter inputted by the user. toUpperCase is used for both the input and the search, so that the search is not case sensitive
              row[i].style.display = ""; //displaying the rows with that match with the search string
            } else {
              row[i].style.display = "none"; //hiding the rows that don't match
            }
          } 
        }
      }

      


    


    