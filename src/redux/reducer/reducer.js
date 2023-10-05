const initialState = {
    areaName: '',
    subAreaName: '',
    genreName: '',
    modalLike: '',
    modalItemId:'',
    cardLike:'',
    cardItemId:''
};
const initialText = '전체'

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
                modalLike : payload.modalLike
            }
        
        case "MODAL_ID":
            return {
                ...state,
                modalItemId : payload.modalItemId
            }

        case "CARD_LIKE":
            return {
                ...state,
                cardLike : payload.cardLike
            }
        
        case "CARD_ID":
            return {
                ...state,
                cardItemId : payload.cardItemId
            }

        default:
            return state;
    }
}

export default reducer;
