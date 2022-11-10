// THIS ISN'T FINISHED. COPIED FROM CREATEPOST TO HAVE SOMETHING HERE

const deletePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const comment = document.querySelector("#postComment").value.trim();

  if (title && comment) {
    const response = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ post_title: title, post_comment: comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .getElementById("deleteBtn")
  .addEventListener("click", deletePostHandler);
