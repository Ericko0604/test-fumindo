<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3000/assets'

const assets = ref([])
const editingId = ref(null)
const form = ref({
  asset_name: '',
  stock_quantity: 0,
  category: 'Consumable',
})

// 1. READ: Ambil seluruh data asset
async function fetchAssets() {
  try {
    const res = await axios.get(API_URL)
    assets.value = res.data
  } catch (err) {
    alert('Gagal memuat data asset')
  }
}

// 2. CREATE & UPDATE: Simpan asset baru atau edit
async function saveAsset() {
  if (!form.value.asset_name.trim()) {
    alert('Nama asset tidak boleh kosong!')
    return
  }

  const payload = {
    asset_name: form.value.asset_name,
    stock_quantity: Number(form.value.stock_quantity),
    category: form.value.category,
  }

  try {
    if (editingId.value) {
      await axios.put(`${API_URL}/${editingId.value}`, payload)
    } else {
      await axios.post(API_URL, payload)
    }
    resetForm()
    fetchAssets()
  } catch (err) {
    alert('Gagal menyimpan data asset')
  }
}

// Persiapkan form untuk edit
function editAsset(asset) {
  editingId.value = asset.asset_id
  form.value = {
    asset_name: asset.asset_name,
    stock_quantity: asset.stock_quantity,
    category: asset.category,
  }
}

// Batalkan mode edit
function resetForm() {
  editingId.value = null
  form.value = {
    asset_name: '',
    stock_quantity: 0,
    category: 'Consumable',
  }
}

// 3. DELETE: Hapus asset dengan konfirmasi
async function deleteAsset(id) {
  if (confirm(`Yakin ingin menghapus asset ID ${id}?`)) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchAssets()
    } catch (err) {
      alert('Gagal menghapus asset')
    }
  }
}

onMounted(() => {
  fetchAssets()
})
</script>

<template>
  <div class="container">
    <h1>Manajemen Asset Fumindo</h1>

    <!-- Form Input (Tambah / Edit) -->
    <div class="card">
      <h2>{{ editingId ? 'Edit Asset' : 'Tambah Asset Baru' }}</h2>
      <form @submit.prevent="saveAsset">
        <div class="form-grid">
          <div class="form-group">
            <label>Nama Asset</label>
            <input
              v-model="form.asset_name"
              type="text"
              placeholder="Contoh: Kertas A4"
              required
            />
          </div>

          <div class="form-group">
            <label>Jumlah Stok</label>
            <input
              v-model.number="form.stock_quantity"
              type="number"
              min="0"
              required
            />
          </div>

          <div class="form-group">
            <label>Kategori</label>
            <select v-model="form.category">
              <option value="Consumable">Consumable</option>
              <option value="Non-Consumable">Non-Consumable</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              class="btn"
              :class="editingId ? 'btn-success' : 'btn-primary'"
            >
              {{ editingId ? 'Update' : 'Tambah' }}
            </button>
            <button
              v-if="editingId"
              type="button"
              class="btn btn-secondary"
              @click="resetForm"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Tabel Daftar Asset -->
    <div class="card">
      <h2>Daftar Asset</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 60px;">ID</th>
            <th>Nama Asset</th>
            <th style="width: 120px;">Stok</th>
            <th style="width: 160px;">Kategori</th>
            <th style="width: 140px;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="assets.length === 0">
            <td colspan="5" style="text-align: center; color: #888;">
              Belum ada data asset.
            </td>
          </tr>
          <tr v-for="asset in assets" :key="asset.asset_id">
            <td>#{{ asset.asset_id }}</td>
            <td><strong>{{ asset.asset_name }}</strong></td>
            <td>{{ asset.stock_quantity }} unit</td>
            <td>
              <span
                class="badge"
                :class="asset.category === 'Consumable' ? 'badge-consumable' : 'badge-non-consumable'"
              >
                {{ asset.category }}
              </span>
            </td>
            <td>
              <button class="btn btn-warning" @click="editAsset(asset)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteAsset(asset.asset_id)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
