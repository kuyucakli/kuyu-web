import type { NextPage } from 'next'
import { getNavData } from '../components/Nav'


const Home: NextPage = () => {
  return (
  
        <h1>Hi there :!</h1> 
  )
}

export default Home


export async function getStaticProps() {

  const mainNavData = await getNavData();

  return {
    props: {
     ...mainNavData
    },
  }
}

