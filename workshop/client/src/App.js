import React from 'react'
import { Layout, Typography, Divider } from 'antd'
import { MyFormWithForm } from './Form'
import { PetList } from './PetList'

const { Content, Header } = Layout
const { Title } = Typography

export const App = () => {
  return (
    <Layout>
      <Header>
        <Title style={{ color: 'white', lineHeight: 'unset' }}>Pet guide</Title>
      </Header>
      <Content>
        <MyFormWithForm />
        <Divider>Pet List</Divider>
        <PetList />
      </Content>
    </Layout>
  )
}
