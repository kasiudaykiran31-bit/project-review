// SIGNUP
function signup() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(user => user.email === email);

    if (userExists) {
        alert("User already exists");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password,
        role: role
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful");

    window.location.href = "index.html";
}


// LOGIN
function login() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Invalid email or password");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "student.html";
    }
}


// ADD REPORT
function addReport() {

    let name = document.getElementById("studentName").value;
    let marks = document.getElementById("marks").value;
    let attendance = document.getElementById("attendance").value;
    let remarks = document.getElementById("remarks").value;

    if (name === "" || marks === "" || attendance === "") {
        alert("Please fill all fields");
        return;
    }

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push({
        name: name,
        marks: marks,
        attendance: attendance,
        remarks: remarks
    });

    localStorage.setItem("reports", JSON.stringify(reports));

    alert("Report added");

    displayReports();
}


// DISPLAY REPORTS FOR ADMIN
function displayReports() {

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    let output = "";

    reports.forEach((report, index) => {

        output += `
            <div class="report">
                <h3>${report.name}</h3>
                <p>Marks: ${report.marks}/100</p>
                <p>Attendance: ${report.attendance}%</p>
                <p>Remarks: ${report.remarks}</p>
            </div>
        `;
    });

    let element = document.getElementById("reports");

    if (element) {
        element.innerHTML = output || "<p>No reports available</p>";
    }
}


// DISPLAY STUDENT REPORT
function displayStudentReport() {

    let currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    let reports =
        JSON.parse(localStorage.getItem("reports")) || [];

    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    let report = reports.find(
        r => r.name.toLowerCase() === currentUser.name.toLowerCase()
    );

    let element = document.getElementById("studentReport");

    if (!report) {
        element.innerHTML = "<h3>No report available</h3>";
        return;
    }

    element.innerHTML = `
        <div class="report">
            <h2>Welcome, ${currentUser.name}</h2>

            <p><b>Marks:</b> ${report.marks}/100</p>

            <p><b>Attendance:</b>
            ${report.attendance}%</p>

            <p><b>Percentage:</b>
            ${report.marks}%</p>

            <p><b>Remarks:</b>
            ${report.remarks}</p>
        </div>
    `;
}


// LOGOUT
function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}