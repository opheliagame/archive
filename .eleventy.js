const Image = require('@11ty/eleventy-img')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  }
}