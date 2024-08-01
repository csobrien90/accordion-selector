/*
__________________
Types, Interfaces, and Enums
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

export interface Data {
	pals: Category,
	pronouns: Category,
	flags: Category,
	personalities: Category,
	accessibility: Category,
}

export interface Category {
	[slug: string]: Pin
}

export interface Pin {
	name: string
	image: string
	image2?: string
	alt: string
	id: string
	price: number
}