var isOpen = false;
var myName = 'Chad';
var myAge = 32;
var me = ['Chad', 32, 'Developer'];
var Job;
(function (Job) {
    Job[Job["WebDev"] = 0] = "WebDev";
    Job[Job["WebDesigner"] = 1] = "WebDesigner";
    Job[Job["PM"] = 2] = "PM";
})(Job || (Job = {}));
var job = Job.WebDev;
var phone = 'Pixel';
var tablet = 3;
toggleNothingSelected();
setCheckboxesFromLocalStorage();
var buttons = Array.from(document.querySelectorAll('#accordion button'));
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.nextElementSibling) {
            button.nextElementSibling.classList.toggle('open');
            if (button.nextElementSibling.classList.contains('open')) {
                button.ariaExpanded = 'true';
                button.nextElementSibling.setAttribute('aria-hidden', 'false');
            }
            else {
                button.ariaExpanded = 'false';
                button.nextElementSibling.setAttribute('aria-hidden', 'true');
            }
        }
    });
});
var checkboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'));
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        toggleNothingSelected();
        if (checkbox.id.includes('peeker')) {
            onlyAllowOnePeeker(checkbox);
        }
        updateLocalStorage();
        updateSelected();
    });
});
function toggleNothingSelected() {
    var checkboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'));
    var hasChecked = checkboxes.some(function (checkbox) { return checkbox.checked; });
    if (hasChecked) {
        var nothingSelected = document.querySelector('#nothing-selected');
        nothingSelected.style.display = 'none';
    }
    else {
        var nothingSelected = document.querySelector('#nothing-selected');
        nothingSelected.style.display = 'block';
    }
}
function updateLocalStorage() {
    var checkboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'));
    var checked = [];
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checked.push(checkbox.id);
        }
    });
    localStorage.setItem('checked', JSON.stringify(checked));
}
function setCheckboxesFromLocalStorage() {
    var checkboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'));
    var checked = JSON.parse(localStorage.getItem('checked') || '[]');
    checkboxes.forEach(function (checkbox) { return checkbox.checked = checked.includes(checkbox.id) ? true : false; });
    updateSelected();
}
function updateSelected() {
    var checkedCheckboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]:checked'));
    var checkedIds = checkedCheckboxes.map(function (checkbox) { return checkbox.id; });
    var tags = Array.from(document.querySelectorAll('.tag'));
    tags.forEach(function (tag) {
        if (tag.dataset.checkid === undefined)
            return;
        checkedIds.includes(tag.dataset.checkid) ? tag.classList.add('selected') : tag.classList.remove('selected');
    });
}
function onlyAllowOnePeeker(checkbox) {
    var peekers = Array.from(document.querySelectorAll('#peekers input[type="checkbox"]'));
    peekers.forEach(function (peeker) {
        if (peeker.id !== checkbox.id) {
            peeker.checked = false;
        }
    });
}
