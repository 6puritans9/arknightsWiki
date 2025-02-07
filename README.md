# <span style="color:white">ArknightsWiki</span>

Greetings Doctor!
This is (yet another) Arknights Wiki, which is my first web project🥹.

It provides character profiles with dynamic tags, tier list, squad with faction relations, base skill relations and some other features.

It also offers language options among English, Korean and Chinese.

I'm delighted that I did have made a thing that I hoped, and wish you find it useful.

Enjoy!🦄

## Tools

![Next.js](./public/docs/next-js.svg)
![Typescript](./public/docs/typescript.svg)
![Sass](./public/docs/sass.svg)
![Supabase](./public/docs/supabase.svg)

## Architecture

### Frontend

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

| Operators | Operators_Factions | Factions |
| --------- | ------------------ | -------- |
| id        | Title              | id       |
| Paragraph | Text               | 1        |

## Implements

### React

_Home_

```
[]
```

_Operators_

```
[] Tab Selection(useState)
[] Filter by category
  [] name
  [] rarity
  [] class
    [] branch?
  [] faction
[] Tags
```

### CSS

_Home_

```
[] Banners(Carousel)
```

_Operators_Overall_

```
[] Grid(_grid.scss)
  [] 6 repeated columns
  [] when hovered, the icon shines according to its rarity
  []
[] Modal
  [] when hovered, a preview pops up as a modal
  []
[]
```

_Operators_Details_

```
[]
```

_Tierlist_

_Infrastructure_

### DB

_Operators_Join_

### Deploy

```
[]
[] 2
```
