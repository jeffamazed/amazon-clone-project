export function handleSearchHeader() {
  const searchInput = document.querySelector(".js-search-bar");
  const searchButton = document.querySelector(".js-search-button");

  searchButton.addEventListener("click", () => {
    const value = searchInput.value;
    window.location.href = `amazon.html?search=${value}`;
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchButton.click();
  });
}
