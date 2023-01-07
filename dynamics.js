/*eslint-env es6*/

/*exported makeCat*/

var catList = []; //global scope
var assignmentList =[]; //global scope

function makeCat() {
    var inputC = document.getElementById("CnameIn").value; //linked to text input
    var inputW = document.getElementById("CweightIn").value; //linked to text input
    var Category = {
        'name' : inputC,
        'weight' : inputW
    }
    catList.push(Category);
    var select = document.getElementById("selectCat");
    var index = catList.length-1;
    select.options[select.options.length] = new Option(inputC,index);
}

function makeAssignment() {
    var x = document.getElementById("selectCat").value;    
    var a = document.getElementById("AnameIn").value; //linked to text input
    var b = document.getElementById("possible").value;
    var c = document.getElementById("earned").value;
    var Assign = {
        'name' : a,
        'possible' : b,
        'earned' : c,
        'catId' : x
    }
    assignmentList.push(Assign);
    //WORKS
}

function DisplayCats() {
    var name = catList[catList.length-1].name;
    var weight = catList[catList.length-1].weight;
    var index = catList.length;
    
    var display = document.getElementById("catDisplay");
    var div = document.createElement('div');
    display.appendChild(div);
    
    var h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(index+'. '+name+' ('+weight+'%)'));
    div.appendChild(h2); //lists Category name
    
    //make a table for assignments right under Category head
    var table = document.createElement('table');
    var tr = document.createElement('tr');   
    var td1 = document.createElement('th');
    var td2 = document.createElement('th');
    var td3 = document.createElement('th');
    td1.appendChild(document.createTextNode('Assignments'));
    td2.appendChild(document.createTextNode('Points Possible'));
    td3.appendChild(document.createTextNode('Points Earned'));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
    table.id = name;
    div.appendChild(table);
}
function displayAssignment() {
    //var x = document.getElementById("selectCat").value;    
    var x = assignmentList[assignmentList.length-1].catId;
    var inputN = assignmentList[assignmentList.length-1].name; //linked to text input
    var full = assignmentList[assignmentList.length-1].possible;
    var score = assignmentList[assignmentList.length-1].earned;
    
    var index = parseInt(x);
    var target = catList[index].name;
    var table = document.getElementById(target);
    var tr = document.createElement('tr');   
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.appendChild(document.createTextNode(inputN));
    td2.appendChild(document.createTextNode(full));
    td3.appendChild(document.createTextNode(score));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.setAttribute('class',inputN)
    table.appendChild(tr);
}
function processCat() {
    //check input validity
    //execute
    makeCat();
    DisplayCats();
    clearForms();
    }
function processAssignment() {
    makeAssignment();
    displayAssignment();
    clearForms();
}
function calcCategoryAvg(b) {
    var numTotal = 0;
    var denomTotal = 0;    
    for (var j=0; j<assignmentList.length; j++) {
        if(parseInt(assignmentList[j].catId) == b) {
            var earned = parseInt(assignmentList[j].earned);
            var possible = parseInt(assignmentList[j].possible);    
            numTotal = numTotal+earned;
            denomTotal = denomTotal+possible;
        }
    }
    
    var avg = numTotal/denomTotal;
    return avg;
}

function showStats() {
    document.getElementById('top').innerHTML = 'Results';
    document.getElementById('stats').innerHTML = '';
    var list = document.getElementById('stats');
    for(var a=0; a<catList.length; a++) {
        //do for each category
        var percent = ((calcCategoryAvg(a)*100).toFixed(2));
        
        //print list elements
        var text = catList[a].name+' average: '+ percent + '% (weighted '+catList[a].weight+'% of your grade)';
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(text));
        list.appendChild(li);
    }
}
function showOVR() {
    document.getElementById('ovr').innerHTML = '';
    var location = document.getElementById('ovr');
    var totalWeights = 0;
    var earnedWeights = 0;
    for (var i=0; i<catList.length; i++) {
        var gain = calcCategoryAvg(i) * parseInt(catList[i].weight);
        totalWeights = totalWeights + parseInt(catList[i].weight);
        earnedWeights = earnedWeights + gain;
    }
    var finalGrade = (((earnedWeights/totalWeights)*100).toFixed(2));
    if (isNaN(finalGrade)) {
            finalGrade = 0.00;
        }
    var text = 'Overall Course Grade: '+finalGrade+'%';
    location.appendChild(document.createTextNode(text));
}
function update() {
    showStats();
    showOVR();
}
function clearForms() {
    document.getElementById('CnameIn').value = '';
    document.getElementById('CweightIn').value = '';
    document.getElementById('AnameIn').value = '';
    document.getElementById('possible').value = '';
    document.getElementById('earned').value = '';
}