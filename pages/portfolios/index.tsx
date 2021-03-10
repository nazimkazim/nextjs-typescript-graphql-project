import axios from 'axios'
import PortfolioCard from '../../components/portfolios/PostfolioCard'

const fetchPortfolios = async () => {
  const query = `
  query Portfolios {
    portfolios {
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
  const data = await axios.post('http://localhost:3000/graphql', {
    query
  })
  const res = await data.data;
  return res;
}

const Portfolios = ({ portfolios }: any) => {

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div className="col-md-4">
              <PortfolioCard 
                key={portfolio._id} 
                portfolio={portfolio} 
              />
            </div>
          ))}

        </div>
      </section>
    </>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios()
  //console.log(portfolios.data);

  return portfolios.data;
}

export default Portfolios
