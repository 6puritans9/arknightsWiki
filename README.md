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
[] Sticky navigation
  [] With opacity
[] Event Banners
  [] Carousel with swiper
```

_Operators_

```
\\ Overview
[] View with class grouping
[x] Filter by category
  [x] rarity
  [x] class
    [x] branch?
  [x] faction
[x] Refactor to server-side data fetching

\\ Details
[x] Tab Selection(useState)
[x] Every column fetching
[] Tags | Votes(to draw or not)
  [] Votes could be represented in shpae of rope fight
```

_Infra_

```
[x] Query operators JOIN base
  [x] When an operator is selected, filter view to its realtions
[x] Refactor to server-side data fetching
[] Fix filtering sub_factions
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
[] Background Color(dark)
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

_Tierlist_

_Base_

### DB

_Operators_
[x] UPDATE COLUMN name_en TO name

_base_
[x] connect operators with base

### Deploy

```
[]
```
