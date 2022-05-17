async function getEntities(url) {
  return await fetch(url).then(res => res.json());
}

async function postEntity(entity, url) {
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entity)
  };
  return await fetch(url, fetchOptions);
}

async function updateEntity(entity, url) {
  let fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entity)
  };
  return await fetch(url, fetchOptions);
}
