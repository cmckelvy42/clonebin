import $ from "jquery";
export const fetchPastes = () => (
    $.ajax({
        url:'/api/pastes',
        method:'GET'
    })
)

export const fetchPaste = id => (
    $.ajax({
        url:`/api/pastes/${id}`,
        method:'GET'
    })
)

export const updatePaste = paste => (
    $.ajax({
        url:`/api/pastes/${paste.id}`,
        method:'PATCH',
        data:{paste}
    })
)

export const createPaste = paste => (
    $.ajax({
        url:`/api/pastes/`,
        method:'POST',
        data:{paste}
    })
)

export const deletePaste = id => (
    $.ajax({
        url:`/api/pastes/${id}`,
        method:'DELETE'
    })
)