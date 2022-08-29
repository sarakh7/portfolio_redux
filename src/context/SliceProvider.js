import { createContext } from "react"

export const SliceContext = createContext({})

const SliceProvider = ({ slice, service, children }) => {

  const { Provider } = SliceContext;

  return <Provider value={{slice, service}}>{children}</Provider>
}

export default SliceProvider
