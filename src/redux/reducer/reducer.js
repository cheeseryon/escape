const initialState = {
    areaName: '',
    subAreaName: '',
    genreName: '',
    likeToggle:'false',
    likeId:[]
};
function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "GENRE_SELECT":   
            return {               
                ...state,
                genreName: payload.genreName,
            }
        case "AREA_SELECT":
            return {
                ...state,
                areaName : payload.areaName,
                subAreaName: '',
                genreName: ''
            }
        case "SUBAREA_SELECT":  
            return {               
                ...state,
                subAreaName: payload.subAreaName,
            }
        case "MODAL_LIKE":
            return {
                ...state,
                likeToggle: (state.likeToggle == false) ? true : false
            }
        case "MODAL_ID":
            const uddateModalItemId = state.likeId.includes(payload.modalItemId)
                ? state.likeId.filter(id => id !== payload.modalItemId)
                : [...state.likeId, payload.modalItemId]
            return {
                ...state,
                likeId : uddateModalItemId
            }
        case "CARD_LIKE":
            return {
                ...state,
                likeToggle: (state.likeToggle == false) ? true : false
            };
        case "CARD_ID":
            const updateCardItemId = state.likeId.includes(payload.cardItemId)
                ? state.likeId.filter(id => id !== payload.cardItemId)
                : [...state.likeId, payload.cardItemId];
        
            return {
                ...state,
                likeId: updateCardItemId
            };

        case "LIKE_ID_REMOVE":
            const updateLikeIdRemove = state.likeId.includes(payload.removeId)
                ? state.likeId.filter(id => id !== payload.removeId)
                : [...state.likeId, payload.removeId]
            return {
                ...state,
                likeId: updateLikeIdRemove
            }

        default:
            return state;
    }
}

export default reducer;
