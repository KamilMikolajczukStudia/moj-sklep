const server = 'http://localhost:3333'

type TMethod = 'get' | 'post'

export class HttpError extends Error {
  constructor(message: string) {
    super(message)
  }
}

/**
 * @param url /address
 */
export async function http<T>(
  url: string,
  method: TMethod = 'get',
  body?: any,
  headers: any = {}
) {
  const response = await fetch(`${server}${url}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  })

  if (!response.ok) {
    throw new HttpError((await response.json()).message)
  }

  return (await response.json()) as T
}
