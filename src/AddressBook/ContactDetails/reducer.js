import {
  FETCH_CONTACT_DETAILS__FAILURE,
  FETCH_CONTACT_DETAILS__START,
  FETCH_CONTACT_DETAILS__SUCCESS,
} from "./actions";

const initialState = {
  fetchedContact: null,
  fetchFailure: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
console.log("CHECK-REDUCER")
console.log(type)
console.log(payload)
  switch (type) {
    
    // TODO something is missing here
    case FETCH_CONTACT_DETAILS__START:
      return {
        ...state,
        fetchedContact: null,
      };

    // TODO something is wrong here
    case FETCH_CONTACT_DETAILS__SUCCESS:
      return {
        ...state,
        fetchedContact: null,
      };

    case FETCH_CONTACT_DETAILS__FAILURE:
      return {
        ...state,
        fetchFailure: true,
      };

    default:
      return state;

  }
};

export default reducer;