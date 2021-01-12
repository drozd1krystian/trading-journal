import modalTypes from "./modal.types";

export const showModal = () => ({
  type: modalTypes.SHOW,
});

export const triggerLoading = () => ({
  type: modalTypes.LOADING,
});

export const triggerDone = () => ({
  type: modalTypes.DONE,
});

export const modalError = () => ({
  type: modalTypes.MODAL_ERROR,
});

export const clearModalState = () => (dispatch) => {
  setTimeout(() => dispatch(triggerLoading()), 1000);
  setTimeout(() => dispatch(showModal()), 900);
  setTimeout(() => dispatch(triggerDone()), 900);
};
