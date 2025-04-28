function handleSignup() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    if (!firstName || !lastName || !dob || !email || !password || !gender) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    if (!validateEmail(email)) {
        alert("Email không hợp lệ!");
        return;
    }
    if (!isValidDOB(dob)) {
        alert("Ngày sinh không hợp lệ hoặc bạn chưa đủ 18 tuổi!");
        return;
    }
    if (password.length < 6) {
        alert("Mật khẩu phải từ 6 ký tự trở lên!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
        alert("Email đã tồn tại!");
        return;
    }

    users[email] = { firstName, lastName, dob, gender, password: password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");

    window.location.href = "../html/login.html";
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
function isValidDOB(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    if (dob >= today) return false;
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18 || today < new Date(dob.setFullYear(dob.getFullYear() + 18))) {
        return false;
    }
    return true;
}
function encryptPassword(password) {
    return btoa(password);
}
