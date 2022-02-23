import $ from "jquery";
import { receiveErrors } from "../actions/error_actions";
export const presignUrl = (file) => (
    $.ajax({
        url:'/api/upload',
        method:'GET',
        data: {
            filename: file.name,
            fileType: file.type
        }
    })
)

export const uploadImage = (file, url, dispatch) => (
    $.ajax({
        url: url,
        method: 'PUT',
        headers: {
            "Content-Type": file.type,
            'acl': 'bucket-owner-full-control'
        },
        data: file,
        processData:false,
        contentType:false,
        error: function (request, status, error){
            console.log(request)
            console.log(error)
            dispatch(receiveErrors({responseJSON:{errors:["Invalid file."], status: status}}))
        }
    })
)