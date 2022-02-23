export const loginUser = (user) => (
    $.ajax({
        url:'/api/session',
        method:'POST',
        data:{user}
    })
)

import $ from "jquery";
export const createUser = (user) => (
    $.ajax({
        url:'/api/users',
        method:'POST',
        data:{user}
    })
)

export const logoutUser = () => (
    $.ajax({
        url:'/api/session',
        method:'DELETE'
    })
)

export const fetchUser = (username, query) => {
    console.log(query)
    return $.ajax({
        url:`/api/users/${username}`,
        method:'GET',
        data:{query}
    })
}

export const updateUser = user => (
    $.ajax({
        url:`/api/users/${user.name}`,
        method:'PATCH',
        data:{user}
    })
)

export const deleteUser = username => {
    return $.ajax({
        url:`/api/users/${username}`,
        method:'DELETE'
    })
}

