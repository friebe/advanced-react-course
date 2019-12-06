3. prisma =
You tell Prisma what your data model (datamodel.graphql) is and the service gives back basic CRUD operations Filters and many more to interact with your DB. Never write your own DB querys like SQL (SELECT * FROM...WHERE....LIMIT 1)

Prisma give not the logic to controll ur data before it puts the data into the DB.

4. graphql yoga =
controller (gives ability to push our own logic before data is put in db - security layer as an express middleware server)

5. apollo client =
query qraphql data inner frontend
replaces the need of redux or other state management and ability other advanteges



A more detailed description about all fragments
https://dev.to/doylecodes/a-journey-with-graphql-32gc