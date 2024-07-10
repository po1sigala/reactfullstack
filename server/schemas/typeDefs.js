const typeDefs=`
type User {
     _id: ID!
    username: String!
    email: String
    favBooks: [Book]
}
type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
}
type Auth {
    token: ID!
    user: User
}
type Query {
    me:User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}

`
module.exports =typeDefs