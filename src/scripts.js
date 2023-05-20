var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var pals = {
    'dog': {
        name: 'Dog',
        image: '',
        alt: ''
    },
    'kitty': {
        name: 'Kitty',
        image: '',
        alt: ''
    },
    'raccoon': {
        name: 'Raccoon',
        image: '',
        alt: ''
    },
    'opossum': {
        name: 'Opossum',
        image: '',
        alt: ''
    },
    'ghost': {
        name: 'Ghost',
        image: '',
        alt: ''
    },
    'mothman': {
        name: 'Mothman',
        image: '',
        alt: ''
    },
    'baba-yaga': {
        name: 'Baba Yaga',
        image: '',
        alt: ''
    }
};
var pronouns = {
    'he-him': {
        name: 'He/Him',
        image: '',
        alt: ''
    },
    'she-her': {
        name: 'She/Her',
        image: '',
        alt: ''
    },
    'they-them': {
        name: 'They/Them',
        image: '',
        alt: ''
    }
};
var flags = {
    'rainbow': {
        name: 'Rainbow',
        image: '',
        alt: ''
    },
    'progress': {
        name: 'Progress',
        image: '',
        alt: ''
    },
    'trans': {
        name: 'Trans',
        image: '',
        alt: ''
    },
    'bisexual': {
        name: 'Bisexual',
        image: '',
        alt: ''
    },
    'pansexual': {
        name: 'Pansexual',
        image: '',
        alt: ''
    },
    'nonbinary': {
        name: 'Nonbinary',
        image: '',
        alt: ''
    },
    'asexual': {
        name: 'Asexual',
        image: '',
        alt: ''
    },
    'lesbian': {
        name: 'Lesbian',
        image: '',
        alt: ''
    }
};
var plaques = {
    'moon-phases': {
        name: 'Moon Phases',
        image: '',
        alt: ''
    },
    'book-shelf': {
        name: 'Book Shelf',
        image: '',
        alt: ''
    }
};
var data = { pals: pals, pronouns: pronouns, flags: flags, plaques: plaques };
renderSelected();
renderInputs();
setCheckboxesFromLocalStorage();
toggleNothingSelected();
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
function onlyAllowOnePal(checkbox) {
    var pals = Array.from(document.querySelectorAll('#pals input[type="checkbox"]'));
    pals.forEach(function (pal) {
        if (pal.id !== checkbox.id) {
            pal.checked = false;
        }
    });
}
function renderSelected() {
    var main = document.querySelector('main');
    if (!main)
        return;
    var section = document.createElement('section');
    section.id = 'selected';
    var heading = document.createElement('h2');
    heading.innerText = 'Your selection';
    heading.classList.add('sr-only');
    section.append(heading);
    var list = document.createElement('ul');
    list.id = 'tag-wrapper';
    var palItems = renderSelectedListItems(pals);
    var reversedPalItems = renderSelectedListItems(pals).reverse();
    var pronounItems = renderSelectedListItems(pronouns);
    var flagItems = renderSelectedListItems(flags);
    var plaqueItems = renderSelectedListItems(plaques);
    var combined = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], palItems, true), pronounItems, true), flagItems, true), plaqueItems, true), reversedPalItems, true);
    combined.forEach(function (item) { return list.appendChild(item); });
    section.append(list);
    var nothingSelected = document.createElement('p');
    nothingSelected.id = 'nothing-selected';
    nothingSelected.innerText = 'Select some tags!';
    section.append(nothingSelected);
    main.append(section);
}
function renderSelectedListItems(category) {
    return Object.keys(category).map(function (checkId) {
        var item = document.createElement('li');
        item.classList.add('tag');
        item.dataset.checkid = checkId;
        item.innerText = category[checkId].name;
        return item;
    });
}
function renderInputs() {
    var main = document.querySelector('main');
    if (!main)
        return;
    var section = document.createElement('section');
    section.id = 'selection-input';
    var heading = document.createElement('h2');
    heading.innerText = 'Select tags';
    heading.classList.add('sr-only');
    section.append(heading);
    var list = document.createElement('ul');
    list.id = 'accordion';
    Object.keys(data).forEach(function (id) {
        var category = data[id];
        var listItem = document.createElement('li');
        listItem.id = id;
        listItem.classList.add('accordian-item');
        var button = document.createElement('button');
        button.innerText = capitalize(id);
        button.ariaExpanded = 'false';
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
        listItem.appendChild(button);
        var listItemWrapper = document.createElement('div');
        listItemWrapper.id = "".concat(id, "-input-group");
        listItemWrapper.classList.add('input-group');
        listItemWrapper.classList.add('closed');
        listItemWrapper.ariaHidden = 'true';
        Object.keys(category).forEach(function (pin) {
            var label = document.createElement('label');
            label.setAttribute('for', pin);
            label.classList.add('checkbox-wrapper');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkbox.name = checkbox.value = pin;
            checkbox.addEventListener('change', function () {
                toggleNothingSelected();
                if (Object.keys(pals).includes(checkbox.id)) {
                    onlyAllowOnePal(checkbox);
                }
                updateLocalStorage();
                updateSelected();
            });
            label.appendChild(checkbox);
            var span = document.createElement('span');
            span.innerText = category[pin].name;
            label.appendChild(span);
            listItemWrapper.appendChild(label);
        });
        listItem.appendChild(listItemWrapper);
        list.appendChild(listItem);
    });
    main.appendChild(list);
}
function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1);
}
