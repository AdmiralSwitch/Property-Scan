var homes = [];

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
//found myself repeating this too much
var list = function(){
	/*
	for (var i = 0; i < homes.length; i++){
		$(".listing").append
		("<p>" 
		+ "Rate " + homes[i].rate + ", "
		+ "Address " + homes[i].address + ", "
		+ "Downpayment: " + homes[i].downpayment + ", "
		+ "Mortgage: " + homes[i].mortgage + ", "
		+ "Monthly Cash: " + homes[i].cashflow + ", "
		+"</p>");
	}; 
	*/

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

/*
$(".submit").on("click", function() {
	for (var i = 0; i < homes.length; i++){
			$(".listing").append
			("<p>" 
			+ "Rate " + homes[i].rate + ", "
			+ "Address " + homes[i].address + ", "
			+ "Downpayment: " + homes[i].downpayment + ", "
			+ "Mortgage: " + homes[i].mortgage + ", "
			+ "Monthly Cash: " + homes[i].cashflow + ", "
			+"</p>");

	};
});



$(".add").on("click", function() {
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
	console.log(homes);
});
*/

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
	
});