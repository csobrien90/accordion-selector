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
	image2?: string,
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
const pronouns: Category = {
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
const flags: Category = {
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
const personalities: Category = {
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
	let checked: string[] = []
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			checked.push(checkbox.id)
		}
	})
	if (checked.length === 0) {
		checked = ['kitty', 'inclusive']
	}
	localStorage.setItem('checked', JSON.stringify(checked))
}

function setCheckboxesFromLocalStorage() {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
	const checked: string[] = JSON.parse(localStorage.getItem('checked') || JSON.stringify(['kitty', 'inclusive']))
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
	const main: HTMLDivElement | null = document.querySelector('#wrapper')
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

	const nothingSelected: HTMLParagraphElement = document.createElement('p')
	nothingSelected.id = 'nothing-selected'
	nothingSelected.innerText = 'Pick some pins!'

	section.append(nothingSelected)
	section.append(list)
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
		const newSrc = isPals && isBottoms ? category[checkId].image2 : category[checkId].image
		img.src = newSrc
		img.alt = category[checkId].alt
		item.appendChild(img)

		return item
	})
}

function renderInputs(): void {
	const main: HTMLDivElement | null = document.querySelector('#wrapper')
	if (!main) return
	
	// Build "selection-input" section
	const section: HTMLElement = document.createElement('section')
	section.id = 'selection-input'

	const heading: HTMLHeadingElement = document.createElement('h2')
	heading.innerText = 'Select your plaques'
	heading.classList.add('sr-only')
	section.append(heading)

	const list: HTMLUListElement = document.createElement('ul')
	list.id = 'accordion'

	Object.keys(data).forEach((id: keyof Data) => {
		const category: Category = data[id]
		const listItem: HTMLLIElement = document.createElement('li')
		listItem.id = id
		listItem.classList.add('accordion-item')

		const button: HTMLButtonElement = document.createElement('button')
		const buttonText: string = id === 'flags' ? 'Pride Flags' : capitalize(id)
		button.innerText = buttonText
		button.ariaExpanded = 'false'
		// button.ariaControls = `${id}-input-group`

		button.addEventListener('click', () => {
			const isOpen: boolean = button.nextElementSibling.classList.contains('open')

			// Close all buttons and open this one
			const inputGroups: HTMLDivElement[] = Array.from(document.querySelectorAll('.input-group'))
			inputGroups.forEach(group => group.classList.remove('open'))
			
			const allButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accordion-item button'))
			allButtons.forEach(button => {
				button.ariaExpanded = 'false'
				button.nextElementSibling.setAttribute('aria-hidden', 'true')
			})

			if (!isOpen) {
				button.nextElementSibling.classList.add('open')

				// Open list and adjust button attributes
				button.ariaExpanded = 'true'
				button.nextElementSibling.setAttribute('aria-hidden', 'false')
			}
			
		})

		listItem.appendChild(button)

		const listItemWrapper: HTMLDivElement = document.createElement('div')
		// <div id="pals-input-group" class="input-group" aria-hidden="true">
		listItemWrapper.id = `${id}-input-group`
		listItemWrapper.classList.add('input-group')
		listItemWrapper.ariaHidden = 'true'

		Object.keys(category).forEach((pin) => {
			const label: HTMLLabelElement = document.createElement('label')
			label.setAttribute('for', pin)
			label.classList.add('checkbox-wrapper')
			label.ariaLabel = pin

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