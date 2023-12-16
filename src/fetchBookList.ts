const fetchBookList = async ({ queryKey }: { queryKey: [number, string] }) => {
  const [page, search] = queryKey;

  let url = `https://gutendex.com/books?page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const apiRes = await fetch(url);

  if (!apiRes.ok) {
    throw new Error("Book list fetch not ok");
  }

  return apiRes.json();
};

export default fetchBookList;
