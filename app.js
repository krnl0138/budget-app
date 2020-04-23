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
