# ArknightsWiki

Greetings Doctor!\
Currently under construction.👷‍♂️🔨🚧

## Tools

![Next.js](./public/docs/next-js.svg)
![Typescript](./public/docs/typescript.svg)
![Sass](./public/docs/sass.svg)
![Supabase](./public/docs/supabase.svg)

## Architecture

### Routing

```
                    home
                     |
    -----------------------------------------
    |          |          |                 |
/operators    /tierlist   /infrastructure   /materials
    |
  [name]
```

### DB

![db_flow](./public/docs/db_flow.png)

## Features

### React

[] Language Support
[] Search

_Home_

```

```

_Operators_

```
\\ Filter
[x] Filter by category
  [x] rarity
  [x] class
    [x] branch
    [x] Pop corresponding branches up when a class is selected
  [x] faction
[x] Custom Sort for className
[x] Implement overlapping conditions
  [x] Class with corresponding branches
  [x] Rarity - Class(branch) - Faction
  [] Clicking twice will unselect the selected


\\ Overview
[] View operators with rarity grouping
[x] Refactor to server-side data fetching

\\ Details
[x] Tab Selection(useState)
[x] Every column fetching
[] Tags | Votes(to draw or not)
  [] Votes could be represented in shpae of rope fight
```

_Infra_

```
\\ Filter
[] Apply facility tree structure for initialData
[x] Refactor the filtering logic can be overlapped with useReducer
[x] Clicked operator should be remained in the page

\\ Overview
[x] Query operators JOIN base
  [x] When an operator is selected, filter view to its realtions
[x] Refactor to server-side data fetching
[] ?Save preset
```

### CSS

_Header_

```
[x] Nav
[] Sticky
```

_Home_

```
[x] Background Video
[] Banners(Carousel)
```

_Footer_

```
[x] Background color
[] Version
[] Stick to the bottom
```

_Operators_

```
\\ Filter
[x] Adjust rarity margin
[] Make background color change when elements are being selected
[] Fix corresponding desc to show up for branches
[] Apply accordions
  [] (faction)Show the most popular 6 factions and put Extend button below
[] Make every image background size constant in branch

\\ Overview
[] Grid(_grid.scss)
  [x] 6 repeated columns
  [] when hovered, the icon shines according to its rarity
  [] Dropdown rarity bar to show/hide corresponding operators
[] Modal
  [] when hovered, a preview pops up as a modal
[]
```

_Operators_Details_
![details_layout](./public/docs/details_layout.png)

```
[]
```

_Infra_

```
[x] Highlight only hovered skill, not the operator itself
[] Add accordion for each category
```

### DB

_Operators_
[x] UPDATE COLUMN name_en TO name

_Infra_
[x] connect operators with base

### Deploy

```
[] Build with ISR
[] EC2 or Vercel?
```
