<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUser, useAuth } from '@clerk/vue';
import Button from 'primevue/button';
import AppLayout from '../components/AppLayout.vue';
import NotesGrid from '../components/NotesGrid.vue';
import NoteFormModal from '../components/NoteFormModal.vue';
import AdminNotesTable from '../components/AdminNotesTable.vue';
import { usePrivateNotes } from '../composables/usePrivateNotes';
import { useAdmin } from '../composables/useAdmin';

const { isSignedIn } = useUser();
const { getToken } = useAuth();
const router = useRouter();

const { notes, loading, error, fetchPrivateNotes } = usePrivateNotes();
const { isAdminLoggedIn, adminApiKey, allNotes, loading: adminLoading, error: adminError, fetchAllNotes } = useAdmin();

const showModal = ref(false);

onMounted(async () => {
  if (!isSignedIn.value && !isAdminLoggedIn.value) {
    await router.push('/');
    return;
  }
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
});

watch(isSignedIn, async (val) => {
  if (!val && !isAdminLoggedIn.value) await router.push('/');
});

async function refresh() {
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
}

async function handleSubmitted() {
  showModal.value = false;
  await refresh();
}
</script>

<template>
  <AppLayout>
    <div class="page-sections">
      <AdminNotesTable
        v-if="isAdminLoggedIn"
        :notes="allNotes"
        :loading="adminLoading"
        :error="adminError"
        :admin-api-key="adminApiKey"
        @refetch="fetchAllNotes()"
      />

      <section v-if="isSignedIn" class="notes-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">My Notes</h2>
            <p class="section-subtitle">Your private and public notes</p>
          </div>
          <Button
            label="+ Create Private Note"
            severity="secondary"
            @click="showModal = true"
          />
        </div>
        <p v-if="loading" class="status-text">Loading your notes…</p>
        <p v-if="error" class="error-text">{{ error }}</p>
        <NotesGrid
          :notes="notes"
          empty-message="No notes yet. Create your first note using the button above!"
          :show-user="false"
          @deleted="refresh()"
          @updated="refresh()"
        />
      </section>
    </div>

    <NoteFormModal
      v-if="showModal"
      :initial-is-public="false"
      @submitted="handleSubmitted"
      @close="showModal = false"
    />
  </AppLayout>
</template>

<style scoped>
.page-sections { display: flex; flex-direction: column; gap: 1.5rem; }

.notes-section {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title { font-size: 1.5rem; font-weight: 700; color: #1f2937; margin: 0 0 0.2rem 0; }
.section-subtitle { font-size: 0.875rem; color: #6b7280; margin: 0; }
.status-text { color: #6b7280; font-size: 0.9rem; }
.error-text { color: #ef4444; font-size: 0.9rem; }
</style>
