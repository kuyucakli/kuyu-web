import type { NextPage } from 'next'
import { getNavData } from '../../components/Nav'




const Works: NextPage = () => {

  return (
   
     <h1>hi works</h1>
  )
}

export default Works


export async function getStaticProps() {

  const posts = await getNavData();

  return {
    props: {
      posts:posts
    },
  }
}



