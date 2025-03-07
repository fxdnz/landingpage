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
      const searchBar = document.getElementById("searchBar");
      let subjects = data.courses;

      function displaySubjects(filteredSubjects) {
        subjectsList.innerHTML = "";

        filteredSubjects.slice().forEach((subject) => {
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

      searchBar.addEventListener("keyup", function () {
        const searchText = searchBar.value.toLowerCase();
        const filteredSubjects = subjects.filter(
          (subject) =>
            subject.description.toLowerCase().includes(searchText) ||
            subject.year_level.toLowerCase().includes(searchText) ||
            subject.sem.toLowerCase().includes(searchText) ||
            subject.code.toLowerCase().includes(searchText)
        );
        displaySubjects(filteredSubjects);
      });

      displaySubjects(subjects);
    })
    .catch((error) => console.error("Error fetching subjects:", error));
});
