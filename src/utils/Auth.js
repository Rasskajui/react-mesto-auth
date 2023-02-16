export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (formValue) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: formValue.password,
          email: formValue.email
        })
    })
    .then(checkResponse)
};

export const login = (formValue) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: formValue.password,
          email: formValue.email
        })
        }
    )
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
  };

  export const getMail = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${jwt}`
        }
        }
    )
    .then(checkResponse)
  };