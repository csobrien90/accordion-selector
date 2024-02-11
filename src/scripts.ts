import { Category, Data } from './types'
import { pinData } from './data'

/*
__________________
On Page Load
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

const {pals, pronouns, flags, personalities}: Data = pinData

renderSelected()
renderInputs()
renderShareButton()
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

	Object.keys(pinData).forEach((id: keyof Data) => {
		const category: Category = pinData[id]
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

function renderShareButton():void {
	const main: HTMLDivElement | null = document.querySelector('#wrapper')
	if (!main) return

	const shareButton: HTMLButtonElement = document.createElement('button')
	shareButton.id = 'share'
	shareButton.innerText = 'Share your set!'

	shareButton.addEventListener('click', async (e: Event): Promise<void> => {
		e.preventDefault()

		const setDiv: HTMLDivElement | null = document.querySelector('#tag-wrapper')
		if (!setDiv) return

		// @ts-ignore
		const canvas: HTMLCanvasElement = await html2canvas(setDiv, {useCORS: true})
		const dataUrl: string = canvas.toDataURL()

		const blob: Blob = await ((await fetch(dataUrl)).blob())
		
		const files: File[] = [new File([blob], 'My-Pronoun-Pin-Set.png', {
			type: blob.type,
			lastModified: new Date().getTime()
		})]
		
		const toShare: ShareData = {files}

		if (navigator.canShare(toShare))  {
			navigator.share(toShare).then(() => {
				console.log('Share successful!')
			}).catch(() => {
				console.error('Share failed - something went wrong during share.')
			})
		} else {
			console.error('Share failed - content is not shareable.')
		}
	})

	main.appendChild(shareButton)
}

function capitalize(word: string): string {
	return word[0].toUpperCase() + word.substring(1)
}