export class ResponseError extends Error {
  public response: Response;
  body: Promise<any>;
  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
    this.body = response.json();
  }
}

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

export async function request(url: string, options?: any) {
  const fetchResponse = await fetch(url, options).catch(error => {
    console.log(error);
    return error;
  });
  if (fetchResponse) {
    const response = checkStatus(fetchResponse);
    return parseJSON(response);
  }
}
