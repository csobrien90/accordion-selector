/*
__________________
Types, Interfaces, and Enums
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
*/

export interface Data {
	pals: Category,
	pronouns: Category,
	flags: Category,
	personalities: Category
}

export interface Category {
	[slug: string]: Pin
}

interface Pin {
	name: string,
	image: string,
	image2?: string,
	alt: string
}