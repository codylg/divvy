var divvyResults = false;

function decimalize(i) {
  var decimalized = i.toFixed(2);

  return decimalized;
}

// Find the index of the smallest value in an array
function indexOfLowest(array) {
  var lowest = 0;
  for (var i = 1; i < array.length; i++) {
    if (array[i] < array[lowest]) {
      lowest = i;
    }
  }
  return lowest;
}

// Find the index of the greatest value in an array
function indexOfGreatest(array) {
  var greatest = 0;
  for (var i = 1; i < array.length; i++) {
    if (array[i] > array[greatest]) {
      greatest = i;
    }
  }
  return greatest;
}

function divvy() {
  var totalCost = 0;
  var totalPersons = 0;
  var persons = new Array();
  var totalExpenses = new Array(); // The total expense for each person
  var balances = new Array(); // The amount owed or amount owing for each person

  $('.payment-summary').empty();

  // Cycle through each person and calculate the total of their expenses
  $('.person').each(function() {

    var expenseSum = 0;

    // Add each expense together
    $(this).find('.expense-cost').each(function() {
      expenseSum += Number($(this).val());
    });

    totalCost += expenseSum;
    totalPersons ++;

    var name = $(this).find('.name').val();

    // Add the person to the persons array
    if (name) {
      persons.push(name);
    } else {
      persons.push('Some Guy');
    }

    // Add the expense sum to the expenses array
    totalExpenses.push(expenseSum);

    // Print the expense total for each person
    $(this).find('.expense-total').text(decimalize(expenseSum));

  });

  var share = totalCost / totalPersons; // Share is the amount that each person should pay of the total bill

  // Create an array of balances
  persons.forEach(function(person, n) {
    var balance = totalExpenses[n] - share;
    balances.push(balance);
  });

  // Find who should pay who
  if (persons.length > 1 && totalCost != 0 && balances[indexOfLowest(balances)] != 0) {
    // There are enough people, the total cost is not 0, and the cost does not even out

    while (balances[indexOfLowest(balances)] < -0.01) {

      // Find the person with the greatest debt and the person with the greatest amount owed
      var personLowest = persons[indexOfLowest(balances)];
      var personGreatest = persons[indexOfGreatest(balances)];
      var balanceLowest = balances[indexOfLowest(balances)];
      var balanceGreatest = balances[indexOfGreatest(balances)];

      // Greatest debt pays to the greatest amount owed
      if (Math.abs(balanceLowest) <= balanceGreatest) {
        $('.payment-summary').append('<h3>' + personLowest + ' owes ' + personGreatest + ' ' + decimalize(Math.abs(balanceLowest)) + '</h3>');
        balances[indexOfGreatest(balances)] = balanceGreatest + balanceLowest;
        balances[indexOfLowest(balances)] = 0;
      } else {
        $('.payment-summary').append('<h3>' + personLowest + ' owes ' + personGreatest + ' ' + decimalize(balanceGreatest) + '</h3>');
        balances[indexOfLowest(balances)] = balanceLowest + balanceGreatest;
        balances[indexOfGreatest(balances)] = 0;
      }
    }

    divvyResults = true;

    $('.cost-summary').removeClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').addClass('hidden');

    $('.cost-total').text(decimalize(totalCost));
    $('.number-of-people').text(totalPersons);
    $('.cost-share').text(decimalize(share));

  } else if (persons.length > 1 && totalCost != 0) {
    // There are enough people, the total cost is not 0, but the cost evens out
    divvyResults = true;

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').removeClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').addClass('hidden');

  } else if (persons.length > 1) {
    // There are enough people, but the total cost is 0
    divvyResults = false;

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').removeClass('hidden');
    $('.add-more-people').addClass('hidden');

  } else {
    // There are not enough people
    divvyResults = false;

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').removeClass('hidden');

  }

  toggleResultsPrompt();
}

$('body').on('input', '.js-divvy', function() {
  divvy();
});

$('body').on('click', 'input', function() {
  $(this).select();
});

var expenseTemplate = $('#expense-template').removeAttr('id').clone();

// Add new expense
$('body').on('click', '.add-expense', function() {
  expenseTemplate.clone().insertBefore(this).find('.label').select();
});

var names = [
  "Aiko",
  "Alma",
  "Archy",
  "Arlie",
  "Audrey",
  "Cassius",
  "Celia",
  "Clara",
  "Cora",
  "Edward",
  "Elle",
  "Esther",
  "Ethan",
  "Ethel",
  "Ezra",
  "Farah",
  "Frances",
  "Grace",
  "Hamish",
  "Helen",
  "Ira",
  "Itsuki",
  "Jacob",
  "Joseph",
  "Karim",
  "Kariuki",
  "Leo",
  "Lillian",
  "Lucian",
  "Malcolm",
  "Maurice",
  "Mustafa",
  "Niko",
  "Omar",
  "Pedro",
  "Peta",
  "Reed",
  "Rowan",
  "Ruhul",
  "Vera",
  "Vernon",
  "Violet",
  "Vladislav",
  "Walter",
  "Yui",
  "Yusuf"
];

function getRandName() {
  var randIndex = Math.floor(Math.random() * names.length);
  var selectedName = names[randIndex];
  names.splice(randIndex, 1);

  return selectedName;
}

// Randomly assign names to the initial people in the template
$('.person').each(function() {
  $(this).find('.name').val(getRandName());
});

var personTemplate = $('#person-template').removeAttr('id').clone();

// Add new person
$('.add-person').click(function() {
  personTemplate.clone().insertBefore(this).find('.name').val(getRandName).select();
  divvy();
});

// Remove person or expense
$('body').on('click', '.remove-control', function() {
  // TODO change this confirmation to a notification/undo banner
  if ($(this).hasClass('remove-person')) {
    var personName = $(this).next('input.name').val();
    if (personName == '') {
      personName = 'this person';
    }
    var confirmRemove = window.confirm('Do you want to remove '+ personName + '?');
    if (confirmRemove) {
      $(this).parent().remove();
    }
  } else {
    $(this).parent().remove();
  }
  divvy();
});



// Show and hide results scroll prompt
var wHeight = $(window).height();

function toggleResultsPrompt() {
  var scrollY = $(document).scrollTop();
  var resultsOffset = $('.text-box').offset().top;
  var onScreen = (wHeight + scrollY) - resultsOffset;

 if (onScreen < 50 && divvyResults) {
   $('.scroll-to-results').removeClass('hidden');
 }

 if (onScreen > 50) {
   $('.scroll-to-results').addClass('hidden');
 }
}

$(window).resize(function() {
  wHeight = $(window).height();
  toggleResultsPrompt();
});

$(window).scroll(function() {
 toggleResultsPrompt();
});

// Scroll to results
$('body').on('click', '.scroll-to-results', function() {

  $('html, body').animate({
    scrollTop: ($('.text-box').offset().top)
  }, 500);
});



$(document).ready(function(){
  $('body').removeClass('loading');
});
