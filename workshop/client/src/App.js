import React from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { Layout, Typography, Divider } from 'antd'
import { MyFormWithForm } from './Form'
import { PetList } from './PetList'

const { Content, Header } = Layout
const { Title } = Typography

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: 'http://localhost:4000' }),
})

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header>
          <Title style={{ color: 'white', lineHeight: 'unset' }}>
            Pet guide
          </Title>
        </Header>
        <Content>
          <MyFormWithForm />
          <Divider>Pet List</Divider>
          <PetList />
        </Content>
      </Layout>
    </ApolloProvider>
  )
}
