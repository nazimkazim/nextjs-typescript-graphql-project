import {useRouter} from 'next/router';

const PortfolioDetail = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <h1>I am a detail page {id}</h1>
  )
}

export default PortfolioDetail;