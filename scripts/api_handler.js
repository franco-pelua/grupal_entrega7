class api_handler { 
    constructor(url) {
        this.baseUrl = url;
        this.current_user;
    }

    
    selectUser(user) {
        this.current_user = user;
    }

    getCurrentUser() {
        return this.current_user;
    }

    updateCurrentUser(name, lastname) {
        this.current_user = {
            id: this.current_user.id,
            name: name ? name : this.current_user.name,
            lastname: lastname ? lastname : this.current_user.lastname
        }
    }

    async #fetch(request, url) {
        try {
            return fetch(url, {
                method: request.method,
                body: JSON.stringify(request.body),
                headers: {
                    "Content-Type":"application/json"
                }
            }).then(res => {    
                if(res.ok){
                    return res.json()
                }else{
                    return false
                }
            })
        } catch(error) {
            console.error(error);
            return false;
        }
    }

    async getSingleUser(id) {
        const request = {
            method: 'GET'
        }

        const response = await this.#fetch(request, `${this.baseUrl}users/${id}`);

        return response;
    }

    async getAllUsers() {
        const request = {
            method: 'GET'
        }

        const response = await this.#fetch(request, `${this.baseUrl}users`);

        return response;
    }

    async postNewUser(req_body) {
        const request = {
            method: 'POST',
            body: req_body
        }

        const response = await this.#fetch(request, `${this.baseUrl}users`);

        return response;
    }

    async updateUser(new_data) {
        const request = {
            method: 'PUT',
            body: new_data
        }

        const response = await this.#fetch(request, `${this.baseUrl}users/${this.current_user.id}`);

        return response;
    }

    async deleteUser(id) {
        const request = {
            method: 'DELETE'
        }

        const response = await this.#fetch(request, `${this.baseUrl}users/${id}`);

        return response;
    }
}

export default api_handler;