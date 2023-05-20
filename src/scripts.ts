/*
__________________
Types, Interfaces, and Enums
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

interface Data {
	pals: Category,
	pronouns: Category,
	flags: Category,
	plaques: Category
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
}

const pronouns: Category = {
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
}

const flags: Category = {
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
}

const plaques: Category = {
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
}

const data: Data = {pals, pronouns, flags, plaques}

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
		checkedIds.includes(tag.dataset.checkid) ? tag.classList.add('selected') : tag.classList.remove('selected')
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

	const palItems: HTMLLIElement[] = renderSelectedListItems(pals)
	const reversedPalItems: HTMLLIElement[] = renderSelectedListItems(pals).reverse()
	const pronounItems: HTMLLIElement[] = renderSelectedListItems(pronouns)
	const flagItems: HTMLLIElement[] = renderSelectedListItems(flags)
	const plaqueItems: HTMLLIElement[] = renderSelectedListItems(plaques)

	const combined: HTMLLIElement[] = [...palItems, ...pronounItems, ...flagItems, ...plaqueItems, ...reversedPalItems]
	combined.forEach(item => list.appendChild(item))

	section.append(list)

	const nothingSelected: HTMLParagraphElement = document.createElement('p')
	nothingSelected.id = 'nothing-selected'
	nothingSelected.innerText = 'Select some tags!'
	section.append(nothingSelected)

	main.append(section)
}

function renderSelectedListItems(category: Category): HTMLLIElement[] {
	return Object.keys(category).map(checkId => {
		const item: HTMLLIElement = document.createElement('li')
		item.classList.add('tag')
		item.dataset.checkid = checkId
		item.innerText = category[checkId].name

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