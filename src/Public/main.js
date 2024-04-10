function deleteButton(id) {
  const result = confirm("are you sure you want to delete the product??");
  if (result) {
    fetch("/delete-product/" + id, { method: "POST" }).then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
  }
}
