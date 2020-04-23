# Set up publishing a page on **g**it**h**ub pages (with angular 7)

* Prequisites
`npm install -g angular-cli-ghpages`

* Set the base ref on production build
`ng build --prod --base-href="https://dpanster.github.io/pokemon-tcg-angular/"`

* A dry run test
`npx ngh --dry-run --no-silent`

* publish to (new) branch gh-pages with all verbose messages
`npx ngh --dir=dist/ --no-silent`

* Choose the source in your project settings for gh-pages on github repository
`Project-->settings-->GitHub Pages-->Source-->gh-pages branch`

* Can be take 10 minutes