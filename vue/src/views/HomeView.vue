<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUser, useAuth, useClerk } from '@clerk/vue';
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
    <div class="flex flex-col gap-6">
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
      <section class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Public Notes</h2>
            <p class="text-sm text-gray-500 mt-0.5">Visible to everyone</p>
          </div>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded text-white text-sm font-medium bg-green-600 hover:bg-green-700"
            @click="openPublicModal"
          >
            <span class="text-base leading-none">+</span>
            Create Public Note
          </button>
        </div>
        <p v-if="pubLoading" class="text-gray-500 text-sm">Loading public notes…</p>
        <p v-if="pubError" class="text-red-500 text-sm">{{ pubError }}</p>
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

      <!-- Sign in prompt for unauthenticated users -->
      <section
        v-if="!isSignedIn"
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center"
      >
        <h2 class="text-xl font-bold text-gray-800 mb-1">Want to create private notes?</h2>
        <p class="text-sm text-gray-500 mb-4">Sign in to create and manage your own private notes.</p>
        <button
          class="px-4 py-2 rounded text-white text-sm font-medium"
          style="background: var(--vue-green)"
          @click="clerk?.openSignIn()"
        >
          Sign In to Get Started
        </button>
      </section>

      <!-- Your Notes Section (signed-in only) -->
      <section
        v-if="isSignedIn"
        class="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Your Notes</h2>
            <p class="text-sm text-gray-500 mt-0.5">Only you can see these notes</p>
          </div>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded text-white text-sm font-medium bg-purple-600 hover:bg-purple-700"
            @click="openPrivateModal"
          >
            <span class="text-base leading-none">+</span>
            Create Private Note
          </button>
        </div>
        <p v-if="privLoading" class="text-gray-500 text-sm">Loading your notes…</p>
        <p v-if="privError" class="text-red-500 text-sm">{{ privError }}</p>
        <NotesGrid
          :notes="privateNotes"
          empty-message="No notes yet. Create your first note using the button above!"
          :show-user="false"
          @deleted="refresh()"
          @updated="refresh()"
        />
      </section>
    </div>

    <!-- Note creation modal -->
    <NoteFormModal
      v-if="showNoteModal"
      :initial-is-public="noteModalIsPublic"
      :is-anonymous="isAnonymousModal"
      @submitted="handleNoteSubmitted"
      @close="showNoteModal = false"
    />
  </AppLayout>
</template>
