// =============================================
// Jadwal Otomatis - Contoh Program JS Tanpa HTML
// =============================================

// Konfigurasi waktu & hari
const hariTersedia = ["Senin", "Jumat"];
const jamMulai = 8; // 08:00
const jamSelesai = 20; // 20:00
const jamIstirahat = [
  { mulai: 12, selesai: 13 },
  { mulai: 18, selesai: 19 },
];

// Daftar mata kuliah (bisa kamu ubah)
const mataKuliah = [
  { nama: "Algoritma", dosen: "Pak Budi", durasi: 2 },
  { nama: "Basis Data", dosen: "Bu Rina", durasi: 3 },
  { nama: "Jaringan Komputer", dosen: "Pak Dimas", durasi: 2 },
  { nama: "Pemrograman Web", dosen: "Bu Tika", durasi: 3 },
];

// Fungsi bantu untuk cek bentrok istirahat
function bentrokIstirahat(jam) {
  return jamIstirahat.some(
    (b) => jam >= b.mulai && jam < b.selesai
  );
}

// Fungsi untuk membuat jadwal
function buatJadwal(mkList) {
  const jadwal = [];
  let hariIndex = 0;
  let jamSekarang = jamMulai;

  for (const mk of mkList) {
    // Pindah hari kalau waktu sudah tidak cukup
    if (jamSekarang + mk.durasi > jamSelesai) {
      hariIndex++;
      jamSekarang = jamMulai;
    }

    // Lewati waktu istirahat
    while (bentrokIstirahat(jamSekarang)) {
      jamSekarang++;
    }

    // Simpan jadwal
    jadwal.push({
      hari: hariTersedia[hariIndex % hariTersedia.length],
      jamMulai: jamSekarang,
      jamSelesai: jamSekarang + mk.durasi,
      mataKuliah: mk.nama,
      dosen: mk.dosen,
    });

    jamSekarang += mk.durasi;
  }

  return jadwal;
}

// Jalankan dan tampilkan hasil
const jadwal = buatJadwal(mataKuliah);

console.log("📅 Jadwal Otomatis:");
jadwal.forEach((j) => {
  console.log(
    `${j.hari} | ${j.jamMulai}:00 - ${j.jamSelesai}:00 | ${j.mataKuliah} (${j.dosen})`
  );
});
