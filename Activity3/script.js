function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("courses.json")
    .then((response) => response.json())
    .then((data) => {
      const subjectsList = document.getElementById("subjectsList");
      let subjects = data.courses;

      function displaySubjects(subjects) {
        subjectsList.innerHTML = "";

        subjects.forEach((subject) => {
          let li = document.createElement("li");
          li.classList.add("course-item");

          li.innerHTML = `
            <strong>${subject.code}</strong>: ${subject.description} <br>
            <span class="course-details">
              Year Level: ${subject.year_level} | 
              Semester: ${subject.sem} | 
              Credit: ${subject.credit}
            </span>
          `;

          subjectsList.appendChild(li);
        });
      }

      displaySubjects(subjects);
    })
    .catch((error) => console.error("Error fetching subjects:", error));
});
