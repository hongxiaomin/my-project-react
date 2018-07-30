import React from 'react'
import styled from 'styled-components'


const Catalog = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 10px;
  margin: 50px;
  border: 1px ridge grey;
  width: 200px;
`

const Title = styled.span`
  padding: 0 0 15px 0
`

const Link = styled.a`
  width: 150px;
  margin: 10px auto;
`

const LicensePage = () => (
  <Catalog>
    <Title>
      License Page Catalog:
    </Title>
    <Link className='pt-button pt-intent-success' href='/license/licenseManagement'>
      License Management
      <span className='pt-icon-standard pt-icon-arrow-right pt-align-right' />
    </Link>
  </Catalog>
)

export default LicensePage
