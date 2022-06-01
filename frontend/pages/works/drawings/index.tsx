import type { NextPage } from 'next'
import { getNavData } from '../../../components/Nav'




const Drawings: NextPage = () => {

  return (
   
     <h1>hi drawings</h1>
  )
}

export default Drawings


export async function getStaticProps() {

  const posts = await getNavData();

  return {
    props: {
      posts:posts
    },
  }
}
