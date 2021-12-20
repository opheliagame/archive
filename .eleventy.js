const Image = require('@11ty/eleventy-img')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')
const mila = require('markdown-it-link-attributes')

async function imageShortCode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ['avif', 'jpeg'],
    urlPath: '/blog/',
    outputDir: '_site/blog/'
  });
  let imageAttributes = {
    style: 'border-radius: 50%',
    alt, 
    sizes, 
    loading: 'lazy',
    decoding: 'async'
  };
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src/blog/");
  eleventyConfig.addWatchTarget('src/static/css/extra.css')
  eleventyConfig.addPassthroughCopy({ 'src/static/css/extra.css': '/extra.css' })

  eleventyConfig.addPassthroughCopy("src/static/assets/");
  eleventyConfig.addPassthroughCopy("src/static/js/");


  // image optimisation using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortCode);
  eleventyConfig.addLiquidShortcode("image", imageShortCode);
  eleventyConfig.addJavaScriptFunction("image", imageShortCode);

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

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}