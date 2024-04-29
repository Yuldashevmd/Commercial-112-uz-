let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// send
let sendFormBtn = document.getElementById("submit");

sendFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let org_name = document.getElementById("organizationName").value;
  let number = document.getElementById("phoneNumber").value;
  let url = "https://apilanding.ccenter.uz/api/v1/Form/create";
  let data = {
    org_name,
    number,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      modal.style.display = "block";
    });
});
