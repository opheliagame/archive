// require('dotenv').config()
// const github = require('octonode')
// const client = github.client(process.env.PAT)
// const me = client.user('opheliagame')

// async function getRepositories() {
//   let tags = []
//   let repos = (await me.reposAsync())[0]
//               .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
//   let result = await Promise.all(repos.map(async (r) => {
//     const repo = client.repo(r.full_name)
//     const langs = (await repo.languagesAsync())[0]
//     let result = {
//       url: r.html_url,
//       data: { 
//         title: r.name,
//         description: r.description,
//         tags: Object.keys(langs)
//       }
//     }
//     tags = tags.concat(Object.keys(langs))
//     return result
//   }))

//   let final = {
//     repos: result,
//     tags: Array.from(new Set(tags))
//   }
//   // console.log(final.tags)

//   return final
// }

// module.exports = getRepositories