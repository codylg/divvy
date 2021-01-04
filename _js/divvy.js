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

// Highlight input on click, but avoid on Android because it's weird
var ua = navigator.userAgent.toLowerCase();
var uaAndroid = ua.indexOf("android") > -1;

$('body').on('click', 'input', function() {

  if (!uaAndroid) {
    $(this).select();
  }
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
var storedPersonTemplate;
var storedPersonName;
var storedPersonExpenseLabels = [];
var storedPersonExpenseCosts = [];

$('body').on('click', '.remove-expense', function() {
  $(this).parent().remove();
  divvy();
});

var undoBanner = $('.undo-banner');
var undoBannerName = $('.undo-person-name');
var undoBannerTimeout;

function showUndoBanner() {
  if (undoBanner.hasClass('hidden')) {
    undoBanner.removeClass('hidden');
  }

  if (storedPersonName) {
    undoBannerName.text(storedPersonName);
  } else {
    undoBannerName.text('Some Guy');
  }
}

function hideUndoBanner() {
  if (!undoBanner.hasClass('hidden')) {
    undoBanner.addClass('hidden');
  }
}

$('body').on('click', '.remove-person', function() {
  var removedPerson = $(this).parent();
  var removedPersonExpense = removedPerson.find('.expense');

  // Store the removed person template and names
  storedPersonTemplate = removedPerson.html();
  storedPersonName = removedPerson.find('input.name').val();

  // Store each expense label
  // Empty the array first
  storedPersonExpenseLabels = [];

  removedPersonExpense.each(function(i, expense) {
    var label = $(this).find('.label').val();
    storedPersonExpenseLabels.push(label);
  });

  // Store each expense cost
  // Empty the array first
  storedPersonExpenseCosts = [];

  removedPersonExpense.each(function(i, expense) {
    var cost = $(this).find('.expense-cost').val();
    storedPersonExpenseCosts.push(cost);
  });

  // Finally, remove the person
  $(this).parent().remove();
  clearTimeout(undoBannerTimeout);
  showUndoBanner();

  divvy();
  undoBannerTimeout = setTimeout(hideUndoBanner, 9000);
});

// Restore a person
$('body').on('click', '.restore-person', function() {
  clearTimeout(undoBannerTimeout);
  hideUndoBanner();
  // TODO restore the person to their original position
  $('.add-person').before('<div class="person">' + storedPersonTemplate + '</div>');

  // This is the person that was just restored
  var restoredPerson = $('.add-person').prev();

  // Input the stored name
  restoredPerson.find('.name').val(storedPersonName);

  // Input the expense labels
  restoredPerson.find('.label').each(function(i) {
    $(this).val(storedPersonExpenseLabels[i]);
    i++;
  });

  // Input the expense costs
  restoredPerson.find('.expense-cost').each(function(i) {
    $(this).val(storedPersonExpenseCosts[i]);
    i++;
  });

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
