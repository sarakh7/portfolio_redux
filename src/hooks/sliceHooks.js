
import { useContext } from 'react';
import { SliceContext } from './../context/SliceProvider';
import { useSelector } from 'react-redux';

const useSliceActions = () => {
  const {slice} = useContext(SliceContext);
  return slice.actions
}

const useSliceSelector = () => {
  const { slice } = useContext(SliceContext)
  return useSelector(state => state.entities.admin[slice.name])
}

const useSliceService = () => {
  const {service} = useContext(SliceContext);
  return service;
}

export { useSliceActions, useSliceSelector, useSliceService }