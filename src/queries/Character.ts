export const GetAll = `
  query Character($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info{
        pages
        next
        prev
      }
      results{
        name
        image
        species
        status
        id
        gender
      }
    }
  }
`;

export const GetUnique = `
query Character($id: ID!) {
  character(id: $id) {
    id
    name
    image
    gender
    species
    status
    type
    location{
      name
      dimension
      type
    }
    origin {
      name
      dimension
      type
    }
    episode {
      name
      air_date
      episode
      characters {
        name
        id
				status
        gender
        species
        image
      }
    }
  }
}
`;
