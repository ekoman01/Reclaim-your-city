const BASE_URL = import.meta.env.VITE_API_ENDPOINT || "";

export const graphQLRequest = async (query, variables = {}) => {
  const result = await fetch(`${BASE_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());
  if (!result.data) {
    console.log(result);
    throw new Error(result.errors[0].message);
  }
  return result;
};

export async function getWalls() {
  const result = await graphQLRequest(
    `query getWalls {
      wallsEntries {
        ... on walls_default_Entry {
          id
          title
          placewall
        }
      }
    }`
    );

  document.querySelector('.test').innerHTML = result.data.wallsEntries[0].title;
  return result.data.wallsEntries;
}