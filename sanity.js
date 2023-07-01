import imageUrlBuilder from "@sanity/image-url";
const {createClient} = require('@sanity/client')

export const client = createClient({
    projectId: "5u52smxs",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-05-03", 
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export function getAllCategories() {
  const posts = client.fetch(
    `
      *[_type == "category"]
    `
  );
  return posts;
};

export function getFeaturedCategories() {
  const posts = client.fetch(
      `
        *[_type == "featured"] {
            ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
      `
  );
  return posts;
};

export function getRestaurants(id) {
  const posts = client.fetch(
    `
      *[_type == "featured" && _id == $id] {
          ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `, {id}
  );
  return posts;
};
