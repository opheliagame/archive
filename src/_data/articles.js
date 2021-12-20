// const fetch = require('node-fetch')

// async function getAllArticles() {
//   const recordsPerQuery = 100
//   let recordsToSkip = 0
//   let makeNewQuery = true
//   let articles = []

//   while(makeNewQuery) {
//     try {
//       const data = await fetch("http://localhost:1337/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json" 
//         },
//         body: JSON.stringify({
//           query: `{
//             articles {
//               data {
//                 attributes {
//                   title
//                   body
//                   date
//                 }
//               }
//             }
//           }`,
//         }),
//       })

//       const response = await data.json()

//       if(response.errors) {
//         let errors = response.errors
//         errors.map((error) => console.log(error.message))
//         throw new Error("Houston... CMS problem")
//       }

//       articles = articles.concat(response.data.data.articles.data)

//       recordsToSkip += recordsPerQuery
//       if(response.data.data.articles.data.length < recordsPerQuery) {
//         makeNewQuery = false
//       }

//     } catch (error) {
//       throw new Error(error)
//     }
//   } 

//   const articlesFormatted = articles.map((item) => {
//     return {
//       id: item.id,
//       title: item.title,
//       body: item.body,
//       date: item.date
//     }
//   })

//   return articlesFormatted
// }

// module.exports = getAllArticles