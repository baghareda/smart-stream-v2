const furl = "https://6afc2ab3892984c4494b034f.mockapi.io/channels"

    export async function addtoblack(check, id){
        const response = await fetch(`${furl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({isBlackList: check})
        });
    }

    addtoblack(true, 1)
