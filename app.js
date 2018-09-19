const state = {
    employeeList: [
        {
            name: 'Jan',
            officeNum: 1,
            phoneNum: '222-222-2222'
        },
        {
            name: 'Juan',
            officeNum: 304,
            phoneNum: '489-789-8789'
        },
        {
            name: 'Margie',
            officeNum: 789,
            phoneNum: '789-789-7897'
        },
        {
            name: 'Sara',
            officeNum: 32,
            phoneNum: '222-789-4654'
        },
        {
            name: 'Tyrell',
            officeNum: 3,
            phoneNum: '566-621-0452'
        },
        {
            name: 'Tasha',
            officeNum: 213,
            phoneNum: '789-766-5675'
        },
        {
            name: 'Ty',
            officeNum: 211,
            phoneNum: '789-766-7865'
        },
        {
            name: 'Sarah',
            officeNum: 345,
            phoneNum: '222-789-5231'
        }
    ],

    databaseFunction: '',

    runFunction: function (event) {
        let employeeList = state.employeeList;
        event.preventDefault();
        let htmlStr = '';
        switch (databaseFunction) {
            case 'print':
                employeeList.forEach(employee => {
                    htmlStr += `<div class="print"><p> ${employee.name} </p>`;
                    htmlStr += `<p> ${employee.officeNum} </p>`;
                    htmlStr += `<p> ${employee.phoneNum} </p>`;
                    htmlStr += `<p>-----</p></div>`;
                });
                render(htmlStr);
                break;
            case 'verify':
                employeeList.some(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase()) ? htmlStr = '<div class="print"><p>Employee Found</p></div>' : htmlStr = '<div class="print"><p>Employee Not Found</p></div>';
                render(htmlStr);
                break;
            case 'lookup':
                let lookupEmployee = employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase())
                if (lookupEmployee !== undefined) {
                    htmlStr += `<div class="print"><p> ${lookupEmployee.name} </p>`;
                    htmlStr += `<p> ${lookupEmployee.officeNum} </p>`;
                    htmlStr += `<p> ${lookupEmployee.phoneNum} </p>`;
                } else {
                    htmlStr += '<div class="print"><p>Employee Not Found</p></div>'
                };
                render(htmlStr);
                break;
            case 'contains':
                let containsEmployee = false
                userInput = $('#input').val().toLowerCase();
                let foundEmployee = employeeList.filter(employee => employee.name.toLowerCase().includes(userInput));
                foundEmployee.forEach(employee => {
                    htmlStr += `<div class="print"><p> ${employee.name} </p>`;
                    htmlStr += `<p> ${employee.officeNum} </p>`;
                    htmlStr += `<p> ${employee.phoneNum} </p>`;
                    htmlStr += `<p> ----- </p></div>`;
                    containsEmployee = true;
                });
                if (containsEmployee === false) {
                    htmlStr += `<p>No Employee Match</p>`;
                }
                render(htmlStr);
                break;
            case 'update':
                let updateEmployee = employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase())
                update.officeNum = $('#office').val();
                update.phoneNum = $('#phone').val();
                if (updateEmployee !== undefined) {
                    htmlStr += `<div class="print"><p> ${updateEmployee.name} </p>`;
                    htmlStr += `<p> ${update.officeNum} </p>`;
                    htmlStr += `<p> ${update.phoneNum} </p></div>`;
                }
                render(htmlStr);
                break;
            case 'add':
                const newEmployee = {
                    name: $('#input').val(),
                    officeNum: $('#office').val(),
                    phoneNum: $('#phone').val()
                }

                employeeList.push(newEmployee);

                employeeList.forEach(employee => {
                    htmlStr += `<div class="print"><p> ${employee.name} </p>`;
                    htmlStr += `<p> ${employee.officeNum} </p>`;
                    htmlStr += `<p> ${employee.phoneNum} </p>`;
                    htmlStr += `<p> ----- </p></div>`;
                })
                render(htmlStr);
                break;
            case 'delete':
                let deleteEmployee = employeeList.indexOf($('#input').val().toLowerCase())
                console.log(deleteEmployee);
                employeeList.splice(deleteEmployee, 1);
                employeeList.forEach(employee => {
                    htmlStr += `<div class="print"><p> ${employee.name} </p>`;
                    htmlStr += `<p> ${employee.officeNum} </p>`;
                    htmlStr += `<p> ${employee.phoneNum} </p>`;
                    htmlStr += `<p> ----- </p></div>`;
                })
                render(htmlStr);
                break;
            case 'alphabetize':
                employeeList.sort(function (a, b) {
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                })
                employeeList.forEach(employee => {
                    htmlStr += `<div class="print"><p> ${employee.name} </p>`;
                    htmlStr += `<p> ${employee.officeNum} </p>`;
                    htmlStr += `<p> ${employee.phoneNum} </p>`;
                    htmlStr += `<p> ----- </p></div>`;
                })
                render(htmlStr);
                break;
        }
    }
};

const render = function (htmlStr) {
    $('#render').html(htmlStr);
}

const hideTitle = function () {
    $('.title').addClass('hide');
}

const showRender = function () {
    $('#render').addClass('show');
}

const hideForm = function () {
    $('form').removeClass('show')
}

const showForm = function () {
    $('form').addClass('show');
}

const addInput = function () {
    $('#input, #submit').addClass('show');
}

const hideInput = function () {
    $('#input, #submit').removeClass('show');
}

const addFields = function () {
    $('#office, #phone').addClass('show');
}

const removeFields = function () {
    $('#office, #phone').removeClass('show');
}

const hidePrint = function () {
    $('.print').addClass('hide');
}

const print = function (event) {
    databaseFunction = 'print';
    state.runFunction(event);
    removeFields();
    hideInput();
    hideForm();
    hideTitle();
}

const verify = function (event) {
    databaseFunction = 'verify';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
}

const lookup = function (event) {
    databaseFunction = 'lookup';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
}

const contains = function () {
    databaseFunction = 'contains';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
}

const update = function () {
    databaseFunction = 'update';
    hidePrint();
    addInput();
    addFields();
    showForm();
    hideTitle();
}

const add = function () {
    databaseFunction = 'add';
    hidePrint();
    addInput();
    addFields();
    showForm();
    hideTitle();
}

const remove = function () {
    databaseFunction = 'delete';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
}

const alphabetize = function (event) {
    databaseFunction = 'alphabetize';
    state.runFunction(event);
    removeFields();
    hideInput();
    hideForm();
    hideTitle();
}

$('#print').on('click', print);
$('#verify').on('click', verify);
$('#lookup').on('click', lookup);
$('#contains').on('click', contains);
$('#update').on('click', update);
$('#add').on('click', add);
$('#delete').on('click', remove);
$('#alphabetize').on('click', alphabetize);
$('#submit').on('click', state.runFunction);