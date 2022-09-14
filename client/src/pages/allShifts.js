function AllShifts() {
  fetch("http://localhost:5000/user")
    .then((x) => x.json())
    .then((y) => console.log(y))
    .catch((e) => console.error(e));

  return (
    <>
      <ul></ul>
    </>
  );
}
export default AllShifts;
