// THIS IS NOT FINISHED. NEED TO GET POSTS TO SHOW ON PROFILE FIRST TO BE ABLE TO UPDATE THEM.

const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const comment = document.querySelector("#postComment").value.trim();

  if (title && comment) {
    const response = await fetch("/api/posts", {
      method: "PUT",
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
  .getElementById("updateBtn")
  .addEventListener("click", updatePostHandler);
