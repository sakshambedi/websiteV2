This is the readme for this project

This website is built using nextjs + tailwindcs + react + determination and ambition (I am not a front end developer)

## Prototyping

I did some prototyping using figma. Check out the basic desing that I made here. [FIGMA prototype](https://www.figma.com/proto/410Ouu5c369LS4SDUs9COp/Website?node-id=0-1&t=TdAx4BHHASegScUF-1)

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F410Ouu5c369LS4SDUs9COp%2FWebsite%3Fnode-id%3D0-1%26t%3DTdAx4BHHASegScUF-1" allowfullscreen></iframe>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Structure

Most of the website is very basic TS. 

The blog is generated from a markdown file. Markdown was the prefered file format due to its massive adoption, and has all the features that I require. 

Alternative to this was using a headlessCMS with more features but that seemed unnecessary.

The 



## TODO:

- Add caching for the server side rendering
- Add a loading component when the blog is getting rendered
- Fix the basic dark and light theme. The light theme is too light.
