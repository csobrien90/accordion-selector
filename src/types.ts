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
	[slug: string]: Item
}

export interface Item {
	name: string
	image: string
	image2?: string
	alt: string
	ids: Id,
	prices: Price
}

export interface Id {
	pin: string
	sticker?: string
	bGrade?: string
}

export interface Price {
	pin: number
	sticker?: number
	bGrade?: number
}
