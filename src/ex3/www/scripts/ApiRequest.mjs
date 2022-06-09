export async function GetResourceRequest(url)
{
    return fetch(`/${url}`).then(async (response) => {
        try {
            // check if response is valid
            if (!response.ok) {
                throw new Error(`Cant get ${url}`);
            }
            // parse response to json object
            const res_obj = await response.json();
            return res_obj;
        }
        catch (error) {
            return error;
        }
    });
}

export async function AddNewResourceRequest(url, data)
{
    return fetch(`/${url}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(async (response) => {
        try {
            // check if response is valid
            if (!response.status === 201) {
                throw new Error(`Cant send ${data} to ${url}`);
            }
            // parse response to json object
            const res_obj = await response.json();
            return res_obj;
        }
        catch (error) {
            return error;
        }
    });
}

export async function DeleteResourceRequest(url)
{
    return fetch(`/${url}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
    }).then(async (response) => {
        try {
            // check if response is valid
            if (!response.ok) {
                throw new Error(`Cant delete ${url}`);
            }
            // parse response to json object
            const res_obj = await response.json();
            return res_obj;
        }
        catch (error) {
            return error;
        }
    });
}

export async function PatchResourceRequest(url)
{
    return fetch(`/${url}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'}
    }).then(async (response) => {
        try {
            // check if response is valid
            if (!response.ok) {
                throw new Error(`Cant patch ${url}`);
            }
            // parse response to json object
            const res_obj = await response.json();
            return res_obj;
        }
        catch (error) {
            return error;
        }
    });
}
