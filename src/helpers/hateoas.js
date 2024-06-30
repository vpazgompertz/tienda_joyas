export const HATEOAS = async (entity, data) => {
    const results = data.map((item) => {
      return {
        joya: item.nombre,
        links: [
          {
            href: `http://localhost:3000/${entity}/${item.id}`
          }
        ]
      };
    }).slice(0, 6);
  
    const total = data.length;
    const dataJoyasHateoas = {
      total,
      results
    };
  
    return dataJoyasHateoas;
  };
  