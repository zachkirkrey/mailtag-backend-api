// import Event from '@ioc:Adonis/Core/Event'
// import Logger from '@ioc:Adonis/Core/Logger'
// import Database, { DbQueryEventNode } from '@ioc:Adonis/Lucid/Database'
// import Application from '@ioc:Adonis/Core/Application'

// Event.on('db:query', (query: DbQueryEventNode) => {
//   if (Application.inProduction) {
//     Logger.debug(query)
//   } else {
//     Database.prettyPrint(query)
//   }
// })