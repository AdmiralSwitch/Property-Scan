/*Version 1.3. Trying to store the array in local storage.
08/14/2014 - TESTING...WORKS
*/
//homes[] is only used for temp storage of new objects
var homes = [];

//Local Storage code V

var getArray = function(arrayName) {
  var thisArray = [];
  var fetchArrayObject = localStorage.getItem(arrayName);
  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  }
  return thisArray;
}

var pushArrayItem = function(arrayName,arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.push(arrayItem);
  localStorage.setItem(arrayName,JSON.stringify(existingArray));
}

var popArrayItem = function(arrayName) {
  var arrayItem = {};
  var existingArray = this.getArray(arrayName);
  if (existingArray.length > 0) {
    arrayItem = existingArray.pop();
    localStorage.setItem(arrayName,JSON.stringify(existingArray));
  }
  return arrayItem;
}

var shiftArrayItem = function(arrayName) {
  var arrayItem = {};
  var existingArray = this.getArray(arrayName);
  if (existingArray.length > 0) {
    arrayItem = existingArray.shift();
    localStorage.setItem(arrayName,JSON.stringify(existingArray));
  }
  return arrayItem;
}

var unshiftArrayItem = function(arrayName,arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.unshift(arrayItem);
  localStorage.setItem(arrayName,JSON.stringify(existingArray));
}

var deleteArray = function(arrayName) {
  localStorage.removeItem(arrayName);
}

//Local Storage code ^

//calculates values and adds a new object to the homes array
var add = function(city, address, price, units, income, taxes){
	var downpayment = (price * .33).toFixed(2);
	var bills = (units * 105 + income * .1).toFixed(2);
    var repairs = units * 100;
    var vacancy = function(city){
    	if (city == 'Portland'){
            	return (income *.035).toFixed(2);
            } else if (city == 'Las Vegas'){            	
            	return (income * .08).toFixed(2);
            } else if (city == 'Oakland'){            	
            	return (income * .11).toFixed(2);
            } else {
            	return 0;
            };
        };

    //mortgage calculator
    var mortgage = function(price, downpayment) {
    	var loanAmount = price - downpayment;
		var a = loanAmount;
		var b = 4.25;
		var c = 30;
		var n = c * 12;
		var r = b/(12*100);
		var p = (a * r *Math.pow((1+r),n))/(Math.pow((1+r),n)-1);
		var prin = Math.round(p*100)/100;
		return (prin);
	};

    var cashFlow = ((-1 * taxes)/12 - mortgage(price, downpayment) - bills - repairs - vacancy(city) + income).toFixed(2);
    var rateReturn = ((cashFlow * 12) / price * 100).toFixed(2);

    //the actual object that gets added to the homes array
	homes[homes.length] = {
		id: homes.length,
		city: city,
		address: address,
		price: '$' + price,
		units: units,
		income: '$' + income,
		taxes: '$' + taxes,
		downpayment: '$' + downpayment,
		mortgage: '$' + mortgage(price, downpayment),
		bills: '$' + bills,
		repairs: '$' + repairs,
		vacancy: '$' + vacancy(city),
		cashflow: '$' + cashFlow,
		rate: rateReturn +'%'
	}
	for(var i = 0; i < homes.length; i++){
		unshiftArrayItem("homes", homes[i]);
	};
	homes = [];
};


//outputs field data to the page
var list = function(){
	var whatever = getArray("homes");
	for (var i = 0; i < whatever.length; i++){
		$(".tableData").append
		("<tr>"  
		+ "<td id='tablerate'>" + whatever[i].rate + "</td>" 
		+ "<td id='tableaddress'>"+ whatever[i].address + "</td>" 
		+ "<td id='tabledownpayment'>"+ whatever[i].downpayment + "</td>" 
		+ "<td id='tablemortgage'>"+ whatever[i].mortgage + "</td>" 
		+ "<td id='tableincome'>"+ whatever[i].cashflow 
		+ "</td>"
		+ "</tr>");
	};
};

//event handlers below V
$("#loadList").on("click", function() {
	return list();
});

$("#removeLast").on("click", function() {
	//deleteArray("homes");
	shiftArrayItem("homes");
	$(".tableData").empty();
	return list();

});


$("#clearList").on("click", function() {
	$(".tableData").empty();
	deleteArray("homes");
	homes = [];
	//console.log (homes);
});


$("#clearPage").on("click", function() {
	$(".tableData").empty();
});


$(".addtolist").on("click", function() {
	//takes the field data 
	

	var inptcity2 = document.getElementById("city");
	var inptaddress2 = document.getElementById("address");
	var inptprice2 = document.getElementById("price");
	var inptunits2 = document.getElementById("units");
	var inptincome2 = document.getElementById("income");
	var inpttaxes2 = document.getElementById("taxes");

	var inptcity = inptcity2.value;
	var inptaddress = inptaddress2.value;
	var inptprice = parseInt(inptprice2.value);
	var inptunits = parseInt(inptunits2.value);
	var inptincome = parseInt(inptincome2.value);
	var inpttaxes = parseInt(inpttaxes2.value);
	//debugger;
	//sends the field data to the homes array via the add function
	add(inptcity, inptaddress, inptprice, inptunits, inptincome, inpttaxes);
	//debugger;
	//sends data to the list function, wich will print the object on the page.
	$(".tableData").empty();
	return list();

});

