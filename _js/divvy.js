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

    $('.cost-summary').removeClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').addClass('hidden');

    $('.cost-total').text(decimalize(totalCost));
    $('.number-of-people').text(totalPersons);
    $('.cost-share').text(decimalize(share));

  } else if (persons.length > 1 && totalCost != 0) {
    // There are enough people, the total cost is not 0, but the cost evens out

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').removeClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').addClass('hidden');

  } else if (persons.length > 1) {
    // There are enough people, but the total cost is 0

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').removeClass('hidden');
    $('.add-more-people').addClass('hidden');

  } else {
    // There are not enough people

    $('.cost-summary').addClass('hidden');
    $('.even-expenses').addClass('hidden');
    $('.add-expenses').addClass('hidden');
    $('.add-more-people').removeClass('hidden');

  }
}

$('body').on('input', 'input', function() {
  divvy();
});

var expenseTemplate = $('#expense-template').removeAttr('id').clone();

// Add new expense
$('body').on('click', '.add-expense', function() {
  expenseTemplate.clone().insertBefore(this);
});

var names = [
  "Alex",
  "Alma",
  "Amy",
  "Andy",
  "Archy",
  "Arlie",
  "Audrey",
  "Celia",
  "Charlie",
  "Clara",
  "Cora",
  "Edward",
  "Ellen",
  "Emily",
  "Emma",
  "Esther",
  "Ethan",
  "Ethel",
  "Ezra",
  "Frances",
  "Grace",
  "Hamish",
  "Harry",
  "Helen",
  "Ira",
  "Jacob",
  "Jess",
  "Joseph",
  "Leo",
  "Lillian",
  "Lucian",
  "Malcolm",
  "Maurice",
  "Natalie",
  "Peta",
  "Reed",
  "Rowan",
  "Ruhul",
  "Ryan",
  "Savannah",
  "Vera",
  "Vernon",
  "Walter"
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
  personTemplate.clone().insertBefore(this).find('.name').val(getRandName);
  divvy();
});

// Remove person or expense
$('body').on('click', '.remove-control', function() {
  $(this).parent().remove();
  divvy();
});



$(document).ready(function(){

  $('body').removeClass('loading');

});
