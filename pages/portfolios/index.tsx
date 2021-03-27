import axios from 'axios'
import PortfolioCard from '../../components/portfolios/PostfolioCard'
import Link from 'next/link'
import { useState } from 'react'

const graphCreatePortfolios = async () => {
  const query = `
  mutation CreatePortfolio {
    createPortfolio(input: {
      title: "New title", 
      company: "New company", 
      companyWebsite: "New website", 
      location: "New locatio", 
      jobTitle: "New title", 
      description: "New desc",
      startDate: "12/12/2012",
      endDate: "12/12/2013"
    })
    {
      _id, 
      title, 
      company, 
      companyWebsite, 
      location, 
      jobTitle, 
      description,
      startDate,
      endDate
    }
  } 
  `
  //const variables = { id }
  const data = await axios.post('http://localhost:3000/graphql', { query });
  const res = await data.data;
  const newPortfolio = res.createPortfolio;
  return newPortfolio
}

const fetchPortfolios = async () => {
  const query = `
  query Portfolios{
    portfolios{
      _id, 
      title, 
      company, 
      companyWebsite, 
      location, 
      jobTitle, 
      description,
      startDate,
      endDate
  }}`
  //const variables = { id }
  const data = await axios.post('http://localhost:3000/graphql', { query });
  const res = await data.data;
  return res;
}


const Portfolios = ({ data }: any) => {
  console.log(data.portfolios);
  
  const [portfolios, setPortfolios] = useState(data.portfolios)

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolios()
    const newPorfolios = [...portfolios, newPortfolio]
    setPortfolios(newPorfolios)
  }
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={createPortfolio}>Create Portfolio</button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => {
            //console.log(portfolio._id);
            return (<div className="col-md-4">
              <Link
                as={`portfolios/${portfolio && portfolio._id}`}
                href='/portfolios/[id]'
              >
                <a className="card-link">
                  <PortfolioCard
                    key={portfolio && portfolio._id}
                    portfolio={portfolio}
                  />
                </a>
              </Link>
            </div>)
          })}

        </div>
      </section>
    </>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios()
  //console.log(portfolios.data);

  return { data: portfolios.data };
}

export default Portfolios
