export const getCSRFToken = () =>(
    document.head.querySelector("meta[name='csrf-token']").getAttribute("content")
)
