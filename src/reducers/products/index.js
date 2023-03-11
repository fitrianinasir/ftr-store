import {PRODUCTS} from '../../action/action'


const initialState = {
  getProductsListLoading: false,
  getProductsList: false,
  getProductsListError: false
}

const productsData = (state = initialState, action) => {
  switch(action.type){
    case PRODUCTS:
      return{
        ...state,
        getProductsList: action.payload.data,
        getProductsListLoading: action.payload.loading,
        getProductsListError: action.payload.error
      }
    default:
      return state
  }
}

export default productsData