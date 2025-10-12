# Build Your Pin Set

An accordion selector component that takes arrays of data and generates an interface for selecting and previewing options. It is written in Typescript but ships ready to build with Webpack for integration as vanilla JS. Choices are stored in local storage and can be shared using the HTML2Canvas library and the Share API.

*Check out this implementation for the Pronoun Pals pin set builder at https://kittywithacupcake.com/pages/build-your-pronoun-pals-pin-set*


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




https://kittywithacupcake.com/cart/44662146891970:1,44596723876034:1,:1,44815940255938:1,44655185985730:1,44655185952962:1,44655185920194:1,44655184937154:1,44655184904386:1,44655184871618:1,44655183954114:1,44655183921346:1,44655183888578:1,44034362933442:1,44034362966210:2,44034362900674:1,44034318008514:1,44034318041282:1,44034317975746:1,44034343698626:1,44034343731394:1,44034343665858:1,44034302247106:1,44034302279874:1,44034302214338:1,44034335834306:1,44034335867074:1,44034335801538:1,44034290483394:1,44034290516162:1,44034290450626:1,44655180611778:2


44655180611778:4,44013694255298:2,44815941042370:2,44034290450626:1,44034290516162:1,44034290483394:1,44034335801538:1,44034335867074:1,44034335834306:1,44034302214338:1,44034302279874:1,44034302247106:1,44034343665858:1,44034343731394:1,44034343698626:1,44034317975746:1,44034318041282:1,44034318008514:1,44034362900674:1,44034362966210:2,44034362933442:1,44655183888578:1,44655183921346:1,44655183954114:1,44655184871618:1,44655184904386:1,44655184937154:1,44655185920194:1,44655185952962:1,44655185985730:1,44815940255938:1