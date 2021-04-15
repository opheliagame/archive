module.exports = {
  siteMetadata: {
    title: `opheliagame`,
    description: `a blog experiment`,
    author: `@opheliagame`,
  },
  plugins: [
    {
        resolve: `gatsby-remark-videos`,
        options: {
          pipelines: [
            {
              name: 'vp9',
              transcode: chain =>
                chain
                  .videoCodec('libvpx-vp9')
                  .noAudio()
                  .outputOptions(['-crf 20', '-b:v 0']),
              maxHeight: 480,
              maxWidth: 900,
              fileExtension: 'webm',
            },
            {
              name: 'h264',
              transcode: chain =>
                chain
                  .videoCodec('libx264')
                  .noAudio()
                  .addOption('-profile:v', 'main')
                  .addOption('-pix_fmt', 'yuv420p')
                  .outputOptions(['-movflags faststart'])
                  .videoBitrate('1000k'),
              maxHeight: 480,
              maxWidth: 900,
              fileExtension: 'mp4',
            },
          ],
        }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
            {
                resolve: `gatsby-remark-images`,
                options: {
                maxWidth: 400,
                wrapperStyle: fluidResult => `flex:${Math.round(fluidResult.aspectRatio, 2)};`,
                },
            },
            {
                resolve: `gatsby-remark-copy-linked-files`,
                options: {},
            },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    `gatsby-plugin-ffmpeg`,
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
