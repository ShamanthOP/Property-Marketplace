import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': 'c85f9f0584msh4dace2f45b32d41p160a2bjsna056d4d16194',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
        }
    })

    return data;
}