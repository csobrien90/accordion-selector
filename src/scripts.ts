import { Category, Data, Item } from './types'
import { selectorData } from './data'

/*
__________________
Settings
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

const B_GRADE_SALE_ACTIVE = false

/*
__________________
On Page Load
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

let filteredData: any = {...selectorData}
if (!B_GRADE_SALE_ACTIVE) {
	for (const category in filteredData) {
		for (const item in filteredData[category]) {
			if (filteredData[category][item].ids.bGrade) {
				delete filteredData[category][item].ids.bGrade
			}
			if (filteredData[category][item].prices.bGrade) {
				delete filteredData[category][item].prices.bGrade
			}
		}
	}
}
const {pals, pronouns, flags, personalities, accessibility}: Data = filteredData

const queryParams = new URLSearchParams(window.location.search)
const preselectedSet = queryParams.get('set')
let preselectedIds: string[] = preselectedSet ? preselectedSet.split(',') : []

let openCategory: keyof Data | null = null

renderInputs(preselectedIds, true)
renderSelected(preselectedIds)
renderButtons()
setCheckboxesFromLocalStorage(preselectedIds)
toggleNothingSelected()
updatePrice()

const eventSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
// sendEventLog("pageLoad", {referredFrom: document.referrer})

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

function setCheckboxesFromLocalStorage(preselectedIds: string[] = []) {
	const checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
	// If there are preselectedIds from the URL, use those instead of localStorage
	let checked: string[] = []
	if (preselectedIds.length > 0) {
		checked = preselectedIds
	} else {
		checked = JSON.parse(localStorage.getItem('checked') || JSON.stringify(['kitty', 'inclusive']))
	}

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

	const status = {
		someWereRemoved: false,
		preselectedIds
	}

	const palItems: HTMLLIElement[] = renderSelectedListItems(status, pals, true)
	const reversedPalItems: HTMLLIElement[] = renderSelectedListItems(status, pals, true, true).reverse()
	const pronounItems: HTMLLIElement[] = renderSelectedListItems(status, pronouns)
	const flagItems: HTMLLIElement[] = renderSelectedListItems(status, flags)
	const plaqueItems: HTMLLIElement[] = renderSelectedListItems(status, personalities)
	const accessibilityItems: HTMLLIElement[] = renderSelectedListItems(status, accessibility)

	if (status.someWereRemoved) {
		showNotification('Some items were removed from your selection because they are not available in the selected type.', 7000, 'error')
	}

	const combined: HTMLLIElement[] = [...palItems, ...pronounItems, ...flagItems, ...plaqueItems, ...accessibilityItems, ...reversedPalItems]
	if (combined.length > 0) {
		combined.forEach(item => {
			if (preselectedIds?.length > 0 && preselectedIds?.includes(item.dataset.checkid)) {
				item.classList.add('selected')
			}
			list.appendChild(item)
		})
	}

	const nothingSelected: HTMLParagraphElement = document.createElement('p')
	nothingSelected.id = 'nothing-selected'
	nothingSelected.innerText = 'Select some pins to preview!'
	
	section.append(list)
	section.append(nothingSelected)
	main.firstChild ? main.insertBefore(section, main.firstChild) : main.appendChild(section)
}

function renderSelectedListItems(status: { someWereRemoved: boolean, preselectedIds?: string[] }, category: Category, isPals: boolean = false, isBottoms: boolean = false): HTMLLIElement[] {
	const type = getCurrentItemType()
	const items = Object.keys(category).map(checkId => {
		// Confirm the item is available in the current type
		if (!category[checkId].prices[type]) {
			const hasPinId = category[checkId].ids["pin"]
			const isPreselected = status.preselectedIds?.includes(checkId)
			return hasPinId && isPreselected ? null : undefined
		}

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

	if (items.some(i => i === null)) {
		status.someWereRemoved = true
	}

	return items.filter(item => !!item) as HTMLLIElement[]
	
}

function renderInputs(preselectedIds?: string[], firstLoad: boolean = false): void {
	const main: HTMLDivElement | null = document.querySelector('#wrapper')
	if (!main) return
	
	// Build "selection-input" section
	const section: HTMLElement = document.createElement('section')
	section.id = 'selection-input'

	const heading: HTMLHeadingElement = document.createElement('h2')
	heading.innerText = 'Select your items'
	heading.classList.add('sr-only')
	section.append(heading)

	const list: HTMLUListElement = document.createElement('ul')
	list.id = 'accordion'

	renderItemTypeToggle(list, firstLoad)
	section.appendChild(list)
	main.appendChild(section)

	Object.keys(selectorData).forEach((id: keyof Data) => {
		const category: Category = selectorData[id]
		const wasOpen = openCategory === id

		const listItem: HTMLLIElement = document.createElement('li')
		listItem.id = id
		listItem.classList.add('accordion-item')

		const button: HTMLButtonElement = document.createElement('button')
		const buttonText: string = id === 'flags' ? 'Pride Flags' : capitalize(id)
		button.innerText = buttonText
		button.ariaExpanded = wasOpen ? 'true' : 'false'
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
		if (wasOpen) listWrapper.classList.add('open')
		listWrapper.ariaHidden = wasOpen ? 'false' : 'true'

		const listItemWrapper: HTMLDivElement = document.createElement('div')
		const type = getCurrentItemType()

		Object.keys(category).forEach((item) => {
			if (!category[item].prices[type] || !category[item].ids[type]) {
				// Item is not available in this type so we need to unselect it if it's preselected
				return
			}

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
}

function renderAddToCartButton(element: HTMLElement):void {
	if (!element) return

	const price: HTMLSpanElement = document.createElement('span')
	price.id = 'price'
	price.innerText = '(Preview total: $0.00)'
	
	const addToCartButton: HTMLButtonElement = document.createElement('button')
	addToCartButton.id = 'add-to-cart'
	addToCartButton.innerText = 'Add To Cart'

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
		const pathArr = selectedItemsData.reduce((acc, item) => {
			acc[item.ids[type]] = 1
			return acc
		}, {} as any)

		// Get cart's current contents
		let cartContents
		try {
			// @ts-ignore
			const cartContentsResponse = await fetch(window?.Shopify?.routes?.root + 'cart.js')
			cartContents = await cartContentsResponse.json()
		} catch (error) {
			cartContents = {}
		}

		if (cartContents.hasOwnProperty('items') && Array.isArray(cartContents.items) && cartContents.items.length > 0) {
			cartContents.items.forEach((item:any) => {
				if (pathArr.hasOwnProperty(item.variant_id)) {
					pathArr[item.variant_id] += item.quantity
				} else {
					pathArr[item.variant_id] = item.quantity
				}
			})
		}

		// add ?storefront=true to end to go to cart page instead of checkout
		const pathParam = Object.entries(pathArr).map(([key, value]) => `${key}:${value}`).join(',')
		const url = `https://www.kittywithacupcake.com/cart/${pathParam}`

		// Send an event log to an outside server
		try {
			// await sendEventLog("addToCart", {selectedItemsData, cartContents, url})
		} catch (error) {
			console.error('Event log failed: ', error)
		}

		setTimeout(() => {
			window.open(url, '_top')
		})
	})

	addToCartButton.append(price)
	element.appendChild(addToCartButton)
}

function renderShareButton(element: HTMLElement):void {
	if (!element) return

	const shareButton: HTMLButtonElement = document.createElement('button')
	shareButton.id = 'share-button'
	shareButton.title = 'Share your set!'
	const shareIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 50 50"><path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/><path d="M24 7h2v21h-2z"/><path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/></svg>	`
	shareButton.innerHTML = shareIcon

	shareButton.addEventListener('click', async (e: Event): Promise<void> => {
		e.preventDefault()
		shareButton.innerHTML = `<svg id="loading-svg" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="7.5 -5 5 50"><path d="M 20, 20 m 10, 0 a 20,20 0 1,0 -40,0 a 20,20 0 1,0 40,0" fill="none" stroke="black" stroke-width="3" stroke-dasharray="64"></path></svg>`

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
				showNotification('Something went wrong during share - copy link to share.', 5000, 'error')
				shareButton.disabled = true
				shareButton.title = 'Share not supported on this device'
			}).finally(() => {
				shareButton.innerHTML = shareIcon
				shareButton.blur()
			})
		} else {
			showNotification('Share feature is not supported on your device', 5000, 'error')
			shareButton.disabled = true
			shareButton.title = 'Share not supported on this device'
			shareButton.innerHTML = shareIcon
			shareButton.blur()
		}
	})

	element.appendChild(shareButton)
}

function renderShareLinkButton(element: HTMLElement):void {
	if (!element) return

	const shareLinkButton: HTMLButtonElement = document.createElement('button')
	shareLinkButton.id = 'share-link-button'
	shareLinkButton.title = 'Copy share link'
	shareLinkButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" id="icon"><path d="M11.9474,19a4.9476,4.9476,0,0,1-3.4991-8.4465l5.1053-5.1043a4.9482,4.9482,0,0,1,6.9981,6.9976l-.5523.5526-1.4158-1.4129.5577-.5579a2.95,2.95,0,0,0-.0039-4.1653,3.02,3.02,0,0,0-4.17,0l-5.1047,5.104a2.9474,2.9474,0,0,0,0,4.1692,3.02,3.02,0,0,0,4.17,0l1.4143,1.4145A4.9176,4.9176,0,0,1,11.9474,19Z"/><path d="M19.9474,17a4.9476,4.9476,0,0,1-3.4991-8.4465l.5526-.5526,1.4143,1.4146-.5526.5523a2.9476,2.9476,0,0,0,0,4.1689,3.02,3.02,0,0,0,4.17,0c.26-.26,4.7293-4.7293,5.1053-5.1045a2.951,2.951,0,0,0,0-4.1687,3.02,3.02,0,0,0-4.17,0L21.5536,3.449a4.9483,4.9483,0,0,1,6.9981,6.9978c-.3765.376-4.844,4.8428-5.1038,5.1035A4.9193,4.9193,0,0,1,19.9474,17Z"/><path d="M24,30H4a2.0021,2.0021,0,0,1-2-2V8A2.0021,2.0021,0,0,1,4,6H8V8H4V28H24V18h2V28A2.0021,2.0021,0,0,1,24,30Z"/><rect fill="none" width="32" height="32"/></svg>`

	shareLinkButton.addEventListener('click', async (e: Event): Promise<void> => {
		e.preventDefault()

		const setDiv: HTMLDivElement | null = document.querySelector('#tag-wrapper')
		if (!setDiv) return

		const selected: HTMLElement[] = Array.from(document.querySelectorAll('.selected'))
		if (selected.length === 0) return
		let selectedItems: string[] = selected.map(item => item.dataset.checkid || '')
		selectedItems = Array.from(new Set(selectedItems))

		const baseUrl = window.location.origin + window.location.pathname
		const params = new URLSearchParams()
		params.set('type', `${getCurrentItemType()}s`)
		params.set('set', selectedItems.join(','))
		const shareLink = `${baseUrl}?${params.toString()}`

		navigator.clipboard.writeText(shareLink).then(() => {
			showNotification('Share link copied to clipboard!')
			shareLinkButton.blur()
		}).catch(() => {
			showNotification(`Something went wrong copying the link. Instead, manually copy this url: ${shareLink}`, 20000, 'error')
		})
	})

	element.appendChild(shareLinkButton)
}

function renderButtons(): void {
	const selectedSection: HTMLDivElement | null = document.querySelector('#selection-input')
	if (!selectedSection) return

	const wrapper = document.createElement('div')
	wrapper.id = 'buttons-wrapper'

	renderAddToCartButton(wrapper)
	renderShareButton(wrapper)
	renderShareLinkButton(wrapper)

	selectedSection.insertBefore(wrapper, selectedSection.firstChild)
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
		priceElement.innerText = `(Preview total: $${price.toFixed(2)})`
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

function renderItemTypeToggle(element: HTMLElement, firstLoad: boolean = false): void {
	if (!element) return

	const toggleWrapper: HTMLDivElement = document.createElement('div')
	toggleWrapper.id = 'toggle-wrapper'

	const itemTypes = ['pins', 'stickers', 'b-grade pins']
	if (!B_GRADE_SALE_ACTIVE) itemTypes.pop()
	const typeFromLocalStorage = localStorage.getItem('type')

	// Check url params for type
	const queryParams = new URLSearchParams(window.location.search)
	const typeFromUrl = queryParams.get('type')

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

			// Remember open category
			const openInputGroup: HTMLDivElement | null = document.querySelector('.input-group.open')
			if (openInputGroup) {
				const parentId = openInputGroup.parentElement?.id as keyof Data
				openCategory = parentId
			} else {
				openCategory = null
			}

			updateTypeLocalStorage()
			scrapOldUI()
			renderInputs(selectedIds)
			renderSelected(selectedIds)
			renderButtons()
			updatePrice()
			toggleNothingSelected()
		})

		// Default to pins if no local storage
		if (typeFromLocalStorage === type) input.checked = true
		if (!typeFromLocalStorage && type === 'pins') input.checked = true

		// Override with URL param if it exists (only on first load)
		if (typeFromUrl === type && firstLoad) {
			input.checked = true
			updateTypeLocalStorage()
		}

		label.appendChild(input)
		toggleWrapper.appendChild(label)
	})

	element.appendChild(toggleWrapper)
}

function getCurrentItemType(): keyof Item['prices'] {
	// Get type
	const typeInput = document.querySelector('input[name="item-type"]:checked')
	
	const rawType: string = typeInput?.id
	let type: keyof Item['prices'] = 'pin'
	if (rawType === 'stickers') type = 'sticker'
	if (rawType === 'b-grade pins') type = 'bGrade'

	return type
}

function scrapOldUI(): void {
	const tagWrapper: HTMLElement | null = document.querySelector('#accordion')
	if (tagWrapper) tagWrapper.remove()

	const selectionInput: HTMLElement | null = document.querySelector('#selection-input')
	if (selectionInput) selectionInput.remove()
	
	const selectionDisplay: HTMLElement | null = document.querySelector('#selected')
	if (selectionDisplay) selectionDisplay.remove()

	const buttonsWrapper: HTMLElement | null = document.querySelector('#buttons-wrapper')
	if (buttonsWrapper) buttonsWrapper.remove()
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

async function sendEventLog(event: "pageLoad" | "addToCart", data: any): Promise<boolean> {
	const url = 'https://chadobrien-pals-builde-39.deno.dev/'
	const body = {
		event,
		data,
		eventSessionId
	}

	const response = await fetch(url, {
		method: 'POST',
		keepalive: true,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (response.ok) {
		return true
	} else {
		console.error('Failed to send event log')
		return false
	}

}

function showNotification(message: string, duration: number = 3000, type: 'success' | 'error' = 'success'): void {
	const existingNotification: HTMLElement | null = document.querySelector('#notification')
	if (existingNotification) existingNotification.remove()

	const notification: HTMLDivElement = document.createElement('div')
	notification.id = 'notification'
	notification.classList.add(type)
	notification.innerText = message
	document.body.appendChild(notification)

	setTimeout(() => {
		notification.classList.add('hide')
		setTimeout(() => {
			notification.remove()
		}, 300)
	}, duration)
}
