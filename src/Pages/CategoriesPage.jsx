import React from 'react'
import ProductsTab from './Home/Components/Tabs/Tabs'
import { Box } from '@chakra-ui/react'
import Categories from './Home/Components/Category'

function CategoriesPage() {
  return (
    <Box  pt={'14'}>
        <Categories/>
        <ProductsTab/>
    </Box>
  )
}

export default CategoriesPage


