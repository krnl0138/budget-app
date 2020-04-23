//// SECTION 6: Budget App

//////////////// LECTURE 01: PLANNING THE ARCHITECTURE: STEP 1

// Planning: Step 1
// Think about the most general things that the app should do

//// TO-DO list

// Add event handler for `OK` button on click
// Get input values
// Add new item to our data structure (DATA)
// Add new item to the UI (BOTTOM)
// Calculate budget (DATA)
// Update UI (TOP)

//// OFF TOPIC: Modules to structure code in JS and in programmming in general.

// 1: Important aspect of any robust app's architecture;
// 2: Keep the units of code for a project both cleanly separted and organized;
// 3: Encapsulate some data into privacy and expose other data publicly;

// Now let's organize our TO-DO list according to modules

//// UI MODULE
// Get input values
// Add new item to the UI (BOTTOM)
// Update UI (TOP)

//// DATA MODULE
// Add new item to our data structure (DATA)
// Calculate budget (DATA)

//// CONTROLLER MODULE
// Add event handler for `OK` button on click


//////////////// LECTURE 02: IMPLEMENTING THE MODULE PATTERN

// IN THIS LECTURE:
// 1. How to use module pattern;
// 2. More about private and public data, encapsulation and
//  separations of concers

// Encapsulation allows us to hide the implementation detailes of the specific
// modules from the outside scope, we expose only public interface (API)

// For this we use `MODULE` pattern, which is very popular in JS

// Separation of concerns -- each part should only be interested in doing
// one thing and doing it independently (SOC from _S_OLID)

// We pass other two objects as arguments to `controller` in order
// to let it knows about other two modules and connect them


//////////////// LECTURE 03: SETTING UP THE FIRST EVENT LISTENERS

// 1. How to set up event listeners for keypress events,
// 2. How to use event object;

//////////////// LECTURE 04: READING INPUT DATA

// 1. How to read data from different HTML input types;

// Overall, we call some action from Global controller
// It is done by other controllers and returned back to the Global controller.

//////////////// LECTURE 05: CREATING INIT FUNCTION

// 1. How and why use init function

//////////////// LECTURE 06: CREATING INCOME AND EXPENSE FUNCTION CONSTRUCTIONS

// 1. How to choose function constructions that meet our application's needs
// 2. How to set up a proper data structure for our budget controller

//////////////// LECTURE 07: ADDING A NEW ITEM TO OUR BUDGET CONTROLLER

// 1. How to avoid conflicts in our data structures
// 2. How and why to pass data from one module to another

//////////////// LECTURE 08: ADDING A NEW ITEM TO THE UI

// 1. A technique for adding big chunks of HTML into the DOM,
// 2. How to replace parts of strings,
// 3. How to do DOM manipulation using `insertAdjacentHTML` method

//////////////// LECTURE 09: CLEARING OUR INPUT FIELDS

// 1. How to clear HTML fields,
// 2. How to use `querySelectorAll`,
// 3. How to convert a list to an array,
// 4. A better way to loop over an array then `for` loops: `foreach`;

//////////////// LECTURE 10: UPDATING THE BUDGET CONTROLLER

// 1. How to convert fields input to numbers;
// 2. How to prevent false inputs.

//////////////// LECTURE 11: UPDATING THE BUDGET: THE BUDGET CONTROLLER

// 1. how to convert fields input to numbers
// 2. how to prevent false inputs.

//////////////// LECTURE 12: UPDATING THE BUDGET: UI CONTROLLER

// 1. how to convert fields input to numbers;
// 2. how to prevent false inputs.

//////////////// LECTURE 13: PROJECT PLANNING AND ARCHITECTURE: STEP 2

// NEW TO-DO
    // 1. Add event handler for delete buttons
    // 2. Delete an item from data
    // 3. Delete an item from the UI
    // 4. Re-calculate budget
    // 5. Update the UI

//////////////// LECTURE 14: EVENT DELEGATION

// Event Bubbling => Target Element => Event Delegation

// Event bubbling -- JS concept when event is triggered on some el, then
// the same event is triggered on all the parent elms until the `HTML` (root)

// Target element -- an element on which the event was first fired

// Event delegation -- each element will know about target element, bc it is
// stored in a property of an `event` object. With this we can catch an event on
// a parent el, e.g. wait until it bubbles up.

// Use cases for the event delegation

    // 1. When we have an elements with lots of child elements that we are
// interested in

    // 2. When we want an event handler attached to an element which is not yet
// in the DOM when the page is loaded

//////////////// LECTURE 15: SETTING UP THE DELETE EVENT LISTENER USING EVENT DELEGATION

// 1. How to use event delegation in practice.
// 2. How to use the IDs in HTML to connect the UI with the data model
// 3. How to use `parentNode` for DOM traversing

    // inc-1 is the form of our response, we need to split it by using
    // internal `split` method for strings. JS will create a wrapper
    // when this method is called turning primitive into an object,
    // allowing to use those internal methods.

//////////////// LECTURE 16: DELETING THE ITEM FROM OUR BUDGET CONTROLLER

// 1. Yet another way to loop over an array `map`;
// 2. How to remove elements from an array using `splice` method.

//////////////// LECTURE 17: DELETING THE ITEM FROM THE UI

// 1. More DOM manipulation: how to remove element from the DOM

//////////////// LECTURE 18: PROJECT PLANNING AND ARCHITECTURE: STEP 3

// NEW TO-DO
    // 1. Calculate percentages
    // 2. Update them in the UI

    // 3. Display the month and year

    // 4. Number formatting
    // 5. Improve input fields UX

//////////////// LECTURE 19: UPDATING THE PERCENTAGES THE CONTROLLER

// 1. Reinforce some of concepts and techniques that we have learned so far.

//////////////// LECTURE 20: UPDATING THE PERCENTAGES: BUDGET CONTROLLER

// 1. How to make budget controller iteract with the Expense prototype

//////////////// LECTURE 21: UPDATING THE PERCENTAGES: UI CONTROLLER

// 1. How to create our own forEach function but for NodeLists instead of arrays

//////////////// LECTURE 21: FORMATTING OUR BUDGET NUMBERS: STRING MANIPULATION

// 1. How to use different string methods to manipulate strings

//////////////// LECTURE 22: DISPLAYING THE CURRENT YEAR AND MONTH

// 1. How to get the current date using the `Date` object constructor

//////////////// LECTURE 22: FINISHING TOUCHES: IMPROVING THE UX

// 1. How and when to use `change` events

// `Change` event occurs every time we click and change something

// BUDGET CONTROLLER
var budgetController = ( function() {

    var Income = function(id, description, value) { // function construction to create new income
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) { // function construction to create new expense
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calculatePercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var calculateTotal = function(type) {
        var sum = 0;

        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    var data = { // data structure to manipulate with instead of a heap of vars
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // `-1` stands for no existence if no value provided
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new ID
            // check if there is one element at all
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // push new item into data structure
            data.allItems[type].push(newItem);

            // return new item
            return newItem; // give an access to this var
        },

        deleteItem: function(type, id) {
            var ids, index;

            // we create an array of current ids in arrays based on types
            ids = data.allItems[type].map(function(current) { // `map` is alike `forEach`, but return new array
               return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1); // will delete 1 el on received index number
            }

        },

        // Calculate the budget
        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calulate the budget
            if (data.totals.inc > 0) { // fix the problem when income 0 and expenses exist: division by 0
                // calculate total income and expenses
                data.budget = data.totals.inc - data.totals.exp;
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function (cur) {
              cur.calculatePercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        // Return budget
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
        }
    };

})();

// APP UI CONTROLLER
var UIController = ( function() {

    var DOMstrings = { // private CSS class selector to manage names
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expensesLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;
        /*
        + or - before the number
        exactly 2 decimal points
        comma separating thousands
        */
        num = Math.abs(num);
        num = num.toFixed(2); // only 2 decimal digits, returns a string
        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // input 2310 => 2,310
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };


    return {
        getInput: function() {
            return { // we return something for a controller to operate with;
                    // we use a single object with 3 variables for convenience
                type: document.querySelector(DOMstrings.inputType).value, // either `inc` or `exp`
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // convert a string to a float number
            }
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id); // 'regex', substitution
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));

            // Insert HTML into the code
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); // as a last child
        },

        deleteListItem: function(selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;
            // `querySelectorAll` returns a list, not an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // CSS selection with a comma
            // we `call` `Array` object method `slice` which creates a copy of an array for
            // a list to trick the parser in order to make it thinks this is an array we pass in
            var fieldsArr = Array.prototype.slice.call(fields); // will return an array instead of a list

            fieldsArr.forEach(function(current, index, array) {  // we provide a callback function (upto 3 args) to apply for every el of an array
                current.value = ""; // there will be `inputDescription` and `inputValue`
            });

            fieldsArr[0].focus(); // sets the focus to the first el of an array
        },

        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function(percentages) {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // querySelectorAll returns a node list in DOM each el is called node

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function() {
            var now, year, month, months, monthsRu;
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            monthsRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = monthsRu[month] + ' ' + year;
        },

        changeType: function() {
            var fields = document.querySelectorAll( // will return nodeList
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

        },

        getDOMstrings: function() {
            return DOMstrings; // we make `DOMstrings` public to pass into another module
        }
    }

})();

// GLOBAL APP CONTROLLER, actions for other methods
var controller = ( function(budgetCtrl, UICtrl) { // diff names to use them once

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings(); // grab `DOMstrings` from UI module, here 'cause it is only for eventListeners

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) { // Event argument, can be anything, others use `e`
            if (event.keyCode === 13 || event.which === 13) { // `which` is to support older browsers
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };

    // we cam add or remove elements thus we separate it
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);


    };

    // executes on every button/enter press
    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // We make anything only if user typed a correct data input
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            // 2. Add an item to the budgetController
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add new item to the user interface
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) { // we need `event` to know what the target el is
        var itemID, splitID, type, ID;
        // traversing DOM structure using `parentNode` and grab `id` value
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // `target` property of `event` shows us an el where event was fired

        if (itemID) { // will be coehrced to TRUE if exists.

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the data from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();

        }
    };

    return { // we need to start private data: this function initialize them by executing
        init: function() {
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({ // we pass `budget` object with 0 to display 0 at start
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController); // assign objects with the arguments

// Outside body of program
controller.init(); // initialize our app
