var currentOne = "1",
	currentAuthor = "author",
	currentName = "name",
	currentPrice = "price",
	currentPic = "pic name",
	currentSale = "sale",
	whichOne = "1";
$(document).ready(function(){
	"use strict";
	$.ajax({
		url:"../xml/book.xml",
		cache: false,
		dataType:"xml",
		success: function(xml){
			$("#bookView").empty();
			
			$(xml).find('book').each(function(){
				var info= '<li class="list" data-id='+
				$(this).find("ID").text()+
				'><p><a href="#"><img src="../images/'+
				$(this).find("Pic").text()+
				'" width="40%" height="40%" alt="Error!"></a></p>'+
				'<p>'+
					$(this).find("Name").text()+
				'</p>'+
				'<p>'+
					$(this).find("Author").text()+
				'</p>'+
				'<p>'+
					$(this).find("Price").text()+
				'</p>'+ 
				'<p style="color:red;">'+
					$(this).find("Sale").text()+
				'</p></li>';
				$("#bookView").append(info);
			});
			$("#bookView").append('<div class="clearit"></div>');
			$("#option").change(function(){
				$("#bookView").empty();
				$(xml).find('book').each(function(){
					if($("#option").val() === "0"){
						var info1= '<li data-id='+
						$(this).find("ID").text()+
						'><p><a href="#"><img src="../images/'+
						$(this).find("Pic").text()+
						'" width="40%" height="40%" alt="Error!"></a></p>'+
						'<p>'+
							$(this).find("Name").text()+
						'</p>'+
						'<p>'+
							$(this).find("Author").text()+
						'</p>'+
						'<p>'+
							$(this).find("Price").text()+
						'</p>'+
						'<p style="color:red;">'+
							$(this).find("Sale").text()+
						'</p></li></br>';
						$("#bookView").append(info1);
					}
					else if($("#option").val() === "1"){
						if($(this).find("Group").text() === "1"){
							var info2= '<li data-id='+
							$(this).find("ID").text()+
							'><p><a href="#"><img src="../images/'+
							$(this).find("Pic").text()+
							'" width="40%" height="40%" alt="Error!"></a></p>'+
							'<p>'+
								$(this).find("Name").text()+
							'</p>'+
							'<p>'+
								$(this).find("Author").text()+
							'</p>'+
							'<p>'+
								$(this).find("Price").text()+
							'</p>'+
							'<p style="color:red;">'+
								$(this).find("Sale").text()+
							'</p></li></br>';
							$("#bookView").append(info2);
						}
					}
					else if($("#option").val() === "2"){
						if($(this).find("Group").text() === "2"){
							var info3= '<li data-id='+
							$(this).find("ID").text()+
							'><p><a href="#"><img src="../images/'+
							$(this).find("Pic").text()+
							'" width="40%" height="40%" alt="Error!"></a></p>'+
							'<p>'+
								$(this).find("Name").text()+
							'</p>'+
							'<p>'+
								$(this).find("Author").text()+
							'</p>'+
							'<p>'+
								$(this).find("Price").text()+
							'</p>'+
							'<p style="color:red;">'+
								$(this).find("Sale").text()+
							'</p></li></br>';
							$("#bookView").append(info3);
						}
					}
					else if($("#option").val() === "3"){
						if($(this).find("Group").text() === "3"){
							var info4= '<li data-id='+
							$(this).find("ID").text()+
							'><p><a href="#"><img src="../images/'+
							$(this).find("Pic").text()+
							'" width="40%" height="40%" alt="Error!"></a></p>'+
							'<p>'+
								$(this).find("Name").text()+
							'</p>'+
							'<p>'+
								$(this).find("Author").text()+
							'</p>'+
							'<p>'+
								$(this).find("Price").text()+
							'</p>'+
							'<p style="color:red;">'+
								$(this).find("Sale").text()+
							'</p></li></br>';
							$("#bookView").append(info4);
						}
					}
				});
			});
		}
	});
	$("#bookView").on("click","li",function(){
		whichOne= ($(this).attr("data-id"));
		$.ajax({
			url:"../xml/book.xml",
			cache: false,
			dataType:"xml",
			success: function(xml1){
				$(xml1).find('book').each(function(){
					currentOne = ($(this).find("ID").text());
					if(currentOne === whichOne){
						currentAuthor = ($(this).find("Author").text());
						currentName = ($(this).find("Name").text());
						currentPrice = ($(this).find("Price").text());
						currentPic = ($(this).find("Pic").text());
						currentSale = ($(this).find("Sale").text());
						
						$("#select").empty();
						$("#bookView").empty();
						$('#Pic').html('<img src="../images/'+currentPic+'" width="70%" height="70%"/>');
						$('#Name').html('<b>Name: </b>'+currentName);
						$('#Author').html('<b>Author: </b>'+currentAuthor);
						$('#Price').html('<b>Price: </b>'+currentPrice);
						$('#Sale').html('<b>Sale: </b>'+ '<span style="color:red;">'+currentSale+'</span>');
						$('#Button').html('<button type="button">Add to cart</button>');
					}
				});
			}
		});
	});
});