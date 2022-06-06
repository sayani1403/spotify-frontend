export const endpoint = "http://localhost:8000/graphql";

export const defaultOpt = {
  method: "POST",
  headers: {
	"content-type": "application/json",
  },
};


export function graphql(query) {
  const options = {
	...defaultOpt,
	body: JSON.stringify({
      "operationName": "getData",
      "query": query,
      "variables": {}
	})
  };
  return fetch(endpoint, options)
}
