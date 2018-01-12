function decimalize(e){var n=e.toFixed(2);return n}function indexOfLowest(e){for(var n=0,s=1;s<e.length;s++)e[s]<e[n]&&(n=s);return n}function indexOfGreatest(e){for(var n=0,s=1;s<e.length;s++)e[s]>e[n]&&(n=s);return n}function divvy(){var e=0,n=0,s=new Array,a=new Array,o=new Array;$(".payment-summary").empty(),$(".person").each(function(){var o=0;$(this).find(".expense-cost").each(function(){o+=Number($(this).val())}),e+=o,n++;var t=$(this).find(".name").val();t?s.push(t):s.push("Some Guy"),a.push(o),$(this).find(".expense-total").text(decimalize(o))});var t=e/n;if(s.forEach(function(e,n){var s=a[n]-t;o.push(s)}),s.length>1&&0!=e&&0!=o[indexOfLowest(o)]){for(;o[indexOfLowest(o)]<-.01;){var d=s[indexOfLowest(o)],r=s[indexOfGreatest(o)],i=o[indexOfLowest(o)],l=o[indexOfGreatest(o)];Math.abs(i)<=l?($(".payment-summary").append("<h3>"+d+" owes "+r+" "+decimalize(Math.abs(i))+"</h3>"),o[indexOfGreatest(o)]=l+i,o[indexOfLowest(o)]=0):($(".payment-summary").append("<h3>"+d+" owes "+r+" "+decimalize(l)+"</h3>"),o[indexOfLowest(o)]=i+l,o[indexOfGreatest(o)]=0)}divvyResults=!0,$(".cost-summary").removeClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden"),$(".cost-total").text(decimalize(e)),$(".number-of-people").text(n),$(".cost-share").text(decimalize(t))}else s.length>1&&0!=e?(divvyResults=!0,$(".cost-summary").addClass("hidden"),$(".even-expenses").removeClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden")):s.length>1?(divvyResults=!1,$(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").removeClass("hidden"),$(".add-more-people").addClass("hidden")):(divvyResults=!1,$(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").removeClass("hidden"));toggleResultsPrompt()}function getRandName(){var e=Math.floor(Math.random()*names.length),n=names[e];return names.splice(e,1),n}function showUndoBanner(){undoBanner.hasClass("hidden")&&undoBanner.removeClass("hidden"),storedPersonName?undoBannerName.text(storedPersonName):undoBannerName.text("Some Guy")}function hideUndoBanner(){undoBanner.hasClass("hidden")||undoBanner.addClass("hidden")}function toggleResultsPrompt(){var e=$(document).scrollTop(),n=$(".text-box").offset().top,s=wHeight+e-n;50>s&&divvyResults&&$(".scroll-to-results").removeClass("hidden"),s>50&&$(".scroll-to-results").addClass("hidden")}var divvyResults=!1;$("body").on("input",".js-divvy",function(){divvy()});var ua=navigator.userAgent.toLowerCase(),uaAndroid=ua.indexOf("android")>-1;$("body").on("click","input",function(){uaAndroid||$(this).select()});var expenseTemplate=$("#expense-template").removeAttr("id").clone();$("body").on("click",".add-expense",function(){expenseTemplate.clone().insertBefore(this).find(".label").select()});var names=["Aiko","Alma","Archy","Arlie","Audrey","Cassius","Celia","Clara","Cora","Edward","Elle","Esther","Ethan","Ethel","Ezra","Farah","Frances","Grace","Hamish","Helen","Ira","Itsuki","Jacob","Joseph","Karim","Kariuki","Leo","Lillian","Lucian","Malcolm","Maurice","Mustafa","Niko","Omar","Pedro","Peta","Reed","Rowan","Ruhul","Vera","Vernon","Violet","Vladislav","Walter","Yui","Yusuf"];$(".person").each(function(){$(this).find(".name").val(getRandName())});var personTemplate=$("#person-template").removeAttr("id").clone();$(".add-person").click(function(){personTemplate.clone().insertBefore(this).find(".name").val(getRandName).select(),divvy()});var storedPersonTemplate,storedPersonName,storedPersonExpenseLabels=[],storedPersonExpenseCosts=[];$("body").on("click",".remove-expense",function(){$(this).parent().remove()});var undoBanner=$(".undo-banner"),undoBannerName=$(".undo-person-name"),undoBannerTimeout;$("body").on("click",".remove-person",function(){var e=$(this).parent(),n=e.find(".expense");storedPersonTemplate=e.html(),storedPersonName=e.find("input.name").val(),storedPersonExpenseLabels=[],n.each(function(){var e=$(this).find(".label").val();storedPersonExpenseLabels.push(e)}),storedPersonExpenseCosts=[],n.each(function(){var e=$(this).find(".expense-cost").val();storedPersonExpenseCosts.push(e)}),$(this).parent().remove(),clearTimeout(undoBannerTimeout),showUndoBanner(),divvy(),undoBannerTimeout=setTimeout(hideUndoBanner,9e3)}),$("body").on("click",".restore-person",function(){clearTimeout(undoBannerTimeout),hideUndoBanner(),$(".add-person").before('<div class="person">'+storedPersonTemplate+"</div>");var e=$(".add-person").prev();e.find(".name").val(storedPersonName),e.find(".label").each(function(e){$(this).val(storedPersonExpenseLabels[e]),e++}),e.find(".expense-cost").each(function(e){$(this).val(storedPersonExpenseCosts[e]),e++}),divvy()});var wHeight=$(window).height();$(window).resize(function(){wHeight=$(window).height(),toggleResultsPrompt()}),$(window).scroll(function(){toggleResultsPrompt()}),$("body").on("click",".scroll-to-results",function(){$("html, body").animate({scrollTop:$(".text-box").offset().top},500)}),$(document).ready(function(){$("body").removeClass("loading")});
