const initialState = {
    mainAreaName: '',
    subAreaName: '',
    genreName: '',
    tabIndex:'0'
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
                mainAreaName : payload.mainAreaName,
                subAreaName: '',
                genreName: ''
            }
        case "SUBAREA_SELECT":  
            return {               
                ...state,
                subAreaName: payload.subAreaName,
            }

        case "TABINDEX":
            return {
                ...state,
                tabIndex: payload.tabIndex,
            }
            
        default:
            return state;
    }
}

export default reducer;
