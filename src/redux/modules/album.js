export const SET_ALBUMS = 'SET_ALBUMS';

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  payload: albums
});
const initialState = {
  albums: []
};
const album = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    default:
      return state;
  }
};

export default album;
