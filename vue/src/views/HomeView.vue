<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUser, useAuth, useClerk } from '@clerk/vue';
import Button from 'primevue/button';
import AppLayout from '../components/AppLayout.vue';
import NotesGrid from '../components/NotesGrid.vue';
import NoteFormModal from '../components/NoteFormModal.vue';
import AdminNotesTable from '../components/AdminNotesTable.vue';
import { usePublicNotes } from '../composables/usePublicNotes';
import { usePrivateNotes } from '../composables/usePrivateNotes';
import { useAdmin } from '../composables/useAdmin';

const { isSignedIn } = useUser();
const { getToken } = useAuth();
const clerk = useClerk();

const { notes: publicNotes, loading: pubLoading, error: pubError, fetchPublicNotes } = usePublicNotes();
const { notes: privateNotes, loading: privLoading, error: privError, fetchPrivateNotes } = usePrivateNotes();
const { isAdminLoggedIn, adminApiKey, allNotes, loading: adminLoading, error: adminError, fetchAllNotes } = useAdmin();

const showNoteModal = ref(false);
const noteModalIsPublic = ref(false);
const isAnonymousModal = ref(false);

async function refresh() {
  await fetchPublicNotes();
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
}

onMounted(async () => {
  await fetchPublicNotes();
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
});

watch(isSignedIn, async (val) => {
  if (val) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
});

function openPublicModal() {
  if (isSignedIn.value) {
    noteModalIsPublic.value = true;
    isAnonymousModal.value = false;
  } else {
    isAnonymousModal.value = true;
    noteModalIsPublic.value = true;
  }
  showNoteModal.value = true;
}

function openPrivateModal() {
  noteModalIsPublic.value = false;
  isAnonymousModal.value = false;
  showNoteModal.value = true;
}

async function handleNoteSubmitted() {
  showNoteModal.value = false;
  await refresh();
}
</script>

<template>
  <AppLayout>
    <div class="page-sections">
      <!-- Admin All Notes Table -->
      <AdminNotesTable
        v-if="isAdminLoggedIn"
        :notes="allNotes"
        :loading="adminLoading"
        :error="adminError"
        :admin-api-key="adminApiKey"
        @refetch="fetchAllNotes()"
      />

      <!-- Public Notes Section -->
      <section class="notes-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Public Notes</h2>
            <p class="section-subtitle">Visible to everyone</p>
          </div>
          <Button
            label="+ Create Public Note"
            severity="success"
            @click="openPublicModal"
          />
        </div>
        <p v-if="pubLoading" class="status-text">Loading public notes…</p>
        <p v-if="pubError" class="error-text">{{ pubError }}</p>
        <NotesGrid
          :notes="publicNotes"
          empty-message="No public notes yet. Be the first to create one!"
          :show-user="true"
          :is-admin="isAdminLoggedIn"
          :admin-api-key="adminApiKey"
          @deleted="refresh()"
          @updated="refresh()"
        />
      </section>

      <!-- Sign in prompt -->
      <section v-if="!isSignedIn" class="notes-section notes-section--center">
        <h2 class="section-title">Want to create private notes?</h2>
        <p class="section-subtitle" style="margin-bottom: 1rem">
          Sign in to create and manage your own private notes.
        </p>
        <Button label="Sign In to Get Started" @click="clerk?.openSignIn()" />
      </section>

      <!-- Your Notes Section -->
      <section v-if="isSignedIn" class="notes-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Your Notes</h2>
            <p class="section-subtitle">Only you can see these notes</p>
          </div>
          <Button
            label="+ Create Private Note"
            severity="secondary"
            @click="openPrivateModal"
          />
        </div>
        <p v-if="privLoading" class="status-text">Loading your notes…</p>
        <p v-if="privError" class="error-text">{{ privError }}</p>
        <NotesGrid
          :notes="privateNotes"
          empty-message="No notes yet. Create your first note using the button above!"
          :show-user="false"
          @deleted="refresh()"
          @updated="refresh()"
        />
      </section>
    </div>

    <NoteFormModal
      v-if="showNoteModal"
      :initial-is-public="noteModalIsPublic"
      :is-anonymous="isAnonymousModal"
      @submitted="handleNoteSubmitted"
      @close="showNoteModal = false"
    />
  </AppLayout>
</template>

<style scoped>
.page-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.notes-section {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  padding: 1.5rem;
}

.notes-section--center { text-align: center; }

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.2rem 0;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.status-text { color: #6b7280; font-size: 0.9rem; }
.error-text { color: #ef4444; font-size: 0.9rem; }
</style>
