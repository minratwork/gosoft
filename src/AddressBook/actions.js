import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";

export const updateSearchPhrase = newPhrase =>
  (dispatch, getState, { httpApi, debounce }) => {
    dispatch(
      searchActions.updateSearchPhraseStart({ newPhrase }),
    );
    
    debounce(httpApi.getFirst5MatchingContacts, 300)({ namePart: newPhrase })
      .then(({ data }) => {
        const matchingContacts = data.map(contact => ({
          id: contact.id,
          value: contact.name,
        }));
        // TODO something is wrong here // FIXED
        dispatch(
          searchActions.updateSearchPhraseSuccess({ matchingContacts: matchingContacts }),
        );
      })
      .catch(() => {
        // TODO something is missing here // FIXED ?
        dispatch(
          searchActions.updateSearchPhraseFailure(),
        );
      })
  };

export const selectMatchingContact = selectedMatchingContact =>
  (dispatch, getState, { httpApi, dataCache }) => {
    // TODO something is missing here || FIXED
    const getContactDetails = ({ id }) => {
        if (!dataCache.load({key: id})) {
          return httpApi
              .getContact({ contactId: selectedMatchingContact.id })
              .then(({ data }) => ({
                id: data.id,
                name: data.name,
                phone: data.phone,
                addressLines: data.addressLines,
              }));
        } else {
          return Promise.resolve(dataCache.load({key: id}));
        }
    };

    dispatch(
      searchActions.selectMatchingContact({ selectedMatchingContact }),
    );

    dispatch(
      contactDetailsActions.fetchContactDetailsStart(),
    );

    getContactDetails({ id: selectedMatchingContact.id })
      .then((contactDetails) => {
        // TODO something is missing here || Fixed ?
        dataCache.store({
          key: contactDetails.id,
          value: contactDetails
        });
        // TODO something is wrong here || Fixed ?
        dispatch(
          contactDetailsActions.fetchContactDetailsSuccess({ contactDetails: contactDetails }),
        );
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure(),
        );
      });
  };
