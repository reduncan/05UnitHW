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
        event.preventDefault();
        switch (databaseFunction) {
            case 'print':
                runPrint();
                break;
            case 'verify':
                runVerify();
                break;
            case 'lookup':
                runLookup();
                break;
            case 'contains':
                runContains();
                break;
            case 'update':
                runUpdate();
                break;
            case 'add':
                runAdd();
                break;
            case 'delete':
                runDelete();
                break;
            case 'alphabetize':
                runAlpha();
                break;
        }
    }
};

const runPrint = function () {
    htmlStr = '';
    state.employeeList.forEach(employee => {
        htmlStr += `<div class="print"><p>Name: ${employee.name}</p>`;
        htmlStr += `<p>Office Number: ${employee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${employee.phoneNum}</p>`;
        htmlStr += `<p>-----</p></div>`;
    });
    render(htmlStr);
};

const runVerify = function () {
    htmlStr = '';
    state.employeeList.some(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase()) ? htmlStr = '<div class="print"><p>Employee Found</p></div>' : htmlStr = '<div class="print"><p>Employee Not Found</p></div>';
    render(htmlStr);
};

const runLookup = function () {
    htmlStr = '';
    let lookupEmployee = state.employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase())
    if (lookupEmployee !== undefined) {
        htmlStr += `<div class="print"><p>Name: ${lookupEmployee.name}</p>`;
        htmlStr += `<p>Office Number: ${lookupEmployee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${lookupEmployee.phoneNum}</p></div>`;
    } else {
        htmlStr += '<div class="print"><p>Employee Not Found</p></div>'
    };
    render(htmlStr);
};

const runContains = function () {
    htmlStr = '';
    let containsEmployee = false
    userInput = $('#input').val().toLowerCase();
    let foundEmployee = state.employeeList.filter(employee => employee.name.toLowerCase().includes(userInput));
    foundEmployee.forEach(employee => {
        htmlStr += `<div class="print"><p>Name: ${employee.name}</p>`;
        htmlStr += `<p>Office Number: ${employee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${employee.phoneNum}</p>`;
        htmlStr += `<p> ----- </p></div>`;
        containsEmployee = true;
    });
    if (containsEmployee === false) {
        htmlStr += `<p>No Employee Match</p>`;
    }
    render(htmlStr);
};

const runUpdate = function () {
    htmlStr = '';
    let updateEmployee = state.employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase())
    updateEmployee.officeNum = $('#office').val();
    updateEmployee.phoneNum = $('#phone').val();
    if (updateEmployee !== undefined) {
        htmlStr += `<div class="print"><p>Name: ${updateEmployee.name}</p>`;
        htmlStr += `<p>Office Number: ${updateEmployee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${updateEmployee.phoneNum}</p></div>`;
    }
    render(htmlStr);
};

const runAdd = function () {
    htmlStr = '';
    const newEmployee = {
        name: $('#input').val(),
        officeNum: $('#office').val(),
        phoneNum: $('#phone').val()
    }

    state.employeeList.push(newEmployee);

    state.employeeList.forEach(employee => {
        htmlStr += `<div class="print"><p>Name: ${employee.name}</p>`;
        htmlStr += `<p>Office Number: ${employee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${employee.phoneNum}</p>`;
        htmlStr += `<p> ----- </p></div>`;
    });
    render(htmlStr);
};

const runDelete = function () {
    htmlStr = '';
    let deleteEmployee = state.employeeList.findIndex(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase())
    console.log(deleteEmployee);
    if (deleteEmployee === -1) {
        htmlStr += `<p>No Employee Match</p>`;
    };
    if (deleteEmployee !== -1) {
        state.employeeList.splice(deleteEmployee, 1);
        state.employeeList.forEach(employee => {
            htmlStr += `<div class="print"><p>Name: ${employee.name}</p>`;
            htmlStr += `<p>Office Number: ${employee.officeNum}</p>`;
            htmlStr += `<p>Phone Number: ${employee.phoneNum}</p>`;
            htmlStr += `<p> ----- </p></div>`;
        })
    };
    render(htmlStr);
};

const runAlpha = function () {
    htmlStr = '';
    state.employeeList.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
    state.employeeList.forEach(employee => {
        htmlStr += `<div class="print"><p>Name: ${employee.name}</p>`;
        htmlStr += `<p>Office Number: ${employee.officeNum}</p>`;
        htmlStr += `<p>Phone Number: ${employee.phoneNum}</p>`;
        htmlStr += `<p> ----- </p></div>`;
    })
    render(htmlStr);
};

const render = function (htmlStr) {
    $('#render').html(htmlStr);
};

const hideTitle = function () {
    $('.title').addClass('hide');
};

const showTitle = function () {
    $('.title').removeClass('hide');
};

const showRender = function () {
    $('#render').addClass('show');
};

const hideForm = function () {
    $('form').removeClass('show')
};

const showForm = function () {
    $('form').addClass('show');
};

const addInput = function () {
    $('#input, #submit').addClass('show');
};

const hideInput = function () {
    $('#input, #submit').removeClass('show');
};

const addFields = function () {
    $('#office, #phone').addClass('show');
};

const removeFields = function () {
    $('#office, #phone').removeClass('show');
};

const hidePrint = function () {
    $('.print').addClass('hide');
};

const home = function () {
    showTitle();
    removeFields();
    hideInput();
    hideForm();
    hidePrint();
};

const print = function (event) {
    databaseFunction = 'print';
    state.runFunction(event);
    removeFields();
    hideInput();
    hideForm();
    hideTitle();
};

const verify = function () {
    databaseFunction = 'verify';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
};

const lookup = function () {
    databaseFunction = 'lookup';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
};

const contains = function () {
    databaseFunction = 'contains';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
};

const update = function () {
    databaseFunction = 'update';
    hidePrint();
    addInput();
    addFields();
    showForm();
    hideTitle();
};

const add = function () {
    databaseFunction = 'add';
    hidePrint();
    addInput();
    addFields();
    showForm();
    hideTitle();
};

const remove = function () {
    databaseFunction = 'delete';
    hidePrint();
    addInput();
    removeFields();
    showForm();
    hideTitle();
};

const alphabetize = function (event) {
    databaseFunction = 'alphabetize';
    state.runFunction(event);
    removeFields();
    hideInput();
    hideForm();
    hideTitle();
};

$('.far, h4').on('click', home);
$('#print').on('click', print);
$('#verify').on('click', verify);
$('#lookup').on('click', lookup);
$('#contains').on('click', contains);
$('#update').on('click', update);
$('#add').on('click', add);
$('#delete').on('click', remove);
$('#alphabetize').on('click', alphabetize);
$('#submit').on('click', state.runFunction);