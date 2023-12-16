const fetchBook = async ({
  queryKey,
}: {
  queryKey: [string, string | undefined];
}) => {
  const bookId = queryKey[1];
  const apiRes = await fetch(`https://gutendex.com/books/${bookId}`);

  if (!apiRes.ok) {
    throw new Error("Book details fetch not ok");
  }

  return apiRes.json();
};

export default fetchBook;
