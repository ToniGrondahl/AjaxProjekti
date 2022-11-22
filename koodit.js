var url1="http://www.finnkino.fi/xml/Schedule/?area=1033"; 
var url2= "http://www.finnkino.fi/xml/Schedule/?area=1031"; 
var url3="http://www.finnkino.fi/xml/Schedule/?area=1039";
var url4="http://www.finnkino.fi/xml/Schedule/?area=1038";    //setting the urls for xml files of different movie theaters
var url5="https://www.finnkino.fi/xml/Schedule/?area=1045";
var url6="https://www.finnkino.fi/xml/Schedule/?area=1032";
var url7="https://www.finnkino.fi/xml/Schedule/?area=1013";

function getData(url) {
var xmlhttp = new XMLHttpRequest(); //function to get the xml data from the finnkino page. The url is determined by the theater that is chosen by the user
 xmlhttp.open("GET", url, true); //starting the connection to get the xml file
 xmlhttp.send();
 
// Kun vastaus saapuu, niin...
xmlhttp.onreadystatechange = function() {
// Tarkista että kaikki ok
if(xmlhttp.readyState == 4 && xmlhttp.status == 200) { // Aseta vastauksen sisältö myDiv-nimiseen lohkoon
    var schedule = xmlhttp.responseXML; //storing the xml data into a variable so that it can be used later

    var movie = schedule.getElementsByTagName("Title"); //getting the info from the xml file to set as variables and to use for displaying the data. 
    var genre = schedule.getElementsByTagName("Genres");
    var picture = schedule.getElementsByTagName("EventSmallImagePortrait");
    var timetable = schedule.getElementsByTagName("dttmShowStart");
    var lengthmin = schedule.getElementsByTagName("LengthInMinutes");
    var rate = schedule.getElementsByTagName("RatingImageUrl")
    var place = schedule.getElementsByTagName("TheatreAuditorium");   

    var add = "<table id='movie-list'>"; // Start of the table 
    add+= "<tr><th></th> <th>Elokuva</th><th>Genre</th> <th>Kesto</th><th>Alkamisaika</th> <th>Sali</th>"; //setting the table headers

    for (var i=0; i < movie.length; i++){ //looping the data from one theater so that each row has the info of a one movie and one show time

    var time = new Date(timetable[i].innerHTML);  //changing the data of the show time from string to datetime so that it can be formatted differently
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
    document.getElementById("moviesearch").value =""; //clearing the search field when changing the theater
            
            }
        }
        
    }
        
function loadData() { //funktio millä saadaan dataa valitusta teatterista 
var option = document.getElementById("dropdown").value;
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
if (option=="empty") {
    document.getElementById("moviedata").innerHTML = "";
}
}

function searchMovie() { // Funktio jolla etsitään elokuvia listasta
    var userinput, word, table, row, td, i; // Declaring variables // Määritellään muuttujat 
    userinput = document.getElementById("moviesearch"); //determining the input field that should be checked 
    word = userinput.value.toUpperCase(); //saa syötteen käyttäjältä 
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