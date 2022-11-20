let url ="https://www.finnkino.fi/xml/Schedule/" 
var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", url, true);
 xmlhttp.send();
 
// Kun vastaus saapuu, niin...
xmlhttp.onreadystatechange = function() {
// Tarkista että kaikki ok
 
if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// Aseta vastauksen sisältö myDiv-nimiseen lohkoon
  
  // console.log( xmlhttp.responseXML );
    let xml = xmlhttp.responseXML;
    
    let titlet = xml.getElementsByTagName('title');
    let linkit = xml.getElementsByTagName('link');
    
    console.log(titlet);
    
    for (let i=0; i < titlet.length; i++){
        
        document.write('<a href="'+linkit[i].innerHTML+'"><li>'+ titlet[i].innerHTML + '</li></a>');
     
    } // for
    
    } // if
} // function
