export function redirect(response, window){
    if (response.redirected === true) {
        window.location.href = response.url.substring(response.url.lastIndexOf("/"));
    }
}
