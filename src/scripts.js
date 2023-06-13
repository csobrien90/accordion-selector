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
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/dog-top.png?v=1686615969',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/dog-bottom.png?v=1686615970',
        alt: ''
    },
    'kitty': {
        name: 'Kitty',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/cat-top.png?v=1686615970',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/cat-bottom.png?v=1686615969',
        alt: ''
    },
    'raccoon': {
        name: 'Raccoon',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/racoon-top.png?v=1686615969',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/racoon-bottom.png?v=1686615969',
        alt: ''
    },
    'opossum': {
        name: 'Opossum',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/opossum-top.png?v=1686615970',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/opossum-bottom.png?v=1686615969',
        alt: ''
    },
    'ghost': {
        name: 'Ghost',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/ghost-top.png?v=1686615969',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/ghost-bottom.png?v=1686615970',
        alt: ''
    },
    'mothman': {
        name: 'Mothman',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/mothman-top.png?v=1686615969',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/mothman-bottom.png?v=1686615969',
        alt: ''
    },
    'baba-yaga': {
        name: 'Baba Yaga',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/baba-yaga-top.png?v=1686615969',
        image2: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/baba-yaga-bottom.png?v=1686615969',
        alt: ''
    }
};
var pronouns = {
    'he-him-black': {
        name: 'He/Him (Black)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-him-black.png?v=1686616517',
        alt: ''
    },
    'he-him-blue': {
        name: 'He/Him (Blue)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-him-blue.png?v=1686616517',
        alt: ''
    },
    'he-him-white': {
        name: 'He/Him (White)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-him-white.png?v=1686616517r',
        alt: ''
    },
    'he-they-black': {
        name: 'He/They (Black)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-they-black.png?v=1686616517',
        alt: ''
    },
    'he-they-green': {
        name: 'He/They (Green)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-they-green.png?v=1686616517',
        alt: ''
    },
    'he-they-white': {
        name: 'He/They (White)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/he-they-white.png?v=1686616517',
        alt: ''
    },
    'she-her-black': {
        name: 'She/Her (Black)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-her-black.png?v=1686616517',
        alt: ''
    },
    'she-her-pink': {
        name: 'She/Her (Pink)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-her-pink.png?v=1686616517',
        alt: ''
    },
    'she-her-white': {
        name: 'She/Her (White)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-her-white.png?v=1686616517',
        alt: ''
    },
    'she-they-black': {
        name: 'She/They (Black)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-they-black.png?v=1686616517',
        alt: ''
    },
    'she-they-indigo': {
        name: 'She/They (Indigo)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-they-indigo.png?v=1686616517',
        alt: ''
    },
    'she-they-white': {
        name: 'She/They (White)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/she-they-white.png?v=1686616517',
        alt: ''
    },
    'they-them-black': {
        name: 'They/Them (Black)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/they-them-black.png?v=1686616517',
        alt: ''
    },
    'they-them-purple': {
        name: 'They/Them (Purple)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/they-them-purple.png?v=1686616517',
        alt: ''
    },
    'they-them-white': {
        name: 'They/Them (White)',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/they-them-white.png?v=1686616517',
        alt: ''
    }
};
var flags = {
    'rainbow': {
        name: 'Rainbow',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/rainbow.png?v=1686615804',
        alt: ''
    },
    'inclusive': {
        name: 'Inclusive',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/inc.png?v=1686615803',
        alt: ''
    },
    'trans': {
        name: 'Trans',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/trans.png?v=1686615803',
        alt: ''
    },
    'bisexual': {
        name: 'Bisexual',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/bi.png?v=1686615803',
        alt: ''
    },
    'pansexual': {
        name: 'Pansexual',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/pan.png?v=1686615803',
        alt: ''
    },
    'nonbinary': {
        name: 'Nonbinary',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/nonbin.png?v=1686615803',
        alt: ''
    },
    'asexual': {
        name: 'Asexual',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/ase.png?v=1686615803',
        alt: ''
    },
    'lesbian': {
        name: 'Lesbian',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/les.png?v=1686615803',
        alt: ''
    }
};
var personalities = {
    'moon-phases': {
        name: 'Moon Phases',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/moon.png?v=1686616702',
        alt: ''
    },
    'book-shelf': {
        name: 'Book Shelf',
        image: 'https://cdn.shopify.com/s/files/1/0596/8088/2882/files/books.png?v=1686616702',
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
    if (checked.length === 0) {
        checked = ['kitty', 'inclusive'];
    }
    localStorage.setItem('checked', JSON.stringify(checked));
}
function setCheckboxesFromLocalStorage() {
    var checkboxes = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'));
    var checked = JSON.parse(localStorage.getItem('checked') || JSON.stringify(['kitty', 'inclusive']));
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
    var main = document.querySelector('#wrapper');
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
    var nothingSelected = document.createElement('p');
    nothingSelected.id = 'nothing-selected';
    nothingSelected.innerText = 'Pick some pins!';
    section.append(nothingSelected);
    section.append(list);
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
        var newSrc = isPals && isBottoms ? category[checkId].image2 : category[checkId].image;
        img.src = newSrc;
        img.alt = category[checkId].alt;
        item.appendChild(img);
        return item;
    });
}
function renderInputs() {
    var main = document.querySelector('#wrapper');
    if (!main)
        return;
    var section = document.createElement('section');
    section.id = 'selection-input';
    var heading = document.createElement('h2');
    heading.innerText = 'Select your plaques';
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
        var buttonText = id === 'flags' ? 'Pride Flags' : capitalize(id);
        button.innerText = buttonText;
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
