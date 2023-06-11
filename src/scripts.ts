/*
__________________
Types, Interfaces, and Enums
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

interface Data {
	pals: Category,
	pronouns: Category,
	flags: Category,
	personalities: Category
}

interface Category {
	[slug: string]: Pin
}

interface Pin {
	name: string,
	image: string,
	alt: string
}


/*
__________________
On Page Load
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

const pals: Category = {
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
}

const pronouns: Category = {
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
}

const flags: Category = {
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
}

const personalities: Category = {
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
}

const data: Data = {pals, pronouns, flags, personalities}

renderSelected()
renderInputs()
setCheckboxesFromLocalStorage()
toggleNothingSelected()


/*
__________________
Functions
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

function toggleNothingSelected() {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
	const hasChecked: boolean = checkboxes.some(checkbox => checkbox.checked)
	if (hasChecked) {
		const nothingSelected: HTMLElement = document.querySelector('#nothing-selected') as HTMLElement
		nothingSelected.style.display = 'none'
	} else {
		const nothingSelected: HTMLElement = document.querySelector('#nothing-selected') as HTMLElement
		nothingSelected.style.display = 'block'
	}
}

function updateLocalStorage() {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
	const checked: string[] = []
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			checked.push(checkbox.id)
		}
	})
	localStorage.setItem('checked', JSON.stringify(checked))
}

function setCheckboxesFromLocalStorage() {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
	const checked: string[] = JSON.parse(localStorage.getItem('checked') || '[]')
	checkboxes.forEach(checkbox => checkbox.checked = checked.includes(checkbox.id) ? true : false)
	updateSelected()
}

function updateSelected() {
	const checkedCheckboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]:checked'))
	const checkedIds: string[] = checkedCheckboxes.map(checkbox => checkbox.id)
	const tags: HTMLElement[] = Array.from(document.querySelectorAll('.tag'))
	tags.forEach(tag => {
		if(tag.dataset.checkid === undefined) return
		if (checkedIds.includes(tag.dataset.checkid)) {
			tag.classList.add('selected')
		} else {
			tag.classList.remove('selected')
		}

	})
}

function onlyAllowOnePal(checkbox: HTMLInputElement) {
	const pals: HTMLInputElement[] = Array.from(document.querySelectorAll('#pals input[type="checkbox"]'))
	pals.forEach(pal => {
		if (pal.id !== checkbox.id) {
			pal.checked = false
		}
	})
}

function renderSelected(): void {
	const main: HTMLElement | null = document.querySelector('main')
	if (!main) return
	
	// Build "selected" section
	const section: HTMLElement = document.createElement('section')
	section.id = 'selected'
	
	const heading: HTMLHeadingElement = document.createElement('h2')
	heading.innerText = 'Your selection'
	heading.classList.add('sr-only')
	section.append(heading)

	const list: HTMLUListElement = document.createElement('ul')
	list.id = 'tag-wrapper'

	const palItems: HTMLLIElement[] = renderSelectedListItems(pals, true)
	const reversedPalItems: HTMLLIElement[] = renderSelectedListItems(pals, true, true).reverse()
	const pronounItems: HTMLLIElement[] = renderSelectedListItems(pronouns)
	const flagItems: HTMLLIElement[] = renderSelectedListItems(flags)
	const plaqueItems: HTMLLIElement[] = renderSelectedListItems(personalities)

	const combined: HTMLLIElement[] = [...palItems, ...pronounItems, ...flagItems, ...plaqueItems, ...reversedPalItems]
	combined.forEach(item => list.appendChild(item))

	section.append(list)

	const nothingSelected: HTMLParagraphElement = document.createElement('p')
	nothingSelected.id = 'nothing-selected'
	nothingSelected.innerText = 'Select some tags!'
	section.append(nothingSelected)

	main.append(section)
}

function renderSelectedListItems(category: Category, isPals: boolean = false, isBottoms: boolean = false): HTMLLIElement[] {
	return Object.keys(category).map(checkId => {
		const item: HTMLLIElement = document.createElement('li')
		item.classList.add('tag')
		isPals ? item.classList.add('palsItem') : item.classList.add('plaque')
		
		item.dataset.checkid = checkId

		// Content of item
		const img: HTMLImageElement = document.createElement('img')
		const newSrc = isPals && isBottoms ? category[checkId].image.replace('top', 'bottom') : category[checkId].image
		img.src = newSrc
		img.alt = category[checkId].alt
		item.appendChild(img)

		return item
	})
}

function renderInputs(): void {
	const main: HTMLElement | null = document.querySelector('main')
	if (!main) return
	
	// Build "selection-input" section
	const section: HTMLElement = document.createElement('section')
	section.id = 'selection-input'

	const heading: HTMLHeadingElement = document.createElement('h2')
	heading.innerText = 'Select tags'
	heading.classList.add('sr-only')
	section.append(heading)

	const list: HTMLUListElement = document.createElement('ul')
	list.id = 'accordion'

	Object.keys(data).forEach((id: keyof Data) => {
		const category: Category = data[id]
		const listItem: HTMLLIElement = document.createElement('li')
		listItem.id = id
		listItem.classList.add('accordian-item')

		const button: HTMLButtonElement = document.createElement('button')
		button.innerText = capitalize(id)
		button.ariaExpanded = 'false'
		// button.ariaControls = `${id}-input-group`

		button.addEventListener('click', () => {
			if (button.nextElementSibling) {
				button.nextElementSibling.classList.toggle('open')
				if (button.nextElementSibling.classList.contains('open')) {
					// Set aria attributes to open
					button.ariaExpanded = 'true'
					button.nextElementSibling.setAttribute('aria-hidden', 'false')
				} else {
					// Set aria attributes to closed
					button.ariaExpanded = 'false'
					button.nextElementSibling.setAttribute('aria-hidden', 'true')
				}
			}
		})

		listItem.appendChild(button)

		const listItemWrapper: HTMLDivElement = document.createElement('div')
			// 			<div id="pals-input-group" class="input-group closed" aria-hidden="true">
		listItemWrapper.id = `${id}-input-group`
		listItemWrapper.classList.add('input-group')
		listItemWrapper.classList.add('closed')
		listItemWrapper.ariaHidden = 'true'

		Object.keys(category).forEach((pin) => {
			const label: HTMLLabelElement = document.createElement('label')
			label.setAttribute('for', pin)
			label.classList.add('checkbox-wrapper')

			const checkbox: HTMLInputElement = document.createElement('input')
			checkbox.type = 'checkbox'
			checkbox.id = checkbox.name = checkbox.value = pin

			checkbox.addEventListener('change', () => {
				toggleNothingSelected()
		
				// Only allow one pal to be checked
				if (Object.keys(pals).includes(checkbox.id)) {
					onlyAllowOnePal(checkbox)
				}
				
				updateLocalStorage()
				updateSelected()
			})

			label.appendChild(checkbox)

			const span: HTMLSpanElement = document.createElement('span')
			span.innerText = category[pin].name
			label.appendChild(span)

			listItemWrapper.appendChild(label)
		})

		listItem.appendChild(listItemWrapper)
		list.appendChild(listItem)
	})

	main.appendChild(list)
}

function capitalize(word: string): string {
	return word[0].toUpperCase() + word.substring(1)
}