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
        image: 'images/pals/dog-top.png',
        alt: ''
    },
    'kitty': {
        name: 'Kitty',
        image: 'images/pals/cat-top.png',
        alt: ''
    },
    'raccoon': {
        name: 'Raccoon',
        image: 'images/pals/racoon-top.png',
        alt: ''
    },
    'opossum': {
        name: 'Opossum',
        image: 'images/pals/opossum-top.png',
        alt: ''
    },
    'ghost': {
        name: 'Ghost',
        image: 'images/pals/ghost-top.png',
        alt: ''
    },
    'mothman': {
        name: 'Mothman',
        image: 'images/pals/mothman-top.png',
        alt: ''
    },
    'baba-yaga': {
        name: 'Baba Yaga',
        image: 'images/pals/baba-yaga-top.png',
        alt: ''
    }
};
var pronouns = {
    'he-him-black': {
        name: 'He/Him (Black)',
        image: 'images/pronouns/he-him-black.png',
        alt: ''
    },
    'he-him-blue': {
        name: 'He/Him (Blue)',
        image: 'images/pronouns/he-him-blue.png',
        alt: ''
    },
    'he-him-white': {
        name: 'He/Him (White)',
        image: 'images/pronouns/he-him-white.png',
        alt: ''
    },
    'he-they-black': {
        name: 'He/They (Black)',
        image: 'images/pronouns/he-they-black.png',
        alt: ''
    },
    'he-they-green': {
        name: 'He/They (Green)',
        image: 'images/pronouns/he-they-green.png',
        alt: ''
    },
    'he-they-white': {
        name: 'He/They (White)',
        image: 'images/pronouns/he-they-white.png',
        alt: ''
    },
    'she-her-black': {
        name: 'She/Her (Black)',
        image: 'images/pronouns/she-her-black.png',
        alt: ''
    },
    'she-her-pink': {
        name: 'She/Her (Pink)',
        image: 'images/pronouns/she-her-pink.png',
        alt: ''
    },
    'she-her-white': {
        name: 'She/Her (White)',
        image: 'images/pronouns/she-her-white.png',
        alt: ''
    },
    'she-they-black': {
        name: 'She/They (Black)',
        image: 'images/pronouns/she-they-black.png',
        alt: ''
    },
    'she-they-indigo': {
        name: 'She/They (Indigo)',
        image: 'images/pronouns/she-they-indigo.png',
        alt: ''
    },
    'she-they-white': {
        name: 'She/They (White)',
        image: 'images/pronouns/she-they-white.png',
        alt: ''
    },
    'they-them-black': {
        name: 'They/Them (Black)',
        image: 'images/pronouns/they-them-black.png',
        alt: ''
    },
    'they-them-purple': {
        name: 'They/Them (Purple)',
        image: 'images/pronouns/they-them-purple.png',
        alt: ''
    },
    'they-them-white': {
        name: 'They/Them (White)',
        image: 'images/pronouns/they-them-white.png',
        alt: ''
    }
};
var flags = {
    'rainbow': {
        name: 'Rainbow',
        image: 'images/flags/rainbow.png',
        alt: ''
    },
    'inclusive': {
        name: 'Inclusive',
        image: 'images/flags/inc.png',
        alt: ''
    },
    'trans': {
        name: 'Trans',
        image: 'images/flags/trans.png',
        alt: ''
    },
    'bisexual': {
        name: 'Bisexual',
        image: 'images/flags/bi.png',
        alt: ''
    },
    'pansexual': {
        name: 'Pansexual',
        image: 'images/flags/pan.png',
        alt: ''
    },
    'nonbinary': {
        name: 'Nonbinary',
        image: 'images/flags/nonbin.png',
        alt: ''
    },
    'asexual': {
        name: 'Asexual',
        image: 'images/flags/ase.png',
        alt: ''
    },
    'lesbian': {
        name: 'Lesbian',
        image: 'images/flags/les.png',
        alt: ''
    }
};
var personalities = {
    'moon-phases': {
        name: 'Moon Phases',
        image: 'images/personalities/moon.png',
        alt: ''
    },
    'book-shelf': {
        name: 'Book Shelf',
        image: 'images/personalities/books.png',
        alt: ''
    }
};
var data = { pals: pals, pronouns: pronouns, flags: flags, personalities: personalities };
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
        if (checkedIds.includes(tag.dataset.checkid)) {
            tag.classList.add('selected');
        }
        else {
            tag.classList.remove('selected');
        }
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
    var palItems = renderSelectedListItems(pals, true);
    var reversedPalItems = renderSelectedListItems(pals, true, true).reverse();
    var pronounItems = renderSelectedListItems(pronouns);
    var flagItems = renderSelectedListItems(flags);
    var plaqueItems = renderSelectedListItems(personalities);
    var combined = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], palItems, true), pronounItems, true), flagItems, true), plaqueItems, true), reversedPalItems, true);
    combined.forEach(function (item) { return list.appendChild(item); });
    section.append(list);
    var nothingSelected = document.createElement('p');
    nothingSelected.id = 'nothing-selected';
    nothingSelected.innerText = 'Select some tags!';
    section.append(nothingSelected);
    main.append(section);
}
function renderSelectedListItems(category, isPals, isBottoms) {
    if (isPals === void 0) { isPals = false; }
    if (isBottoms === void 0) { isBottoms = false; }
    return Object.keys(category).map(function (checkId) {
        var item = document.createElement('li');
        item.classList.add('tag');
        isPals ? item.classList.add('palsItem') : item.classList.add('plaque');
        item.dataset.checkid = checkId;
        var img = document.createElement('img');
        var newSrc = isPals && isBottoms ? category[checkId].image.replace('top', 'bottom') : category[checkId].image;
        img.src = newSrc;
        img.alt = category[checkId].alt;
        item.appendChild(img);
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
        listItem.classList.add('accordion-item');
        var button = document.createElement('button');
        button.innerText = capitalize(id);
        button.ariaExpanded = 'false';
        button.addEventListener('click', function () {
            var isOpen = button.nextElementSibling.classList.contains('open');
            var inputGroups = Array.from(document.querySelectorAll('.input-group'));
            inputGroups.forEach(function (group) { return group.classList.remove('open'); });
            var allButtons = Array.from(document.querySelectorAll('.accordion-item button'));
            allButtons.forEach(function (button) {
                button.ariaExpanded = 'false';
                button.nextElementSibling.setAttribute('aria-hidden', 'true');
            });
            if (!isOpen) {
                button.nextElementSibling.classList.add('open');
                button.ariaExpanded = 'true';
                button.nextElementSibling.setAttribute('aria-hidden', 'false');
            }
        });
        listItem.appendChild(button);
        var listItemWrapper = document.createElement('div');
        listItemWrapper.id = "".concat(id, "-input-group");
        listItemWrapper.classList.add('input-group');
        listItemWrapper.ariaHidden = 'true';
        Object.keys(category).forEach(function (pin) {
            var label = document.createElement('label');
            label.setAttribute('for', pin);
            label.classList.add('checkbox-wrapper');
            label.ariaLabel = pin;
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
