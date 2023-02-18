const isOpen: boolean = false
const myName: string = 'Chad'
const myAge: number = 32
const me: [string, number, string] = ['Chad', 32, 'Developer']

enum Job { WebDev, WebDesigner, PM }
const job: Job = Job.WebDev

const phone: any = 'Pixel'
const tablet: any = 3

/*
__________________
On Page Load
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

toggleNothingSelected()
setCheckboxesFromLocalStorage()


/*
__________________
Event Listeners
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

// Open and close the accordion
const buttons: NodeListOf<HTMLInputElement> = document.querySelectorAll('#accordion button')
buttons.forEach(button => {
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
})

// Toggle the "Nothing Selected" message
const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#accordion input[type="checkbox"]')
checkboxes.forEach(checkbox => {
	checkbox.addEventListener('change', () => {
		toggleNothingSelected()

		// Only allow one peeker to be checked
		if (checkbox.id.includes('peeker')) {
			onlyAllowOnePeeker(checkbox)
		}
		
		updateLocalStorage()
		updateSelected()
	})
})


/*
__________________
Functions
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

function toggleNothingSelected() {
	const checkboxes: Array<HTMLInputElement> = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]'))
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
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#accordion input[type="checkbox"]')
	const checked: Array<string> = []
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			checked.push(checkbox.id)
		}
	})
	localStorage.setItem('checked', JSON.stringify(checked))
}

function setCheckboxesFromLocalStorage() {
	const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('#accordion input[type="checkbox"]')
	const checked: Array<string> = JSON.parse(localStorage.getItem('checked') || '[]')
	checkboxes.forEach(checkbox => checkbox.checked = checked.includes(checkbox.id) ? true : false)
	updateSelected()
}

function updateSelected() {
	const checkedCheckboxes: Array<HTMLInputElement> = Array.from(document.querySelectorAll('#accordion input[type="checkbox"]:checked'))
	const checkedIds: Array<string> = checkedCheckboxes.map(checkbox => checkbox.id)
	const tags: NodeListOf<HTMLElement> = document.querySelectorAll('.tag')
	tags.forEach(tag => {
		if(tag.dataset.checkid === undefined) return
		checkedIds.includes(tag.dataset.checkid) ? tag.classList.add('selected') : tag.classList.remove('selected')
	})
}

function onlyAllowOnePeeker(checkbox: HTMLInputElement) {
	const peekers: Array<HTMLInputElement> = Array.from(document.querySelectorAll('#peekers input[type="checkbox"]'))
	peekers.forEach(peeker => {
		if (peeker.id !== checkbox.id) {
			peeker.checked = false
		}
	})
}