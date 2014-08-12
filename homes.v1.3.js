/*Version 1.3. Trying to store the array in local storage.*/


var homes = [];


Storage.prototype.getArray = function(homes) {
 	var thisArray = [];
  	var fetchArrayObject = this.getItem(homes);
  	if (typeof fetchArrayObject !== 'undefined') {
    	if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  	}
  	return thisArray;
  	console.log(thisArray);
};

Storage.prototype.pushArrayItem = function(homes, arrayItem) {
  var existingArray = this.getArray(homes);
  existingArray.push(arrayItem);
  this.setItem(homes,JSON.stringify(existingArray));
}

Storage.prototype.popArrayItem = function(homes) {
  var arrayItem = {};
  var existingArray = this.getArray(homes);
  if (existingArray.length > 0) {
    arrayItem = existingArray.pop();
    this.setItem(homes,JSON.stringify(existingArray));
  }
  return arrayItem;
}

Storage.prototype.shiftArrayItem = function(homes) {
  var arrayItem = {};
  var existingArray = this.getArray(homes);
  if (existingArray.length > 0) {
    arrayItem = existingArray.shift();
    this.setItem(homes,JSON.stringify(existingArray));
  }
  return arrayItem;
}

Storage.prototype.unshiftArrayItem = function(homes,arrayItem) {
  var existingArray = this.getArray(homes);
  existingArray.unshift(arrayItem);
  this.setItem(homes,JSON.stringify(existingArray));
}

Storage.prototype.deleteArray = function(homes) {
  this.removeItem(homes);
}

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

};


var list = function(){
	for (var i = 0; i < homes.length; i++){
		$(".tableData").append
		("<tr>"  
		+ "<td id='tablerate'>" + homes[i].rate + "</td>" 
		+ "<td id='tableaddress'>"+ homes[i].address + "</td>" 
		+ "<td id='tabledownpayment'>"+ homes[i].downpayment + "</td>" 
		+ "<td id='tablemortgage'>"+ homes[i].mortgage + "</td>" 
		+ "<td id='tableincome'>"+ homes[i].cashflow 
		+ "</td>"
		+ "</tr>");
	};

};


$("#removeLast").on("click", function() {
	$(".tableData").empty();
	homes.pop();
	return list();

});


$("#clearList").on("click", function() {
	$(".tableData").empty();
	homes = [];
	//console.log (homes);
});


$("#clearPage").on("click", function() {
	$(".tableData").empty();
});


$(".addtolist").on("click", function() {
	$(".tableData").empty();
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

	add(inptcity, inptaddress, inptprice, inptunits, inptincome, inpttaxes);

	return list();

	Storage.prototype.getArray = function(homes) {
 		var thisArray = [];
  		var fetchArrayObject = this.getItem(homes);
  		if (typeof fetchArrayObject !== 'undefined') {
    		if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
  		}
  		return thisArray;
  		console.log(thisArray);
	};
});

Storage.prototype.pushArrayItem = function(homes, arrayItem) {
  	var existingArray = this.getArray(homes);
  	existingArray.push(arrayItem);
  	this.setItem(homes,JSON.stringify(existingArray));
};