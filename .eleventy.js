const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const svgContents = require("eleventy-plugin-svg-contents")
const Image = require('@11ty/eleventy-img')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')
const mila = require('markdown-it-link-attributes')

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
    urlPath: "/assets/img/",
    outputDir: "./build/assets/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  if (process.env.NODE_ENV !== 'production') {
    eleventyConfig.addPassthroughCopy("src/assets/js")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/assets/css/extra.css")
    eleventyConfig.addWatchTarget("./src/assets/js")
    eleventyConfig.addWatchTarget("./src/assets/img")
  } else {
    eleventyConfig.addPassthroughCopy("src/assets/js")
    eleventyConfig.addPassthroughCopy("src/assets/img")
    eleventyConfig.addPassthroughCopy("src/assets/css/extra.css")
    eleventyConfig.addWatchTarget("./src/assets/js")
    eleventyConfig.addWatchTarget("./src/assets/img")
  }

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addPlugin(svgContents)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  const mapping = {
    ul: ['markdown-list', 'list-inside', 'ml-2', 'self-start'],
    p: ['py-2'],
    h2: ['text-lg'],
    h3: ['text-lg', 'font-semibold'],
  }

  const milaOptions = {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer"
    }
  }
  const md = markdownIt({linkify: true, html: true})
  md.use(mila, milaOptions)
  md.use(markdownItClass, mapping)
  eleventyConfig.setLibrary('md', md)

  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/assets/css/tailwind.css')

  eleventyConfig.addPassthroughCopy({ './tmp/style.css': './style.css' })
}
