import { createContext, useContext } from "react"
import { useSelector } from 'react-redux';

const SliceContext = createContext({})

const SliceProvider = ({ slice, children }) => (
  <SliceContext.Provider value={slice}>{children}</SliceContext.Provider>
)

const useSliceActions = () => useContext(SliceContext).actions

const useSliceSelector = () => {
  const {name} = useContext(SliceContext)
  return useSelector(state => state[name])
}

export default SliceProvider
export { useSliceActions, useSliceSelector }