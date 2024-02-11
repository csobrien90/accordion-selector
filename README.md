# Build Your Pin Set

*An accordion selector component that takes arrays of data and generates an interface for selecting and previewing options. It is written in Typescript but ships ready to build with Webpack for integration as vanilla JS. Its initial implementation was for the Pronoun Pals pin set builder at https://kittywithacupcake.com/pages/build-your-pronoun-pals-pin-set*


## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```sh
# Clone the repository
git clone

# Install dependencies
npm install

# Start building on save (development)
npm start

# Build the project (production)
npm run build
```

## Usage

Setup your data and simply include `dist/main.js` on a page with a `<div id="wrapper"></div>` after the DOM has loaded. The component will automatically generate the interface and handle all user interactions.

### Data

This component requires a `src/data.ts` file that exports an object with the following structure:

```ts
import { Category, Data } from './types'

// Any number of categories with this structure
const categoryTitle: Category = {
	'{label}': {
		name: '{name}',
		image: '{image}', // The top (or only) image src
		image2?: '{image2}', // The bottom image src (optional)
		alt: '{alt}' // The alt text for the images
	}, ...
}

export const selectorData: Data = {categoryTitle, ...} // Include all categories
``` 
Currently the component is set up to use four categories: pals, pronouns, flags, personalities.



## To Do

- Finish "Share your set" feature