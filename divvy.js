function decimalize(e){var a=e.toFixed(2);return a}function indexOfLowest(e){for(var a=0,n=1;n<e.length;n++)e[n]<e[a]&&(a=n);return a}function indexOfGreatest(e){for(var a=0,n=1;n<e.length;n++)e[n]>e[a]&&(a=n);return a}function divvy(){var e=0,a=0,n=new Array,s=new Array,d=new Array;$(".payment-summary").empty(),$(".person").each(function(){var d=0;$(this).find(".expense-cost").each(function(){d+=Number($(this).val())}),e+=d,a++;var t=$(this).find(".name").val();t?n.push(t):n.push("Some Guy"),s.push(d),$(this).find(".expense-total").text(decimalize(d))});var t=e/a;if(n.forEach(function(e,a){var n=s[a]-t;d.push(n)}),n.length>1&&0!=e&&0!=d[indexOfLowest(d)]){for(;d[indexOfLowest(d)]<-.01;){var i=n[indexOfLowest(d)],o=n[indexOfGreatest(d)],r=d[indexOfLowest(d)],l=d[indexOfGreatest(d)];Math.abs(r)<=l?($(".payment-summary").append("<h3>"+i+" owes "+o+" "+decimalize(Math.abs(r))+"</h3>"),d[indexOfGreatest(d)]=l+r,d[indexOfLowest(d)]=0):($(".payment-summary").append("<h3>"+i+" owes "+o+" "+decimalize(l)+"</h3>"),d[indexOfLowest(d)]=r+l,d[indexOfGreatest(d)]=0)}$(".cost-summary").removeClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden"),$(".cost-total").text(decimalize(e)),$(".number-of-people").text(a),$(".cost-share").text(decimalize(t))}else n.length>1&&0!=e?($(".cost-summary").addClass("hidden"),$(".even-expenses").removeClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").addClass("hidden")):n.length>1?($(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").removeClass("hidden"),$(".add-more-people").addClass("hidden")):($(".cost-summary").addClass("hidden"),$(".even-expenses").addClass("hidden"),$(".add-expenses").addClass("hidden"),$(".add-more-people").removeClass("hidden"))}function getRandName(){var e=Math.floor(Math.random()*names.length),a=names[e];return names.splice(e,1),a}$("body").on("input",".js-divvy",function(){divvy()}),$("body").on("click","input",function(){$(this).select()});var expenseTemplate=$("#expense-template").removeAttr("id").clone();$("body").on("click",".add-expense",function(){expenseTemplate.clone().insertBefore(this).find(".label").select()});var names=["Aiko","Alma","Archy","Arlie","Audrey","Cassius","Celia","Clara","Cora","Edward","Elle","Esther","Ethan","Ethel","Ezra","Farah","Frances","Grace","Hamish","Helen","Ira","Itsuki","Jacob","Joseph","Karim","Kariuki","Leo","Lillian","Lucian","Malcolm","Maurice","Mustafa","Niko","Omar","Pedro","Peta","Reed","Rowan","Ruhul","Vera","Vernon","Violet","Vladislav","Walter","Yui","Yusuf"];$(".person").each(function(){$(this).find(".name").val(getRandName())});var personTemplate=$("#person-template").removeAttr("id").clone();$(".add-person").click(function(){personTemplate.clone().insertBefore(this).find(".name").val(getRandName).select(),divvy()}),$("body").on("click",".remove-control",function(){if($(this).hasClass("remove-person")){var e=$(this).next("input.name").val();""==e&&(e="this person");var a=window.confirm("Do you want to remove "+e+"?");a&&$(this).parent().remove()}else $(this).parent().remove();divvy()}),$(document).ready(function(){$("body").removeClass("loading")});
