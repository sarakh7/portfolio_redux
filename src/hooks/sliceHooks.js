
import { useContext } from 'react';
import { SliceContext } from './../context/SliceProvider';
import { useSelector } from 'react-redux';

const useSliceActions = () => useContext(SliceContext).actions

const useSliceSelector = () => {
  const {name} = useContext(SliceContext)
  return useSelector(state => state.entities[name])
}

export { useSliceActions, useSliceSelector }