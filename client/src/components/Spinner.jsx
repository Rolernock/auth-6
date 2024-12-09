import { FadeLoader } from 'react-spinners'

export default function Spinner() {
  const override = {
    display: 'flex',
    margin: '20vh auto'
  }
  return (
    <FadeLoader cssOverride={override} height={50} width={10} margin={30} />
  )
}
