async function render(resp) {
    const json = await resp.json();
    lastresponce.innerHTML = JSON.stringify(json, null, 4);
}
const headers = new Headers();
headers.append('content-type', 'application/json');
loginbtn.addEventListener('click', evt => {
    const password = passwordinp.value;
    const login = logininp.value;
    fetch('/auth', {method: 'POST',headers, credentials: 'include', body: JSON.stringify({login, password})}).then(render).catch(() => lastresponce.innerHTML = 'neprevelnie credi');
});

getproducts.addEventListener('click', evt => {
    fetch('/products',{credentials: 'include'}).then(render).catch(() => lastresponce.innerHTML = 'ne polychilos');
});