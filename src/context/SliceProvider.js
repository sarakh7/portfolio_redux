import { createContext } from "react"

export const SliceContext = createContext({})

const SliceProvider = ({ slice, children }) => {

  const { Provider } = SliceContext;

  return <Provider value={slice}>{children}</Provider>
}

export default SliceProvider
