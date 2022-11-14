const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log("you clicked it!");
  const btn = document.querySelectorAll(".deleteBtn");
  const id = btn.getAttribute("data-id");

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete post");
  }
};

btn.addEventListener("click", deletePostHandler);
