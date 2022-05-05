import type { NextPage } from 'next'


const Works: NextPage = ({works}: any) => {
    console.log(works)
    return (
        <ul>
          {works.map((work: any, id: number) => (
            <li key={id}>{work.attributes.title}</li>
          ))}
        </ul>
      )
}

export default Works
  // This function gets called at build time on server-side.
  // It won't be called on client-side, so you can even do
  // direct database queries.
  export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('http://127.0.0.1:1337/api/works')
    const works = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        works:works.data,
      },
    }
  }
  
 