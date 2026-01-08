// Función para procesar texto plano y convertirlo en array limpio
export const parseList = (text) => {
  if (!text) return [];
  return text.split(/[\n,]+/)
    .map(u => u.trim().toLowerCase().replace('@', ''))
    .filter(u => u.length > 0);
};

// Función recursiva para extraer usuarios de diferentes estructuras JSON de Instagram
export const extractUsersFromJson = (json) => {
  let users = [];
  const traverse = (data) => {
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item?.string_list_data?.[0]?.value) {
          users.push(item.string_list_data[0].value);
        } else if (item?.title && typeof item.title === 'string' && item.title.length > 0) {
          users.push(item.title);
        } else if (typeof item === 'string') {
          users.push(item);
        } else if (typeof item === 'object' && item !== null) {
          traverse(item);
        }
      });
    } else if (typeof data === 'object' && data !== null) {
      Object.values(data).forEach(val => traverse(val));
    }
  };
  traverse(json);
  return users;
};