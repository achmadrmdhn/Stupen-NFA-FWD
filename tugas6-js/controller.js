// controller.js

// Menampilkan data pakai map()
function lihatData() {
  const tbody = document.getElementById("tbody-data");
  tbody.innerHTML = "";
  dataMahasiswa.map((mhs, index) => {
    const { nama, umur, alamat, email } = mhs; // destructuring
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${nama}</td>
        <td>${umur}</td>
        <td>${alamat}</td>
        <td>${email}</td>
        <td><button class="btn danger sm" onclick="hapusData(${index})">Hapus</button></td>
      </tr>
    `;
  });
  document.getElementById("summary").textContent = `Total Data: ${dataMahasiswa.length}`;
}

// Menambah data
function tambahData(nama, umur, alamat, email) {
  dataMahasiswa.push({ nama, umur, alamat, email });
  lihatData();
}

// Hapus data by index
function hapusData(index) {
  const { nama } = dataMahasiswa[index];
  if (confirm(`Yakin ingin menghapus data "${nama}"?`)) {
    dataMahasiswa.splice(index, 1);
    lihatData();
  }
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
  lihatData();

  const namaInput = document.getElementById("nama");
  const umurInput = document.getElementById("umur");
  const alamatInput = document.getElementById("alamat");
  const emailInput = document.getElementById("email");
  const btnTambah = document.getElementById("btnTambah");

  // fungsi submit
  const submitForm = () => {
    const nama = namaInput.value.trim();
    const umur = Number(umurInput.value);
    const alamat = alamatInput.value.trim();
    const email = emailInput.value.trim();

    if (!nama || !umur || !alamat || !email) {
      alert("Semua Data Harus Diisi!");
      return;
    }

    tambahData(nama, umur, alamat, email);

    // reset form
    namaInput.value = "";
    umurInput.value = "";
    alamatInput.value = "";
    emailInput.value = "";
    namaInput.focus();
  };

  // klik tombol tambah
  btnTambah.addEventListener("click", submitForm);

  // tekan Enter di salah satu input
  [namaInput, umurInput, alamatInput, emailInput].forEach(input => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // cegah reload form
        submitForm();
      }
    });
  });
});
