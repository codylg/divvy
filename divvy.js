function decimalize(e){var n=e.toFixed(2);return n}function indexOfLowest(e){for(var n=0,s=1;s<e.length;s++)e[s]<e[n]&&(n=s);return n}function indexOfGreatest(e){for(var n=0,s=1;s<e.length;s++)e[s]>e[n]&&(n=s);return n}function divvy(){var e=0,n=0,s=new Array,o=new Array,d=new Array;$(".payment-summary").empty(),$(".person").each(function(){var d=0;$(this).find(".expense-cost").each(function(){d+=Number($(this).val())}),e+=d,n++;var a=$(this).find(".name").val();a?s.push(a):s.push("Some Guy"),o.push(d),$(this).find(".expense-total").text(decimalize(d))});var a=e/n;if(s.forEach(function(e,n){var s=o[n]-a;d.push(s)}),s.length>1&&0!=e&&0!=d[indexOfLowest(d)]){for(;d[indexOfLowest(d)]<-.01;){var t=s[indexOfLowest(d)],r=s[indexOfGreatest(d)],i=d[indexOfLowest(d)],l=d[indexOfGreatest(d)];Math.abs(i)<=l?($(".payment-summary").append("<h3>"+t+" owes "+r+" "+decimalize(Math.abs(i))+"</h3>"),d[indexOfGreatest(d)]=l+i,d[indexOfLowest(d)]=0):($(".payment-summary").append("<h3>"+t+" owes "+r+" "+decimalize(l)+"</h3>"),d[indexOfLowest(d)]=i+l,d[indexOfGreatest(d)]=0)}divvyResults=!0,$(".cost-summary").removeClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden"),$(".cost-total").text(decimalize(e)),$(".number-of-people").text(n),$(".cost-share").text(decimalize(a))}else s.length>1&&0!=e?(divvyResults=!0,$(".cost-summary").addClass("hidden"),$(".even-expenses").removeClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden")):s.length>1?(divvyResults=!1,$(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").removeClass("hidden"),$(".add-more-people").addClass("hidden")):(divvyResults=!1,$(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").removeClass("hidden"));toggleResultsPrompt()}function getRandName(){var e=Math.floor(Math.random()*names.length),n=names[e];return names.splice(e,1),n}function showUndoBanner(){undoBanner.hasClass("hidden")&&undoBanner.removeClass("hidden"),storedPersonName?undoBannerName.text(storedPersonName):undoBannerName.text("Some Guy")}function hideUndoBanner(){undoBanner.hasClass("hidden")||undoBanner.addClass("hidden")}function toggleResultsPrompt(){var e=$(document).scrollTop(),n=$(".text-box").offset().top,s=wHeight+e-n;50>s&&divvyResults&&$(".scroll-to-results").removeClass("hidden"),s>50&&$(".scroll-to-results").addClass("hidden")}var divvyResults=!1;$("body").on("input",".js-divvy",function(){divvy()});var ua=navigator.userAgent.toLowerCase(),uaAndroid=ua.indexOf("android")>-1;$("body").on("click","input",function(){uaAndroid||$(this).select()});var expenseTemplate=$("#expense-template").removeAttr("id").clone();$("body").on("click",".add-expense",function(){expenseTemplate.clone().insertBefore(this).find(".label").select()});var names=["Dale","Harry","Shelly","Bobby","Benjamin","Donna","Audrey","Will","Norma","James","Ed","Pete","Leland","Josie","Catherine","Lucy","Laura","Maddy","Lawrence","Leo","Eileen","Andy","Mike","Tommy","Sarah","Windom","Ronette","Phillip","Albert","Annie","Gordon"];$(".person").each(function(){$(this).find(".name").val(getRandName())});var personTemplate=$("#person-template").removeAttr("id").clone();$(".add-person").click(function(){personTemplate.clone().insertBefore(this).find(".name").val(getRandName).select(),divvy()});var storedPersonTemplate,storedPersonName,storedPersonExpenseLabels=[],storedPersonExpenseCosts=[];$("body").on("click",".remove-expense",function(){$(this).parent().remove(),divvy()});var undoBanner=$(".undo-banner"),undoBannerName=$(".undo-person-name"),undoBannerTimeout;$("body").on("click",".remove-person",function(){var e=$(this).parent(),n=e.find(".expense");storedPersonTemplate=e.html(),storedPersonName=e.find("input.name").val(),storedPersonExpenseLabels=[],n.each(function(){var e=$(this).find(".label").val();storedPersonExpenseLabels.push(e)}),storedPersonExpenseCosts=[],n.each(function(){var e=$(this).find(".expense-cost").val();storedPersonExpenseCosts.push(e)}),$(this).parent().remove(),clearTimeout(undoBannerTimeout),showUndoBanner(),divvy(),undoBannerTimeout=setTimeout(hideUndoBanner,9e3)}),$("body").on("click",".restore-person",function(){clearTimeout(undoBannerTimeout),hideUndoBanner(),$(".add-person").before('<div class="person">'+storedPersonTemplate+"</div>");var e=$(".add-person").prev();e.find(".name").val(storedPersonName),e.find(".label").each(function(e){$(this).val(storedPersonExpenseLabels[e]),e++}),e.find(".expense-cost").each(function(e){$(this).val(storedPersonExpenseCosts[e]),e++}),divvy()});var wHeight=$(window).height();$(window).resize(function(){wHeight=$(window).height(),toggleResultsPrompt()}),$(window).scroll(function(){toggleResultsPrompt()}),$("body").on("click",".scroll-to-results",function(){$("html, body").animate({scrollTop:$(".text-box").offset().top},500)});
