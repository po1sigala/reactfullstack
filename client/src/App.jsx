import "./App.css"
import {Outlet} from "react-router-dom"
import NavBar from "./components/Navbar/index.jsx"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context"
const backendLink=createHttpLink({uri:"/graphql"})
const auth =setContext((_,{headers})=>{
  const token=localstorage.getItem("id_token")
  return{
    headers:{
      ...headers,
      authorization: token? `Bearer ${token}`:``
    }
  }

})
const client= new ApolloClient({
  link: auth.concat(backendLink),
  cache: new InMemoryCache()
})

function App(){

  return(
    <ApolloProvider client={client}>
      <NavBar/>
      <Outlet/>
    </ApolloProvider>
  )
}
export default App