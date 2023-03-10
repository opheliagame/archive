const CleanCSS = require("clean-css")
const htmlmin = require("html-minifier")
const svgContents = require("eleventy-plugin-svg-contents")
const Image = require('@11ty/eleventy-img')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItClass = require('@toycode/markdown-it-class')
const mila = require('markdown-it-link-attributes')
const fs = require('fs')
const dir = '_site'

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
    urlPath: "/archive/assets/img/",
    outputDir: `./${dir}/assets/img/`
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

  eleventyConfig.addPassthroughCopy("src/assets/js")
  eleventyConfig.addPassthroughCopy("src/assets/img")
  eleventyConfig.addPassthroughCopy("src/assets/css/extra.css")


  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync(`${dir}/404.html`);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  })

  // const result = require("./src/_data/myGithub")();
  // result.then(data => {
  //   const tags = data.tags;

  //   tags.map((tag) => {
  //     const name = tag.toString().toLowerCase()
  //     eleventyConfig.addCollection(name, (collection) => {
  //       return data.repos.filter(repo => repo.data.tags.includes(tag));
  //     });
  //   })
  // })

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
      class: "link-primary",
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

  return {
    pathPrefix: '/archive/',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: `${dir}`,
    }
  }

}
