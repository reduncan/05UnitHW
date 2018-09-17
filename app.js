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
    ];

    databaseFunction = '';

    runFunction = function (event) {
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
            employeeList.some(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase() ? htmlStr = '<div class="print"><p>Employee Found</p></div>' : htmlStr = '<div class="print"><p>Employee Not Found</p></div>');
            render(htmlStr);
            break;
        case 'lookup':
            let match = false;
            employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase() ? match = employee : htmlStr = `<p>No Employee Match</p>`)
            if (match !== false) {
                htmlStr += `<div class="print"><p> ${match.name} </p>`;
                htmlStr += `<p> ${match.officeNum} </p>`;
                htmlStr += `<p> ${match.phoneNum} </p>`;
            }
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
            let update = '';
            employeeList.find(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase() ? update = employee : htmlStr = `<p>No Employee Match</p>`);
            update.officeNum = $('#office').val();
            update.phoneNum = $('#phone').val();
            if (update !== false) {
                htmlStr += `<div class="print"><p> ${update.name} </p>`;
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
            employeeList.splice(employee => employee.name.toLowerCase() === $('#input').val().toLowerCase(), 1)
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
    state.databaseFunction = 'print';
    runFunction(event);
    removeFields();
    hideInput();
    hideForm();
}

const verify = function (event) {
    state.databaseFunction = 'verify';
    hidePrint();
    addInput();
    removeFields();
    showForm();
}

const lookup = function (event) {
    state.databaseFunction = 'lookup';
    hidePrint();
    addInput();
    removeFields();
    showForm();
}

const contains = function () {
    state.databaseFunction = 'contains';
    hidePrint();
    addInput();
    removeFields();
    showForm();
}

const update = function () {
    state.databaseFunction = 'update';
    hidePrint();
    addInput();
    addFields();
    showForm();
}

const add = function () {
    state.databaseFunction = 'add';
    hidePrint();
    addInput();
    addFields();
    showForm();
}

const remove = function () {
    state.databaseFunction = 'delete';
    hidePrint();
    addInput();
    removeFields();
    showForm();
}

const alphabetize = function (event) {
    state.databaseFunction = 'alphabetize';
    runFunction(event);
    removeFields();
    hideInput();
    hideForm();
}

$('#print').on('click', print);
$('#verify').on('click', verify);
$('#lookup').on('click', lookup);
$('#contains').on('click', contains);
$('#update').on('click', update);
$('#add').on('click', add);
$('#delete').on('click', remove);
$('#alphabetize').on('click', alphabetize);
$('button').on('click', runFunction);