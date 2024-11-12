import { Category, Data, Item } from './types'
import { selectorData } from './data'

/*
__________________
On Page Load
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

const {pals, pronouns, flags, personalities, accessibility}: Data = selectorData

renderItemTypeToggle()
renderSelected()
renderAddToCartButton()
renderInputs()
// renderShareButton()
setCheckboxesFromLocalStorage()
toggleNothingSelected()
updatePrice()


/*
__________________
Functions
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

function toggleNothingSelected() {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]:checked'))
	if (checkboxes.length > 0) {
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

function renderSelected(preselectedIds?: string[]): void {
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
	const accessibilityItems: HTMLLIElement[] = renderSelectedListItems(accessibility)

	const combined: HTMLLIElement[] = [...palItems, ...pronounItems, ...flagItems, ...plaqueItems, ...accessibilityItems, ...reversedPalItems]
	if (combined.length > 0) {
		combined.forEach(item => {
			if (preselectedIds?.length > 0 && preselectedIds?.includes(item.dataset.checkid)) item.classList.add('selected')
			list.appendChild(item)
		})
	}

	const nothingSelected: HTMLParagraphElement = document.createElement('p')
	nothingSelected.id = 'nothing-selected'
	nothingSelected.innerText = 'Pick some pins!'
	
	section.append(list)
	section.append(nothingSelected)
	main.append(section)
}

function renderSelectedListItems(category: Category, isPals: boolean = false, isBottoms: boolean = false): HTMLLIElement[] {
	const type = getCurrentItemType()
	return Object.keys(category).map(checkId => {
		// Confirm the item is available in the current type
		if (!category[checkId].prices[type]) return

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
	}).filter(item => item !== undefined) as HTMLLIElement[]
}

function renderInputs(preselectedIds?: string[]): void {
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

	Object.keys(selectorData).forEach((id: keyof Data) => {
		const category: Category = selectorData[id]

		// Confirm the item is available in the current type
		const type = getCurrentItemType()
		const hasItems = Object.values(category).some(item => item.prices[type])
		if (!hasItems) return

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

		const listWrapper: HTMLDivElement = document.createElement('div')
		// <div id="pals-input-group" class="input-group" aria-hidden="true">
		listWrapper.id = `${id}-input-group`
		listWrapper.classList.add('input-group')
		listWrapper.ariaHidden = 'true'

		const listItemWrapper: HTMLDivElement = document.createElement('div')

		Object.keys(category).forEach((item) => {
			if (!category[item].prices[type]) return
			const label: HTMLLabelElement = document.createElement('label')
			label.setAttribute('for', item)
			label.classList.add('checkbox-wrapper')
			label.ariaLabel = item

			const checkbox: HTMLInputElement = document.createElement('input')
			checkbox.type = 'checkbox'
			checkbox.id = checkbox.name = checkbox.value = item
			checkbox.checked = preselectedIds?.includes(item) ? true : false

			checkbox.addEventListener('change', () => {
				toggleNothingSelected()
		
				// Only allow one pal to be checked
				if (Object.keys(pals).includes(checkbox.id)) {
					onlyAllowOnePal(checkbox)
				}
				
				updateLocalStorage()
				updateSelected()
				updatePrice()
			})

			label.appendChild(checkbox)

			const span: HTMLSpanElement = document.createElement('span')
			span.innerText = category[item].name
			label.appendChild(span)

			listItemWrapper.appendChild(label)
		})

		listWrapper.appendChild(listItemWrapper)
		listItem.appendChild(listWrapper)
		list.appendChild(listItem)
	})

	main.appendChild(list)
}

function renderAddToCartButton():void {
	const selectedEl: HTMLDivElement | null = document.querySelector('#selected')
	if (!selectedEl) return

	const addToCartWrapper: HTMLDivElement = document.createElement('div')
	addToCartWrapper.id = 'add-to-cart-wrapper'

	const price: HTMLParagraphElement = document.createElement('p')
	price.id = 'price'
	price.innerText = 'Preview total: $0.00'
	addToCartWrapper.appendChild(price)

	const addToCartButton: HTMLButtonElement = document.createElement('button')
	addToCartButton.id = 'add-to-cart'
	addToCartButton.innerText = 'Add To Cart'
	addToCartWrapper.appendChild(addToCartButton)

	addToCartButton.addEventListener('click', async (e: Event): Promise<void> => {
		e.preventDefault()

		// Get all selected items (unique)
		const selected: HTMLElement[] = Array.from(document.querySelectorAll('.selected'))
		if (selected.length === 0) return
		let selectedItems: string[] = selected.map(item => item.dataset.checkid || '')
		selectedItems = Array.from(new Set(selectedItems))

		// Prepare selected items for query string
		const flattenedSelectorData: Category = {...pals, ...pronouns, ...flags, ...personalities, ...accessibility}
		const selectedItemsData: Item[] = selectedItems.map(item => flattenedSelectorData[item])

		// Add to cart
		const type = getCurrentItemType()
		const pathParam = selectedItemsData.reduce((acc, item) => {
			return acc + `${item.ids[type]}:1,`
		}, '').slice(0, -1)
		// add ?storefront=true to end to go to cart page instead of checkout
		const url = `https://www.kittywithacupcake.com/cart/${pathParam}`
		window.open(url, '_blank')
	})

	selectedEl.appendChild(addToCartWrapper)
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

function updatePrice(): void {
	// Get all selected items (unique)
	const selected: HTMLElement[] = Array.from(document.querySelectorAll('.selected'))
	const uniqueSelected: string[] = Array.from(new Set(selected.map(item => item.dataset.checkid || '')))
	
	// Prepare selected items price/discount calculation
	const selectedData: Data = {
		pals: {},
		pronouns: {},
		flags: {},
		personalities: {},
		accessibility: {},
	} 

	Object.keys(selectedData).forEach((category: keyof Data) => {
		uniqueSelected.forEach((slug: string) => {
			if (selectorData[category][slug]) {
				selectedData[category][slug] = selectorData[category][slug]
			}
		})
	})

	// Calculate price and update on page
	const price: number = calculatePrice(selectedData)
	const priceElement: HTMLElement | null = document.querySelector('#price')
	if (priceElement) {
		priceElement.innerText = `Preview total: $${price.toFixed(2)}`
	}
}

function calculatePrice(selectedData: Data): number {
	const type = getCurrentItemType()

	// Calculate price
	let price = 0
	Object.keys(selectedData).forEach((category: keyof Data) => {
		Object.keys(selectedData[category]).forEach((slug: string) => {
			price += selectedData[category][slug].prices[type]
		})
	})

	if (type === 'sticker' || type === 'bGrade') return price

	// Calculate discount
	const categoryCounts = {
		pals: Object.keys(selectedData.pals).length,
		pronouns: Object.keys(selectedData.pronouns).length,
		flags: Object.keys(selectedData.flags).length,
		personalities: Object.keys(selectedData.personalities).length,
		accessibility: Object.keys(selectedData.accessibility).length,
	}

	const palsCount = categoryCounts.pals
	const plaquesCount = categoryCounts.pronouns + categoryCounts.flags + categoryCounts.personalities + categoryCounts.accessibility

	// Rules:
	// 0. If there are no pals, no discounts apply
	if (palsCount === 0)  return price
	// 1. If there is at lease one pal, all plaques (personality, pride, pronoun) are $1 off
	if (palsCount >= 1) price -= plaquesCount
	// 2. If there are 2 or more pals, each pal after the first is $2 off
	if (palsCount >= 2) price -= (palsCount - 1) * 2

	// Return total
	return price
}

function renderItemTypeToggle(): void {
	const header: HTMLElement | null = document.querySelector('header:has(h1)')
	if (!header) return

	const toggleWrapper: HTMLDivElement = document.createElement('div')
	toggleWrapper.id = 'toggle-wrapper'

	const itemTypes = ['pins', 'stickers', 'b-grade pins']
	const typeFromLocalStorage = localStorage.getItem('type')

	itemTypes.forEach((type: string) => {
		const label: HTMLLabelElement = document.createElement('label')
		label.classList.add('toggle-label')
		label.innerText = type
			.split('-').map(word => capitalize(word)).join('-')
			.split(' ').map(word => capitalize(word)).join(' ')

		const input: HTMLInputElement = document.createElement('input')
		input.type = 'radio'
		input.name = 'item-type'
		input.value = type
		input.id = type
		input.addEventListener('change', (e: Event) => {
			// Get selected items
			const selected: HTMLElement[] = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
			const selectedIds: string[] = selected.map(item => item.id)

			updateTypeLocalStorage()
			scrapOldUI()
			renderSelected(selectedIds)
			renderAddToCartButton()
			renderInputs(selectedIds)
			updatePrice()
			toggleNothingSelected()
		})

		// Default to pins if no local storage
		if (typeFromLocalStorage === type) input.checked = true
		if (!typeFromLocalStorage && type === 'pins') input.checked = true

		label.appendChild(input)
		toggleWrapper.appendChild(label)
	})

	header.appendChild(toggleWrapper)
}

function getCurrentItemType(): keyof Item['prices'] {
	// Get type
	const typeInput = document.querySelector('input[name="item-type"]:checked')
	const rawType: string = typeInput ? (typeInput as HTMLInputElement).value : 'pins'
	let type: keyof Item['prices'] = 'pin'
	if (rawType === 'stickers') type = 'sticker'
	if (rawType === 'b-grade pins') type = 'bGrade'

	return type
}

function scrapOldUI(): void {
	const tagWrapper: HTMLElement | null = document.querySelector('#accordion')
	if (tagWrapper) tagWrapper.remove()
	
	const selectionInput: HTMLElement | null = document.querySelector('#selected')
	if (selectionInput) selectionInput.remove()
}

function updateTypeLocalStorage(): void {
	const typeInput = document.querySelector('input[name="item-type"]:checked')
	const type: string = typeInput ? (typeInput as HTMLInputElement).value : 'pins'
	localStorage.setItem('type', type)
}

function setTypeFromLocalStorage(): void {
	const type: string = localStorage.getItem('type') || 'pins'
	const typeInput = document.querySelector(`#${type}`)
	if (typeInput) (typeInput as HTMLInputElement).checked = true
}