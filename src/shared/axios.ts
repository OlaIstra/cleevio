import axios from 'axios'

export const instanse = axios.create({
	baseURL:
		'https://gist.githubusercontent.com/davidzadrazil/43378abbaa2f1145ef50000eccf81a85/raw/d734d8877c2aa9e1e8c1c59bcb7ec98d7f8d8459',
})
