const dataSiswa = [];
let editIndex = -1;

const namaInput = document.getElementById("nama");
const kelasInput = document.getElementById("kelas");
const nilaiInput = document.getElementById("nilai");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const hasil = document.getElementById("hasil");

function getInputData() {
    const nama = namaInput.value.trim();
    const kelas = kelasInput.value.trim();
    const nilai = Number(nilaiInput.value);

    if (!nama || !kelas || nilaiInput.value.trim() === "" || Number.isNaN(nilai)) {
        alert("Nama, kelas, dan nilai wajib diisi.");
        return null;
    }

    return {
        nama,
        kelas,
        nilai
    };
}

function statusKelulusan(nilai) {
    return nilai > 75 ? "Lulus" : "Tidak Lulus";
}

function resetForm() {
    namaInput.value = "";
    kelasInput.value = "";
    nilaiInput.value = "";
    namaInput.focus();
}

function simpanData() {
    const siswa = getInputData();
    if (!siswa) {
        return;
    }

    if (editIndex === -1) {
        dataSiswa.push(siswa);
    } else {
        dataSiswa[editIndex] = siswa;
        editIndex = -1;
        submitBtn.textContent = "Tambah";
        cancelBtn.hidden = true;
    }

    renderData();
    resetForm();
}

function editData(index) {
    const siswa = dataSiswa[index];
    if (!siswa) {
        return;
    }

    editIndex = index;
    namaInput.value = siswa.nama;
    kelasInput.value = siswa.kelas;
    nilaiInput.value = siswa.nilai;
    submitBtn.textContent = "Update";
    cancelBtn.hidden = false;
    namaInput.focus();
}

function hapusData(index) {
    dataSiswa.splice(index, 1);

    if (editIndex === index) {
        batalEdit();
    } else if (editIndex > index) {
        editIndex -= 1;
    }

    renderData();
}

function batalEdit() {
    editIndex = -1;
    submitBtn.textContent = "Tambah";
    cancelBtn.hidden = true;
    resetForm();
}

function renderData() {
    hasil.innerHTML = "";

    if (dataSiswa.length === 0) {
        const item = document.createElement("li");
        item.className = "empty";
        item.textContent = "Belum ada data siswa.";
        hasil.appendChild(item);
        return;
    }

    dataSiswa.forEach((datanya, index) => {
        const item = document.createElement("li");

        const text = document.createElement("span");
        text.className = "item-text";
        text.textContent = `Nama: ${datanya.nama}, Kelas: ${datanya.kelas}, Nilai: ${datanya.nilai}, Status: ${statusKelulusan(datanya.nilai)}`;

        const actions = document.createElement("div");
        actions.className = "item-actions";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn-secondary";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editData(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn-danger";
        deleteBtn.textContent = "Hapus";
        deleteBtn.onclick = () => hapusData(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        item.appendChild(text);
        item.appendChild(actions);
        hasil.appendChild(item);
    });
}

renderData();
