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
let form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let org_name = document.getElementById("organizationName").value;
  let number = document.getElementById("phoneNumber").value;
  let full_name = document.getElementById("full_name").value;
  let url = "https://apilanding.ccenter.uz/api/v1/Form/create";
  let data = {
    full_name,
    org_name,
    number: number.slice(1),
  };

  if (!full_name || !org_name || !number) {
    document.querySelector(".error-fio").style.display = "block";
    document.querySelector(".error-org").style.display = "block";
    document.querySelector(".error-phone").style.display = "block";
    return;
  } else {
    document.querySelector(".error-fio").style.display = "none";
    document.querySelector(".error-org").style.display = "none";
    document.querySelector(".error-phone").style.display = "none";
    document.querySelector(".loader").style.display = "block";
    sendFormBtn.setAttribute("disabled", "disabled");
    sendFormBtn.classList.add("disabled");
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
        Swal.fire({
          icon: "success",
        }).then((res) => {
          modal.style.display = "block";
          const a = document.createElement("a");
          a.href = "./assets/Commercial.pdf";
          a.download = "Commercial.pdf";
          a.click();
          setTimeout(() => {
            sendFormBtn.removeAttribute("disabled");
            sendFormBtn.classList.remove("disabled");
            document.querySelector(".loader").style.display = "none";
            document.getElementById("myForm").reset();
          }, 1500);
        });
      });
    form.reset();
  }
});

// PDF
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js";

// PDF.js code to load and render PDF
let pdfViewer = document.getElementById("pdf-viewer");

// Path to your PDF file
let pdfFile = "./assets/Commercial.pdf";

// Loading document
pdfjsLib.getDocument(pdfFile).promise.then(function (pdfDoc) {
  let numPages = pdfDoc.numPages;
  // Initialize PDF viewer
  for (let i = 1; i <= numPages; i++) {
    pdfDoc.getPage(i).then(function (page) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      pdfViewer.appendChild(canvas);
      page.render({
        canvasContext: context,
        viewport: viewport,
      });
    });
  }
});
