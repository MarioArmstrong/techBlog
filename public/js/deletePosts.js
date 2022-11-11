// THIS ISN'T FINISHED. COPIED FROM CREATEPOST TO HAVE SOMETHING HERE

const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute("data-id");
  if (event.target.hasAttribute("data-id")) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .getElementsByClassName("deleteBtn")
  .addEventListener("click", deletePostHandler);
